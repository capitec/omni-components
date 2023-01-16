import { html as langHtml } from '@codemirror/lang-html';
import { githubDark as codeThemeDark } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import pretty from 'pretty';
import { ColorField } from '../color-field/ColorField.js';
import { SearchField } from '../search-field/SearchField.js';
import { TextField } from '../text-field/TextField.js';
import { CodeMirrorSourceUpdateEvent, CodeMirrorEditorEvent } from './CodeEditor.js';
import { CodeEditor } from './CodeEditor.js';
import { LivePropertyEditor, PropertyChangeEvent } from './LivePropertyEditor.js';
import { StoryController } from './StoryController.js';
import { loadCustomElementsCodeMirrorCompletionsRemote, loadCustomElements, loadCssProperties, Package } from './StoryUtils.js';

import '../label/Label.js';
import '../button/Button';
import '../icon/Icon.js';
import '../icons/Loading.icon.js';
import './CodeEditor.js';
import '../text-field/TextField.js';
import '../color-field/ColorField.js';
import './LivePropertyEditor.js';

/**
 * @ignore
 */
@customElement('story-renderer')
export class StoryRenderer extends LitElement {
    @property({ type: String, reflect: true }) path: string;
    @property({ type: String, reflect: true }) tag: string;
    @property({ type: String, reflect: true }) key: string;
    @property({ type: Boolean, reflect: true }) interactive: boolean;

    @state() _interactiveSrc: string;
    @state() _isBusyPlaying: boolean;
    @state() _playError: string;
    @state() _showStylesDialog: boolean;

    @query('.source-code') codeEditor: CodeEditor;
    @query('.live-props') propertyEditor: LivePropertyEditor;

    private originalInteractiveSrc: string;
    private overrideInteractive: boolean;
    private controller: StoryController;
    private customCss: HTMLStyleElement;
    private story: any;
    private customElements: Package;
    private cssVariables: CSSVariable[];

    private modal: HTMLDivElement;
    private theme: string;

    override async connectedCallback() {
        super.connectedCallback();

        this.controller = new StoryController(this, this.path);

        this.customCss = document.head.querySelector('#custom-css-vars');
        if (!this.customCss) {
            this.customCss = document.createElement('style');
            this.customCss.id = 'custom-css-vars';
            document.head.appendChild(this.customCss);

            const storedCssOverrides = sessionStorage.getItem(`custom-css-${this.tag}`);
            if (storedCssOverrides) {
                this.customCss.innerHTML = storedCssOverrides;
            }
        }

        if (!this.modal) {
            this.modal = document.createElement('div');
            document.body.appendChild(this.modal);
        }

        this.customElements = await loadCustomElements();
        const cssProperties = loadCssProperties(this.tag, this.customElements);
        this.cssVariables = Object.keys(cssProperties)
            .filter((key) => cssProperties[key].subcategory === 'Component Variables')
            .map((key) => {
                const cssProp = cssProperties[key];
                return {
                    name: key,
                    ...cssProp
                };
            });

        document.addEventListener('omni-docs-theme-change', (e: Event) => {
            this.theme = getComputedStyle(document.documentElement).getPropertyValue('--code-editor-theme')?.trim();
            const codeEditors = this.renderRoot.querySelectorAll<CodeEditor>('code-editor');
            if (codeEditors) {
                codeEditors.forEach((ce) => {
                    ce.updateExtensions();
                });
            }
        });
        this.theme = getComputedStyle(document.documentElement).getPropertyValue('--code-editor-theme')?.trim();
    }

