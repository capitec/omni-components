import { html as langHtml } from '@codemirror/lang-html';
import { githubDark } from '@ddietr/codemirror-themes/github-dark.js';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import pretty from 'pretty';
import { CodeMirrorSourceUpdateEvent, CodeMirrorEditorEvent } from './CodeMirror.js';
import { ifNotEmpty } from './Directives.js';
import { StoryController } from './StoryController.js';
import { loadCustomElementsCodeMirrorCompletionsRemote } from './StoryUtils.js';

import './CodeMirror.js';

@customElement('story-renderer')
export class StoryRenderer extends LitElement {
    @property({ type: String, reflect: true }) path: string;
    @property({ type: String, reflect: true }) tag: string;

    @state() interactiveSrc: string;

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

        const res = this.controller.story.Interactive.render(this.controller.story.Interactive.args);

        return html`
            <div class="interactive-story Interactive" .data=${this.controller.story.Interactive}>
                ${this.overrideInteractive ? unsafeHTML(this.interactiveSrc) : res}
            </div>
            <button ?disabled=${this.overrideInteractive} @click="${() => this._play(this.controller.story.Interactive, '.Interactive')}"
                >Play</button
            >
            <div class="Interactive-result"></div>

            <div>
                <omni-code-mirror

                    .transformSource="${(s: string) => this._transformSource(s)}"
                    .extensions="${async () => [
                        githubDark,
                        langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())
                    ]}"
                    .code="${ifNotEmpty(this.controller.story.Interactive.source ? this.controller.story.Interactive.source() : undefined)}"
                    @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
                        const newSource = e.detail.source;
                        this.originalInteractiveSrc = newSource;
                        this.interactiveSrc = newSource;
                    }}"
                    @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                        const newSource = e.detail.source;
                        this.interactiveSrc = newSource;
                        this.overrideInteractive = this.interactiveSrc !== this.originalInteractiveSrc;

                        this.requestUpdate();
                    }}">
                    ${this.controller.story.Interactive.source ? nothing : res}
                </omni-code-mirror>
            </div>
            ${this.renderOtherStories()}
        `;
    }

    renderOtherStories() {
        const exports = Object.keys(this.controller.story).filter((item) => {
            if (item === 'default' || item === 'Interactive') {
                return false;
            }
            return true;
        });

        return html`
            ${exports.map((key) => {
                const res = this.controller.story[key].render(this.controller.story[key].args);

                return html`
                    <div class="${key}" .data=${this.controller.story[key]}>
                        ${this.controller.story[key].render(this.controller.story[key].args)}
                    </div>
                    <button @click="${() => this._play(this.controller.story[key], `.${key}`)}">Play</button>
                    <div class="${key + '-result'}"></div>
                    <div>
                        <omni-code-mirror                        
                            .code="${ifNotEmpty(this.controller.story[key].source ? this.controller.story[key].source() : undefined)}"
                            .transformSource="${(s: string) => this._transformSource(s)}"
                            .extensions="${() => [githubDark, langHtml()]}"
                            read-only>
                            ${this.controller.story[key].source ? nothing : res}
                        </omni-code-mirror>
                    </div>
                `;
            })}
        `;
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
