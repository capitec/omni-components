/* eslint-disable no-control-regex */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { html as langHtml } from '@codemirror/lang-html';
import { javascript as langJs } from '@codemirror/lang-javascript';
import { githubDark as codeThemeDark } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { html, LitElement, nothing, render, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ColorField } from '../color-field/ColorField.js';
import { SearchField } from '../search-field/SearchField.js';
import { TextField } from '../text-field/TextField.js';
import { CodeMirrorSourceUpdateEvent, CodeMirrorEditorEvent } from './CodeEditor.js';
import { CodeEditor } from './CodeEditor.js';
import { LivePropertyEditor, PropertyChangeEvent } from './LivePropertyEditor.js';
import { StoryController } from './StoryController.js';
import {
    loadCustomElementsCodeMirrorCompletionsRemote,
    loadCustomElements,
    loadCssProperties,
    Package,
    ComponentStoryFormat,
    FrameworkOption,
    transformSource,
    getSourceFromLit
} from './StoryUtils.js';

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
    @property({ type: String, reflect: true }) path?: string;
    @property({ type: String, reflect: true }) tag?: string;
    @property({ type: String, reflect: true }) key?: string;
    @property({ type: Boolean, reflect: true }) interactive?: boolean;

    @state() _interactiveSrc?: string;
    @state() _isBusyPlaying?: boolean;
    @state() _playError?: string;
    @state() _showStylesDialog?: boolean;
    @state() _sourceTab: FrameworkOption = 'HTML';

    @query('.html-source-code') htmlCodeEditor?: CodeEditor;
    @query('.react-source-code') reactCodeEditor?: CodeEditor;
    @query('.live-props') propertyEditor?: LivePropertyEditor;

    private originalInteractiveSrc?: string;
    private overrideInteractive?: boolean;
    private controller?: StoryController;
    private customCss?: HTMLStyleElement;
    private story?: ComponentStoryFormat<any> & {
        originalArgs: any;
    };
    private customElements?: Package;
    private cssVariables?: CSSVariable[];

    private modal?: HTMLDivElement;
    private theme?: string;

    override async connectedCallback() {
        super.connectedCallback();

        this.controller = new StoryController(this, this.path as string);

        this.customCss = document.head.querySelector('#custom-css-vars') as HTMLStyleElement;
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
        const cssProperties = loadCssProperties(this.tag as string, this.customElements);
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
        document.addEventListener(interactiveUpdate, () => {
            this.requestUpdate();
        });
        this.theme = getComputedStyle(document.documentElement).getPropertyValue('--code-editor-theme')?.trim();
    }

    override disconnectedCallback() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null as any;
        }
    }

    protected override render() {
        if (!this.controller?.story) {
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
                                    ?.sort((a: CSSVariable, b: CSSVariable) => this._sortCssVariables(a, b))
                                    .map(
                                        (variable: CSSVariable) => html`
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
            this.modal as HTMLDivElement
        );

        this.story = this.controller.story[this.key as string];
        this.story!.originalArgs = this.story?.originalArgs ?? JSON.parse(JSON.stringify(this.story?.args));

        const res = this.story!.render!(this.story!.args);

        const htmlSourceDefinition = this.story!.frameworkSources?.find((fs) => fs.framework === 'HTML');
        const htmlSource = htmlSourceDefinition?.load ? htmlSourceDefinition.load(this.story!.args) : getSourceFromLit(res);

        const reactSourceDefinition = this.story!.frameworkSources?.find((fs) => fs.framework === 'React');
        const reactSource = reactSourceDefinition?.load ? reactSourceDefinition.load(this.story!.args) : '';

        return html`
        <div class="story-description">
            ${this.story?.description && typeof this.story?.description === 'function' ? this.story.description() : this.story?.description}
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
                        ?disabled=${this.overrideInteractive && false}
                        .data="${{ ...this.story }}"
                        element="${this.tag as string}"
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
                                this.story!.args![changed.property] = changed.newValue;

                                this.requestUpdate();
                                this.dispatchEvent(
                                    new CustomEvent(interactiveUpdate, {
                                        bubbles: true,
                                        composed: true
                                    })
                                );
                                await this.updateComplete;

                                if (this.htmlCodeEditor) {
                                    await this.htmlCodeEditor.refresh(() =>
                                        this.story!.frameworkSources?.find((fs) => fs.framework === 'HTML')?.load
                                            ? this.story!.frameworkSources!.find((fs) => fs.framework === 'HTML')!.load!(this.story!.args)
                                            : getSourceFromLit(this.story!.render!(this.story!.args))
                                    );
                                }
                                if (this.reactCodeEditor) {
                                    await this.reactCodeEditor.refresh(() =>
                                        this.story!.frameworkSources?.find((fs) => fs.framework === 'React')?.load
                                            ? this.story!.frameworkSources!.find((fs) => fs.framework === 'React')!.load!(this.story!.args)
                                            : ''
                                    );
                                }
                            }
                        }}"></live-property-editor>
                    </div>
                    `
                        : nothing
                }
            </div>
            <!-- <div style="border-top: 1px solid #e1e1e1;max-width: 600px;"> -->
            <div class="code-block html-code ${this._sourceTab === 'HTML' ? '' : 'no-display'}">
                <code-editor
                class="source-code html-source-code"
                .transformSource="${(s: string) => transformSource(s)}"
                .extensions="${async () => [this._currentCodeTheme(), langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                .code="${live(htmlSource ?? '')}"
                @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
                    const newSource = e.detail.source;
                    this.originalInteractiveSrc = newSource;
                    this._interactiveSrc = newSource;
                }}"
                @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                    const newSource = e.detail.source;
                    this._interactiveSrc = newSource;
                    this.overrideInteractive = this._interactiveSrc !== this.originalInteractiveSrc && this._interactiveSrc !== htmlSource;

                    this.requestUpdate();
                    this.dispatchEvent(
                        new CustomEvent(interactiveUpdate, {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}"
                ?read-only="${true /*!this.interactive*/}">
                </code-editor>
            </div>
            ${
                reactSource
                    ? html`
            <div class="code-block react-code ${this._sourceTab === 'React' ? '' : 'no-display'}">
                <code-editor
                class="source-code react-source-code"
                .extensions="${async () => [
                    this._currentCodeTheme(),
                    langJs({
                        jsx: true
                    })
                ]}"
                .code="${reactSource}"
                read-only>
                </code-editor>
            </div>`
                    : nothing
            }

            <div class="two-part">
            
                <div class="play-tests">
                    ${
                        this.story?.play
                            ? html`
                            <div style="display: flex;flex-direction: row;align-items: center;">
                            <omni-button
                                class="docs-omni-component"
                                ?disabled=${
                                    this.overrideInteractive ||
                                    this._isBusyPlaying ||
                                    JSON.stringify(this.story?.originalArgs)
                                        .replaceAll('\n', '')
                                        .replaceAll('\\n', '')
                                        .replaceAll('\t', '')
                                        .replaceAll(' ', '') !==
                                        JSON.stringify(this.story?.args)
                                            .replaceAll('\n', '')
                                            .replaceAll('\\n', '')
                                            .replaceAll('\t', '')
                                            .replaceAll(' ', '')
                                }
                                @click="${() => this._play(this.story, `.${this.key}`)}">
                                <omni-icon class="docs-omni-component" icon="@material/play_arrow"></omni-icon>
                            </omni-button>
                            <div class="${this.key + '-result'} success">
                                <span class="material-icons" style="color: #155724;">check</span>
                            </div>
                            </div>       
                    `
                            : nothing
                    }
                </div>     
                <div class="framework-toggles docs-omni-component">
                    ${
                        reactSource
                            ? html`
                                <div class="${this._sourceTab === 'HTML' ? 'selected' : ''}" @click="${() =>
                                  (this._sourceTab = 'HTML')}">
                                    <omni-icon class="docs-omni-component" size="default">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                            <title>HTML5 Logo Badge</title>
                                            <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512"></path>
                                            <path fill="#EF652A" d="M256,472 L405,431 440,37 256,37"></path>
                                            <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z"></path>
                                            <path fill="#FFF" d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z"></path>
                                        </svg>
                                    </omni-icon>
                                </div>
                                <div class="${this._sourceTab === 'React' ? 'selected' : ''}" @click="${() =>
                                  (this._sourceTab = 'React')}">
                                    <omni-icon class="docs-omni-component" size="default">
                                        <img style="height: 24px; width: 24px;" src="./assets/images/react.svg" alt="React" />
                                    </omni-icon>
                                </div>
                            `
                            : nothing
                    }
                    <div class="docs-omni-component codepen-gen-btn ${
                        this.story!.frameworkSources?.find((fs) => fs.framework === this._sourceTab)?.disableCodePen ? 'no-display' : ''
                    }" @click="${() =>
            this._generateCodePen(this._sourceTab, {
                React: reactSource,
                HTML: htmlSource
            })}">
                        <omni-icon class="docs-omni-component" size="default">
                            <svg class="hidden-after-760" style="height: 12px; stroke: var(--omni-theme-font-color);" viewBox="0 0 138 26" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
                            <svg class="hidden-until-760" style="height: 24px; stroke: var(--omni-theme-font-color); background: var(--omni-theme-background-color);" xmlns="http://www.w3.org/2000/svg" aria-label="CodePen" role="img" viewBox="0 0 512 512"><g xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="33" stroke-linejoin="round"><path d="M81 198v116l175 117 175-117V198L256 81z"/><path d="M81 198l175 116 175-116M256 81v117"/><path d="M81 314l175-116 175 116M256 431V314"/></g></svg>
                        </omni-icon>
                    </div>
                </div>
            </div>
            ${
                this.story?.play
                    ? html`
                <div class="${this.key + '-result'} failure">
                    <div class="play-tests-out">
                    <span class="material-icons" style="color: #721c24;">close</span>
                    <span style="margin-left: 8px;"><pre>${this._playError}</pre></span>
                    </div>
                </div>
                `
                    : nothing
            }
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
        const css = this.customCss?.sheet;

        if (variable.name) {
            let rootCss: CSSStyleRule = undefined as any;
            if (css?.cssRules.length === 0) {
                const index = css.insertRule(':root {}');
                rootCss = css.cssRules.item(index) as CSSStyleRule;
            } else {
                for (let index = 0; index < css!.cssRules.length; index++) {
                    const rule = css!.cssRules[index] as CSSStyleRule;
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
                            const input = colorField.shadowRoot?.getElementById('inputField') as HTMLInputElement;

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

                            const value = (textField.shadowRoot?.getElementById('inputField') as HTMLInputElement).value;
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
        const css = this.customCss?.sheet;
        let rootCss: CSSStyleRule = undefined as any;
        if (css?.cssRules.length === 0) {
            const index = css.insertRule(':root {}');
            rootCss = css.cssRules.item(index) as CSSStyleRule;
        } else {
            for (let index = 0; index < css!.cssRules.length; index++) {
                const rule = css?.cssRules[index] as CSSStyleRule;
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
        const css = this.customCss?.sheet;

        let rootCss: CSSStyleRule = undefined as any;
        if (css?.cssRules.length === 0) {
            const index = css.insertRule(':root {}');
            rootCss = css.cssRules.item(index) as CSSStyleRule;
        } else {
            for (let index = 0; index < css!.cssRules.length; index++) {
                const rule = css?.cssRules[index] as CSSStyleRule;
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
        const containerElement = this.modal?.querySelector(`div.modal-container`) as Element;
        if (!e.composedPath().includes(containerElement)) {
            this._showStylesDialog = false;
        }
    }

    private async _resetLivePropertyEditor() {
        this.story!.args = JSON.parse(JSON.stringify(this.story?.originalArgs));
        this.overrideInteractive = false;
        const css = this.customCss?.sheet;
        for (let index = 0; index < css!.cssRules.length; index++) {
            const rule = css?.cssRules[index] as CSSStyleRule;
            if (rule.selectorText === ':root') {
                css?.deleteRule(index);
                break;
            }
        }
        sessionStorage.removeItem(`custom-css-${this.tag}`);

        this.requestUpdate();
        this.dispatchEvent(
            new CustomEvent(interactiveUpdate, {
                bubbles: true,
                composed: true
            })
        );

        await this.updateComplete;

        if (this.htmlCodeEditor) {
            await this.htmlCodeEditor.refresh(() =>
                this.story!.frameworkSources?.find((fs) => fs.framework === 'HTML')?.load
                    ? this.story!.frameworkSources!.find((fs) => fs.framework === 'HTML')!.load!(this.story!.args)
                    : getSourceFromLit(this.story!.render!(this.story!.args))
            );
        }
        if (this.reactCodeEditor) {
            await this.reactCodeEditor.refresh(() =>
                this.story!.frameworkSources?.find((fs) => fs.framework === 'React')?.load
                    ? this.story!.frameworkSources!.find((fs) => fs.framework === 'React')!.load!(this.story!.args)
                    : ''
            );
        }

        if (this.propertyEditor) {
            this.propertyEditor.resetSlots();
        }
    }

    private async _generateCodePen(source: FrameworkOption, frameworkSources: Record<FrameworkOption, string>) {
        const sourceCode = frameworkSources[source];

        const version = (document.getElementById('header-version-indicator')?.innerText ?? '').toLowerCase();

        const elementModule = this.customElements!.modules.find((module) => module.exports?.find((e) => e.name === this.tag));
        const splitPath = elementModule!.path.split('/');
        const componentDirectory = splitPath[splitPath.length - 2];

        const esmVersion =
            version && version !== 'latest' && version !== 'local'
                ? !['alpha', 'beta', 'next'].includes(version)
                    ? `${version}-esm`
                    : `esm-${version}`
                : 'esm';
        let html = '';
        let css = '';
        for (let index = 0; index < document.styleSheets.length; index++) {
            const sheet = document.styleSheets[index];
            try {
                if (sheet.cssRules) {
                    for (let idx = 0; idx < sheet.cssRules.length; idx++) {
                        const rule = sheet.cssRules[idx];
                        css += `
        ${rule.cssText}`;
                    }
                }
            } catch (error) {
                continue;
            }
        }
        const themeOption = document.documentElement.getAttribute('theme');
        let js = '';
        let js_pre = 'none';
        let js_externals = '';
        switch (source) {
            case 'HTML':
                html = `
