import { html as langHtml } from '@codemirror/lang-html';
// import { githubDark as codeTheme } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import pretty from 'pretty';
import { CodeMirrorSourceUpdateEvent, CodeMirrorEditorEvent } from './CodeEditor.js';
import { CodeEditor } from './CodeEditor.js';
import { CSSVariable, LivePropertyEditor, PropertyChangeEvent } from './LivePropertyEditor.js';
import { StoryController } from './StoryController.js';
import { loadCustomElementsCodeMirrorCompletionsRemote } from './StoryUtils.js';

import '../label/Label.js';
import '../button/Button';
import '../icon/Icon.js';
import './CodeEditor.js';
import './LivePropertyEditor.js';

@customElement('story-renderer')
export class StoryRenderer extends LitElement {
    @property({ type: String, reflect: true }) path: string;
    @property({ type: String, reflect: true }) tag: string;
    @property({ type: String, reflect: true }) key: string;
    @property({ type: Boolean, reflect: true }) interactive: boolean;

    @state() _interactiveSrc: string;
    @state() _isBusyPlaying: boolean;
    @state() _playError: string;

    @query('.source-code') codeEditor: CodeEditor;
    @query('.live-props') propertyEditor: LivePropertyEditor;

    private originalInteractiveSrc: string;
    private overrideInteractive: boolean;
    private controller: StoryController;
    private customCss: HTMLStyleElement;
    private story: any;

    override connectedCallback() {
        super.connectedCallback();

        this.controller = new StoryController(this, this.path);

        this.customCss = document.head.querySelector('#custom-css-vars');
        if (!this.customCss) {
            this.customCss = document.createElement('style');
            this.customCss.id = 'custom-css-vars';
            document.head.appendChild(this.customCss);
        }
    }