    override disconnectedCallback() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
    }

    protected override render() {
        if (!this.controller.story) {
            return html`<omni-loading-icon style="max-height: 64px;"></omni-loading-icon>`;
        }

        render(
            html`
        ${
            this._showStylesDialog
                ? html`
          <div class="modal" role="dialog" aria-modal="true"
            @click="${(e: Event) => this._checkCloseModal(e)}" @touch="${(e: Event) => this._checkCloseModal(e)}">
            <div class="modal-container">
                <div class="modal-body">
                    <div class="docs-search-area">
                        <omni-search-field class="css-category" @input="${(e: Event) => this.handleCustomThemeCSSVariableSearch(e)}" @change="${(
                      e: Event
                  ) => this.handleCustomThemeCSSVariableSearch(e)}"></omni-search-field>
                    </div>
                    <div class="component-props-table-wrapper">
                        <table class="component-props-table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Override Value</th>
                                </tr>
                            </thead>
                            <tbody data-target="custom-css-table-${this.tag}" class="component-css-props">
                                ${this.cssVariables
                                    .sort((a, b) => this._sortCssVariables(a, b))
                                    .map(
                                        (variable) => html`
                                    <tr>
                                        <td data-label="Name" scope="row"><pre><code class="language-css">--${variable.name}</code></pre></td>
                                        <td data-label="Description">${variable.description}</td>
                                        <td data-label="Override Value">${this.renderCssVariable(variable)}</td>
                                    </tr>
                                `
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`
                : nothing
        }
        `,
            this.modal
        );

        this.story = this.controller.story[this.key];
        this.story.originalArgs = this.story.originalArgs ?? JSON.parse(JSON.stringify(this.story.args));

        const res = this.story.render(this.story.args);
        const storySource = this.story.source ? this.story.source() : this._getSourceFromLit(res);

        return html`
        <div class="story-description">
            ${this.story.description}
        </div>
        <div class="story">
            <div class="preview">
                <div class="item">
                <div class="${this.key}${this.interactive ? ' interactive-story' : ''}" .data=${this.story}>
                    ${this.overrideInteractive ? unsafeHTML(this._interactiveSrc) : res}
                </div>
                </div>

                ${
                    this.interactive
                        ? html`
                    <div class="interactive">
                        <span class="docs-omni-component interactive-reset" @click="${this._resetLivePropertyEditor}">
                        <omni-icon class="docs-omni-component" style="cursor: pointer;" icon="@material/settings_backup_restore"></omni-icon>
                        </span>
                        <span class="docs-omni-component component-styles-btn" @click="${this._showComponentStyles}">
                        <omni-icon class="docs-omni-component" style="cursor: pointer;" icon="@material/format_color_fill"></omni-icon>
                        </span>
                        <live-property-editor
                        class="live-props docs-omni-component"
                        ?disabled=${this.overrideInteractive}
                        .data="${{ ...this.story }}"
                        element="${this.tag}"
                        ignore-attributes="dir,lang"
                        @property-change="${async (e: CustomEvent<PropertyChangeEvent>) => {
                            const changed = e.detail;
                            let mustUpdate = false;

                            if (!changed.oldValue || !changed.newValue) {
                                mustUpdate = true;
                            } else if (
                                typeof changed.newValue !== 'string' &&
                                JSON.stringify(changed.oldValue).trim() !== JSON.stringify(changed.newValue).trim()
                            ) {
                                mustUpdate = true;
                            } else if (changed.oldValue.toString().trim() !== changed.newValue.toString().trim()) {
                                mustUpdate = true;
                            }

                            if (mustUpdate) {
                                this.story.args[changed.property] = changed.newValue;

                                this.requestUpdate();
                                await this.updateComplete;

                                if (this.codeEditor && !this.story.source) {
                                    await this.codeEditor.refresh(() => this._getSourceFromLit(this.story.render(this.story.args)));
                                }
                            }
                        }}"></live-property-editor>
                    </div>
                    `
                        : nothing
                }
            </div>
            <!-- <div style="border-top: 1px solid #e1e1e1;max-width: 600px;"> -->
            <div class="code-block">
                <code-editor
                class="source-code"
                .transformSource="${(s: string) => this._transformSource(s)}"
                .extensions="${async () => [this._currentCodeTheme(), langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                .code="${live(storySource ?? '')}"
                @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
                    const newSource = e.detail.source;
                    this.originalInteractiveSrc = newSource;
                    this._interactiveSrc = newSource;
                }}"
                @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                    const newSource = e.detail.source;
                    this._interactiveSrc = newSource;
                    this.overrideInteractive = this._interactiveSrc !== this.originalInteractiveSrc && this._interactiveSrc !== storySource;

                    this.requestUpdate();
                }}"
                ?read-only="${true /*!this.interactive*/}">
                </code-editor>
            </div>
            <div class="play-tests">
                <div style="display: flex; flex-direction: row;">
                <omni-button
                    class="docs-omni-component"
                    label="Run Tests"
                    slot-position="left"
                    ?disabled=${
                        this.overrideInteractive ||
                        this._isBusyPlaying ||
                        JSON.stringify(this.story.originalArgs)
                            .replaceAll('\n', '')
                            .replaceAll('\\n', '')
                            .replaceAll('\t', '')
                            .replaceAll(' ', '') !==
                            JSON.stringify(this.story.args).replaceAll('\n', '').replaceAll('\\n', '').replaceAll('\t', '').replaceAll(' ', '')
                    }
                    @click="${() => this._play(this.story, `.${this.key}`)}">
                    <omni-icon class="docs-omni-component" icon="@material/play_arrow" style="margin-right: 8px;"></omni-icon>
                </omni-button>
                <div class="${this.key + '-result'} success">
                    <span class="material-icons" style="color: #155724;">check</span>
                    <span style="margin-left: 8px;">Passed</span>
                </div>
                </div>
                <div class="${this.key + '-result'} failure">
                <span class="material-icons" style="color: #721c24;">close</span>
                <span style="margin-left: 8px;"><pre>${this._playError}</pre></span>
                </div>
            </div>
        </div>
    `;
    }

    handleCustomThemeCSSVariableSearch(e: Event) {
        const filterValue = (e.target as SearchField).value ?? '';
        const table = document.querySelector(`[data-target=custom-css-table-${this.tag}]`) as HTMLTableSectionElement;
        const cssPropRows = table.children;
        for (let index = 0; index < cssPropRows.length; index++) {
            const element = cssPropRows[index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    renderCssVariable(variable: CSSVariable) {
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
                variable.value = rootCss.style.getPropertyValue(`--${variable.name}`);
            }

            if (variable.control === 'color') {
                return html`
                    <omni-color-field
                        class="css-prop docs-omni-component"
                        .value="${live(variable.value)}"
                        @input="${async (e: Event) => {
                            const colorField = e.target as ColorField;
                            const input = colorField.shadowRoot.getElementById('inputField') as HTMLInputElement;

                            const value = input.value;
                            variable.value = value;
                            this._cssChanged(variable);
                        }}">
                    </omni-color-field>
                  `;
            } else {
                return html`
                    <omni-text-field
                        class="css-prop docs-omni-component"
                        .value="${live(variable.value)}"
                        @input="${async (e: Event) => {
                            const textField = e.target as TextField;

                            const value = (textField.shadowRoot.getElementById('inputField') as HTMLInputElement).value;
                            variable.value = value;
                            this._cssChanged(variable);
                        }}">
                    </omni-text-field>
                  `;
            }
        }

        return nothing;
    }

    protected override createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    private _sortCssVariables(a: CSSVariable, b: CSSVariable) {
        const css = this.customCss.sheet;
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
            a.value = rootCss.style.getPropertyValue(`--${a.name}`);
            b.value = rootCss.style.getPropertyValue(`--${b.name}`);
        }

        return a.value ? (b.value ? 0 : -1) : b.value ? 1 : 0;
    }

    private _cssChanged(changed: CSSVariable) {
        const css = this.customCss.sheet;

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

        if (changed.value) {
            if (rootCss) {
                rootCss.style.setProperty(`--${changed.name}`, changed.value);
            }
        } else {
            if (rootCss) {
                rootCss.style.removeProperty(`--${changed.name}`);
            }
        }

        const storedCssOverrides = rootCss.cssText;
        sessionStorage.setItem(`custom-css-${this.tag}`, storedCssOverrides);
    }

    private _showComponentStyles() {
        this._showStylesDialog = true;
    }

    private _checkCloseModal(e: Event) {
        const containerElement = this.modal.querySelector(`div.modal-container`);
        if (!e.composedPath().includes(containerElement)) {
            this._showStylesDialog = false;
        }
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
        sessionStorage.removeItem(`custom-css-${this.tag}`);

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

    private _currentCodeTheme() {
        if (this.theme?.toLowerCase() === 'dark') {
            return codeThemeDark;
        }
        return codeTheme;
    }
}

type CSSVariable = {
    control: 'text' | 'color';
    description: string;
    category: string;
    subcategory: string;
    value: string;
    name: string;
};