<html theme="${themeOption ?? 'light'}">
    <body>
        ${sourceCode}
    </body>
</html>`;
                js = `import 'https://cdn.jsdelivr.net/npm/@capitec/omni-components@${esmVersion}/dist/omni-components.js';`;
                // js_pre = 'typescript';
                // css = '';
                break;
            case 'React':
                html = `
<html theme="${themeOption ?? 'light'}">
    <body style="
          text-align: center;
          padding: 24px;
    ">
        <div id="root"></div>
    </body>
</html>`;
                js = `
${sourceCode
    .replaceAll('@capitec/omni-components-react', `https://cdn.jsdelivr.net/npm/@capitec/omni-components-react@${esmVersion}`)
    .replace(new RegExp(`https://cdn.jsdelivr.net/npm/@capitec/omni-components-react@${esmVersion}/([^/"'\`]+)`, 'g'), '$&/index.js')
} 

const el = document.querySelector("#root");
ReactDOM.render(<App/>, el);`;
                js_pre = 'babel';
                js_externals =
                    'https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js;https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js';
                // css = '';
                break;
        }

        const data = {
            // All Optional
            title: `${this.key ?? this.story?.name ?? 'Generated CodePen'} - ${source}`,
            description:
                this.story?.description && typeof this.story?.description === 'function' ? this.story.description() : this.story?.description,
            private: false, // true || false - When the Pen is saved, it will save as Private if logged in user has that privilege, otherwise it will save as public
            // parent                : id // If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
            tags: [source, 'Omni Components', 'web components', 'custom elements'],
            editors: '1011', // Set which editors are open. In this example HTML open, CSS closed, JS open, console open
            layout: 'top', // top | left | right
            html: html,
            html_pre_processor: 'none', //"none" || "slim" || "haml" || "markdown",
            css: css,
            css_pre_processor: 'none', //"none" || "less" || "scss" || "sass" || "stylus",
            css_starter: 'neither', // "normalize" || "reset" || "neither",
            css_prefix: 'neither', // "autoprefixer" || "prefixfree" || "neither",
            js: js,
            js_pre_processor: js_pre, // "none" || "coffeescript" || "babel" || "livescript" || "typescript",
            // html_classes          : "loading",
            head: `<link rel="stylesheet preload" href="https://fonts.googleapis.com/css?family=Hind Vadodara" as="style">
            <link rel="stylesheet preload" href="https://fonts.googleapis.com/icon?family=Material+Icons" as="style">`,
            // css_external          : "http://yoursite.com/style.css", // semi-colon separate multiple files
            js_external: js_externals // semi-colon separate multiple files
        };

        const JSONstring = JSON.stringify(data)
            // Quotes will screw up the JSON
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');

        const formHTML = `<form style="display: none;" action="https://codepen.io/pen/define" method="POST" target="_blank"> 
            <input type="hidden" name="data" value='${JSONstring}'>
            <input type="submit" class="code-submit">
        </form>`;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formHTML;
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        const codeSubmit = tempDiv.querySelector('.code-submit') as HTMLInputElement;
        codeSubmit.click();

        document.body.removeChild(tempDiv);

        // const body = new URLSearchParams();
        // body.append('data', JSONstring);

        // const response = await fetch('https://codepen.io/pen/define', {
        //     method: 'post',
        //     body: body,
        // })

        // console.log(response);
    }

    private async _play(story: any, canvasElementQuery: string) {
        try {
            if (!story.play) {
                return;
            }

            this._isBusyPlaying = true;

            const context = this._createStoryContext(story, canvasElementQuery);
            await story.play(context);
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.success')!.style.display = 'flex';
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.failure')!.style.display = 'none';
        } catch (error: any) {
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.failure')!.style.display = 'flex';
            this.querySelector<HTMLDivElement>(canvasElementQuery + '-result.success')!.style.display = 'none';

            //Try to strip chalk colours from jest expect error outputs
            this._playError = (error?.matcherResult?.message ?? error?.message)
                ?.toString()
                .replace(/\u001b[^m]*?m/g, '')
                // eslint-disable-next-line no-regex-spaces
                .replace(/\n \u001b[^m]*?m/g, '')
                .replace(/\u001b[^m]*?m\n/g, '')
                .replace(/\n\u001b[^m]*?m/g, '');
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

    private _currentCodeTheme() {
        if (this.theme?.toLowerCase() === 'dark') {
            return codeThemeDark;
        }
        return codeTheme;
    }
}

const interactiveUpdate = 'story-renderer-interactive-update';

type CSSVariable = {
    control: 'text' | 'color';
    description: string;
    category: string;
    subcategory: string;
    value: string;
    name: string;
};