    protected override render() {

        if (!this.controller.story) {
            return html`<div>Loading...</div>`;
        }

        this.story = this.controller.story[this.key];
        this.story.originalArgs = this.story.originalArgs ?? JSON.parse(JSON.stringify(this.story.args));

        const res = this.story.render(this.story.args);
        const storySource = this.story.source ? this.story.source() : this._getSourceFromLit(res);

        return html`
            
            <div class="preview">
                <div class="item">
                    <div class="${this.key}${this.interactive ? ' interactive-story' : ''}" .data=${this.story}>
                        ${this.overrideInteractive ? unsafeHTML(this._interactiveSrc) : res}
                    </div>
                </div>

                ${this.interactive
                    ? html`
                          <div class="interactive">
                              <span class="docs-omni-component interactive-reset"
                                  @click="${this._resetLivePropertyEditor}">
                                  <omni-icon class="docs-omni-component" style="cursor: pointer;" icon="@material/settings_backup_restore"></omni-icon>
                              </span>
                              <live-property-editor
                                  class="live-props docs-omni-component"
                                  ?disabled=${this.overrideInteractive}
                                  .data="${{ ...this.story }}"
                                  element="${this.tag}"
                                  ignore-attributes="dir,lang"
                                  .cssValueReader="${(variable: CSSVariable) => {
                                      const css = this.customCss.sheet;

                                      if (variable.name) {
                                          let rootCss: CSSStyleRule = undefined;
                                          if (css.cssRules.length === 0) {
                                              const index = css.insertRule(':root {}');
                                              rootCss = css.cssRules.item(index) as CSSStyleRule;
                                          } else {
                                              for (let index = 0; index < css.cssRules.length; index++) {
                                                  const rule = css.cssRules[index] as CSSStyleRule;
                                                  if (rule.selectorText === ':root') {
                                                      rootCss = rule;
                                                      break;
                                                  }
                                              }
                                          }

                                          if (rootCss) {
                                              variable.value = rootCss.style.getPropertyValue(variable.name);
                                          }
                                      }
                                      return variable;
                                  }}"
                                  @property-change="${async (e: CustomEvent<PropertyChangeEvent>) => {
                                      const changed = e.detail;
                                      if (
                                          !changed.oldValue ||
                                          !changed.newValue ||
                                          changed.oldValue.toString().trim() !== changed.newValue.toString().trim()
                                      ) {
                                          this.story.args[changed.property] = changed.newValue;

                                          this.requestUpdate();
                                          await this.updateComplete;

                                          if (this.codeEditor && !this.story.source) {
                                              await this.codeEditor.refresh(() =>
                                                  this._getSourceFromLit(this.story.render(this.story.args))
                                              );
                                          }
                                      }
                                  }}"
                                  @css-change="${(e: CustomEvent<CSSVariable>) => {
                                      const changed = e.detail;
                                      const css = this.customCss.sheet;

                                      if (changed.value) {
                                          let rootCss: CSSStyleRule = undefined;
                                          if (css.cssRules.length === 0) {
                                              const index = css.insertRule(':root {}');
                                              rootCss = css.cssRules.item(index) as CSSStyleRule;
                                          } else {
                                              for (let index = 0; index < css.cssRules.length; index++) {
                                                  const rule = css.cssRules[index] as CSSStyleRule;
                                                  if (rule.selectorText === ':root') {
                                                      rootCss = rule;
                                                      break;
                                                  }
                                              }
                                          }

                                          if (rootCss) {
                                              rootCss.style.setProperty(changed.name, changed.value);
                                          }

                                          //   this.requestUpdate();
                                      }
                                  }}"></live-property-editor>
                          </div>
                      `
                    : nothing}
            </div>
            <!-- <div style="border-top: 1px solid #e1e1e1;max-width: 600px;"> -->
            <div class="code-block">
                <code-editor
                    class="source-code"
                    .transformSource="${(s: string) => this._transformSource(s)}"
                    .extensions="${async () => [codeTheme, langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                    .code="${live(storySource ?? '')}"
                    @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
                        const newSource = e.detail.source;
                        this.originalInteractiveSrc = newSource;
                        this._interactiveSrc = newSource;
                    }}"
                    @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                        const newSource = e.detail.source;
                        this._interactiveSrc = newSource;
                        this.overrideInteractive =
                            this._interactiveSrc !== this.originalInteractiveSrc && this._interactiveSrc !== storySource;

                        this.requestUpdate();
                    }}"
                    ?read-only="${!this.interactive}">
                </code-editor>
            </div>
            <div class="play-tests">
                <div style="display: flex; flex-direction: row;">
                    <omni-button
                        label="Run Tests"
                        slot-position="left"
                        ?disabled=${this.overrideInteractive ||
                        JSON.stringify(this.story.originalArgs)
                            .replaceAll('\n', '')
                            .replaceAll('\\n', '')
                            .replaceAll('\t', '')
                            .replaceAll(' ', '') !==
                            JSON.stringify(this.story.args).replaceAll('\n', '').replaceAll('\\n', '').replaceAll('\t', '').replaceAll(' ', '')}
                        @click="${() => this._play(this.story, `.${this.key}`)}">
                        <omni-icon icon="@material/play_arrow" style="margin-right: 8px;"></omni-icon>
                    </omni-button>
                    <div class="${this.key + '-result'} success">
                        <span class="material-icons" style="color: #155724;">check</span>
                        <span style="margin-left: 8px;">Passed</span>
                    </div>
                </div>
                <div class="${this.key + '-result'} failure">
                    <span class="material-icons" style="color: #721c24;">close</span>
                    <span style="margin-left: 8px;">${this._playError}</span>
                </div>
            </div>
        `;
    }

    protected override createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    private async _resetLivePropertyEditor() {
        this.story.args = JSON.parse(JSON.stringify(this.story.originalArgs));
        this.overrideInteractive = false;
        const css = this.customCss.sheet;
        for (let index = 0; index < css.cssRules.length; index++) {
            const rule = css.cssRules[index] as CSSStyleRule;
            if (rule.selectorText === ':root') {
                css.deleteRule(index);
                break;
            }
        }

        this.requestUpdate();

        await this.updateComplete;

        if (this.codeEditor && !this.story.source) {
            await this.codeEditor.refresh(() => this._getSourceFromLit(this.story.render(this.story.args)));
        }

        if (this.propertyEditor) {
            this.propertyEditor.resetSlots();
        }
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

    private async _play(story: any, canvasElementQuery: string) {
        try {

            if (!story.play) {
                return;
            }

            this._isBusyPlaying = true;

            const context = this._createStoryContext(story, canvasElementQuery);
            await story.play(context);
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.success').style.display = 'flex';
        } catch (error) {
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.failure').style.display = 'flex';
            this._playError = error.toString();
        } finally {
            this._isBusyPlaying = false;
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
