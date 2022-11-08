import { html as langHtml } from '@codemirror/lang-html';
import { githubDark } from '@ddietr/codemirror-themes/github-dark.js';
import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import pretty from 'pretty';
import { CodeMirrorSourceUpdateEvent, CodeMirrorEditorEvent } from './CodeMirror.js';
import { CodeMirror } from './CodeMirror.js';
import { ifNotEmpty } from './Directives.js';
import { LivePropertyEditor, PropertyChangeEvent } from './LivePropertyEditor.js';
import { StoryController } from './StoryController.js';
import { ComponentStoryFormat, loadCustomElementsCodeMirrorCompletionsRemote } from './StoryUtils.js';

import '../label/Label.js';
import '../button/Button';
import '../icon/Icon.js';
import './CodeMirror.js';
import './LivePropertyEditor.js';

@customElement('story-renderer')
export class StoryRenderer extends LitElement {
    @property({ type: String, reflect: true }) path: string;
    @property({ type: String, reflect: true }) tag: string;
    @property({ type: String, reflect: true }) key: string;
    @property({ type: Boolean, reflect: true }) interactive: boolean;

    @state() interactiveSrc: string;

    @query('.source-code') codeMirror: CodeMirror;
    @query('.live-props') propertyEditor: LivePropertyEditor;

    private originalInteractiveSrc: string;
    private overrideInteractive: boolean;
    private controller: StoryController;

    override connectedCallback() {
        super.connectedCallback();
        this.controller = new StoryController(this, this.path);
    }

    protected override render() {
        if (!this.controller.story) {
            return html`<div>Loading...</div>`;
        }

        const story = this.controller.story[this.key];
        story.originalArgs = story.originalArgs ?? JSON.parse(JSON.stringify(story.args));

        const res = story.render(story.args);

        const storySource = story.source ? story.source() : this._getSourceFromLit(res);
        return html`
            <omni-label label="${story.name ?? this.key}" type="title"></omni-label>
            <div class="${this.key}${this.interactive ? ' interactive-story' : ''}" .data=${story}>
                ${this.overrideInteractive ? unsafeHTML(this.interactiveSrc) : res}
            </div>
            <button ?disabled=${this.overrideInteractive || JSON.stringify(story.originalArgs).replaceAll('\n', '').replaceAll('\\n', '').replaceAll('\t', '').replaceAll(' ', '') !== JSON.stringify(story.args).replaceAll('\n', '').replaceAll('\\n', '').replaceAll('\t', '').replaceAll(' ', '')} @click="${() => this._play(story, `.${this.key}`)}">Play</button>
            <div class="${this.key + '-result'}"></div>
            <div>
                ${this.interactive
                    ? html` <omni-button
                              @click="${async () => {
                                  story.args = JSON.parse(JSON.stringify(story.originalArgs));
                                  this.overrideInteractive = false;

                                  this.requestUpdate();

                                  await this.updateComplete;

                                  if (this.codeMirror && !story.source) {
                                      await this.codeMirror.refresh(() => this._getSourceFromLit(story.render(story.args)));
                                  }

                                  if (this.propertyEditor) {
                                    this.propertyEditor.resetSlots();
                                  }
                              }}"
                              ><omni-icon icon="@material/settings_backup_restore"></omni-icon
                          ></omni-button>
                          <live-property-editor
                              class="live-props"
                              ?disabled=${this.overrideInteractive}
                              .data="${{ ...story }}"
                              element="${this.tag}"
                              ignore-attributes="dir,lang"
                              @property-change="${async (e: CustomEvent<PropertyChangeEvent>) => {
                                  const changed = e.detail;
                                  if (!changed.oldValue || !changed.newValue || changed.oldValue.trim() !== changed.newValue.trim()) {
                                    story.args[changed.property] = changed.newValue;
  
                                    this.requestUpdate();
                                    await this.updateComplete;
  
                                    if (this.codeMirror && !story.source) {
                                        await this.codeMirror.refresh(() => this._getSourceFromLit(story.render(story.args)));
                                    }
                                  }
                              }}"></live-property-editor>`
                    : nothing}
                <omni-code-mirror
                    class="source-code"
                    .transformSource="${(s: string) => this._transformSource(s)}"
                    .extensions="${async () => [githubDark, langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                    .code="${live(storySource ?? '')}"
                    @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
                        const newSource = e.detail.source;
                        this.originalInteractiveSrc = newSource;
                        this.interactiveSrc = newSource;
                    }}"
                    @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                        const newSource = e.detail.source;
                        this.interactiveSrc = newSource;
                        this.overrideInteractive =
                            this.interactiveSrc !== this.originalInteractiveSrc && this.interactiveSrc !== storySource;

                        this.requestUpdate();
                    }}"
                    ?read-only="${!this.interactive}">
                </omni-code-mirror>
            </div>
        `;
    }

    private _getSourceFromLit(res: TemplateResult): string {
        let tempContainer = document.createElement('div');
        render(res, tempContainer);
        const source = this._transformSource(tempContainer.innerHTML);

        //Cleanup
        tempContainer.innerHTML = '';
        tempContainer = null;

        return source;
    }

    protected override createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    private async _play(story: any, canvasElementQuery: string) {
        try {
            if (!story.play) {
                return;
            }
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result').innerText = '';
            const context = this._createStoryContext(story, canvasElementQuery);
            await story.play(context);
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result').innerText = 'Passed';
        } catch (error) {
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result').innerText = error.toString();
        }
    }

    private _createStoryContext(story: any, canvasElementQuery: string): any {
        return {
            story: story,
            args: story.args,
            canvasElement: this.querySelector(canvasElementQuery)
        };
    }

    private _transformSource(input: string) {
        // Remove test ids from displayed source
        input = input
            .replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')
            .replace(new RegExp('data-testid=("([^"]|"")*")'), '')
            // Update any object references to curly braces for easier reading
            .replaceAll('[object Object]', '{}')
            // Remove empty string assignments to fix boolean attributes
            .replaceAll('=""', '');
        // Remove any properties with empty string assignments at the end of the html tag
        // 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")>"), " >")
        // Remove any properties with empty string assignments within the tag
        // 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")"), " ");
        return pretty(input);
    }
}
