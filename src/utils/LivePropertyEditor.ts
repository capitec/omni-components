import { html as langHtml } from '@codemirror/lang-html';
// import { githubDark as codeTheme } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
import { css, html, LitElement, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import OmniElement from '../core/OmniElement.js';
import { TextField } from '../text-field/TextField.js';
import { CodeMirror, CodeMirrorEditorEvent, CodeMirrorSourceUpdateEvent } from './CodeMirror.js';
import { ifNotEmpty } from './Directives.js';
import {
    loadCustomElementsModuleFor,
    loadCustomElements,
    loadCustomElementsCodeMirrorCompletionsRemote,
    ComponentStoryFormat,
    loadCssProperties
} from './StoryUtils.js';

import '../label/Label.js';
import '../text-field/TextField.js';
import '../icons/Loading.icon.js';
import '../switch/Switch.js';
import './CodeMirror.js';

@customElement('live-property-editor')
export class LivePropertyEditor extends OmniElement {
    @property({ type: Object, reflect: false }) data: ComponentStoryFormat<any>;
    @property({ type: Function, reflect: false }) cssValueReader: (variable: CSSVariable) => CSSVariable = (c) => c;
    @property({ type: String, reflect: true }) element: string;
    @property({ type: Boolean, reflect: true }) disabled: boolean;
    @property({ type: String, attribute: 'ignore-attributes', reflect: true }) ignoreAttributes: string;
    @property({ type: String, attribute: 'custom-elements', reflect: true }) customElementsPath: string = '/custom-elements.json';

    @state() customElements: Package;

    @queryAll('.slot-code') slotCodeMirrors: NodeListOf<CodeMirror>;

    override async connectedCallback() {
        super.connectedCallback();

        this.customElements = await loadCustomElements(this.customElementsPath);
    }

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    border-color: black;
                    border-width: 2px;
                    border-style: dotted;

                    background-color: beige;
                }

                :host[disabled] {
                    pointer-events: none;
                    background-color: lightgray;
                }

                .loading {
                    max-width: 25px;
                    max-height: 100px;
                }

                .css-prop {
                    margin: 5px;
                }

                .collapsible {
                    background-color: #777;
                    color: white;
                    cursor: pointer;
                    padding: 18px;
                    width: 100%;
                    border: none;
                    text-align: left;
                    outline: none;
                    font-size: 15px;
                }

                .active,
                .collapsible:hover {
                    background-color: #555;
                }

                .expandable {
                    padding: 0 18px;
                    display: none;
                    overflow: hidden;
                    background-color: #f1f1f1;
                    flex-direction: column;
                }

                .tooltip {
                    position: relative;
                    display: inline-block;
                    border-bottom: 1px dotted black;
                }

                .tooltip .tooltiptext {
                    visibility: hidden;
                    width: 120px;
                    background-color: black;
                    color: #fff;
                    text-align: center;
                    border-radius: 6px;
                    padding: 5px 0;
                    position: absolute;
                    z-index: 1;
                    bottom: 150%;
                    left: 50%;
                    margin-left: -60px;
                }

                .tooltip .tooltiptext::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: black transparent transparent transparent;
                }

                .tooltip:hover .tooltiptext {
                    visibility: visible;
                }
            `
        ];
    }

    public resetSlots() {
        if (this.slotCodeMirrors) {
            this.slotCodeMirrors.forEach(async (codeMirror) => {
                const slotName = codeMirror.getAttribute('data-slot-name');
                if (slotName) {
                    const newCode = this.data && this.data.args[slotName] ? this.data.args[slotName] : undefined;
                    await codeMirror.refresh(() => newCode);
                }
            });
        }
    }

    protected override render() {
        if (!this.customElements) {
            return html`<omni-loading-icon class="loading"></omni-loading-icon>`;
        }
        const module = loadCustomElementsModuleFor(this.element, this.customElements);

        const attributes: { html: TemplateResult; name: string }[] = [];
        const slots: { html: TemplateResult; name: string }[] = [];
        const cssProperties: { category: string; propertiesHtml: TemplateResult[] }[] = [];

        module.declarations.forEach((d) => {
            const declaration = d as unknown as CustomElement & { cssCategory: string };
            if (declaration.slots) {
                declaration.slots.forEach((slot) => {
                    if (
                        slots.find((s) => s.name === slot.name) ||
                        (this.data && !Object.prototype.hasOwnProperty.call(this.data.args, slot.name))
                    ) {
                        return;
                    }

                    slots.push({
                        name: slot.name,
                        html: html`
                            <omni-label type="subtitle" label="${slot.name}"></omni-label>
                            <omni-code-mirror
                                class="slot-code"
                                data-slot-name="${slot.name}"
                                ?disabled=${this.disabled}
                                .extensions="${async () => [codeTheme, langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                                .code="${ifNotEmpty(this.data && this.data.args[slot.name] ? this.data.args[slot.name] : undefined)}"
                                @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                                    this._propertyChanged({
                                        property: slot.name,
                                        newValue: e.detail.source,
                                        oldValue: e.detail.oldSource
                                    });
                                }}">
                            </omni-code-mirror>
                        `
                    });
                });
            }
            if (declaration.attributes) {
                declaration.attributes.forEach((attribute) => {
                    if (
                        (this.ignoreAttributes && this.ignoreAttributes.split(',').includes(attribute.name)) ||
                        attributes.find((a) => a.name === attribute.name)
                    ) {
                        return;
                    }

                    let attributeEditor: TemplateResult = undefined;
                    if (attribute.type.text === 'boolean') {
                        attributeEditor = html` <omni-switch
                            ?disabled=${this.disabled}
                            ?checked="${this.data
                                ? this.data.args[attribute.name] ?? this.data.args[attribute.fieldName ?? attribute.name]
                                : attribute.default === 'true'}"
                            @value-change="${(e: CustomEvent) => {
                                this._propertyChanged({
                                    property:
                                        this.data && attribute.fieldName && this.data.args[attribute.fieldName]
                                            ? attribute.fieldName
                                            : attribute.name,
                                    newValue: e.detail.new,
                                    oldValue: e.detail.old
                                });
                            }}"></omni-switch>`;
                    } else if (
                        attribute.type.text !== 'object' &&
                        attribute.type.text !== 'string' &&
                        attribute.type.text !== 'boolean' &&
                        !attribute.type.text.includes('Promise') &&
                        attribute.type.text.includes("'")
                    ) {
                        const typesRaw = attribute.type.text.split(' | ');
                        const types = [];
                        for (const type in typesRaw) {
                            const typeValue = typesRaw[type];
                            types.push(typeValue.substring(1, typeValue.length - 1));
                        }
                        const startValue = this.data
                            ? this.data.args[attribute.name] ?? this.data.args[attribute.fieldName ?? attribute.name]
                            : undefined;

                        attributeEditor = html` <select
                            ?disabled=${this.disabled}
                            @change="${(e: Event) => {
                                const value = (e.target as HTMLSelectElement).value;
                                this._propertyChanged({
                                    property:
                                        this.data && attribute.fieldName && this.data.args[attribute.fieldName]
                                            ? attribute.fieldName
                                            : attribute.name,
                                    newValue: value,
                                    oldValue: this.data ? this.data.args[attribute.name] : undefined
                                });
                            }}">
                            ${types.map((t) => html`<option value="${t}" ?selected="${t === startValue}">${t}</option>`)}
                        </select>`;
                    } else if (
                        attribute.type.text === 'object' ||
                        attribute.type.text.includes('Promise') ||
                        (this.data?.args &&
                            this.data.args[attribute.name] &&
                            (typeof this.data.args[attribute.name] === 'function' ||
                                typeof this.data.args[attribute.name].then === 'function'))
                    ) {
                        return;
                    } else {
                        attributeEditor = html`
                            <omni-text-field
                                ?disabled=${this.disabled}
                                .value="${live(
                                    this.data
                                        ? this.data.args[attribute.name] ?? this.data.args[attribute.fieldName ?? attribute.name] ?? ''
                                        : ''
                                )}"
                                @input="${async (e: Event) => {
                                    const textField = e.target as TextField;
                                    // textField.requestUpdate();
                                    // await textField.updateComplete;

                                    const value = (textField.shadowRoot.getElementById('inputField') as HTMLInputElement).value;
                                    this._propertyChanged({
                                        property:
                                            this.data && attribute.fieldName && this.data.args[attribute.fieldName]
                                                ? attribute.fieldName
                                                : attribute.name,
                                        newValue: value,
                                        oldValue: this.data
                                            ? this.data.args[attribute.name] ?? this.data.args[attribute.fieldName ?? attribute.name]
                                            : undefined
                                    });
                                }}">
                            </omni-text-field>
                        `;
                    }
                    if (attributeEditor) {
                        attributes.push({
                            html: html`
                                <omni-label type="subtitle" label="${attribute.name}"></omni-label>
                                ${attributeEditor}
                            `,
                            name: attribute.name
                        });
                    }
                });
            }
        });

        const cssDefinitions = loadCssProperties(this.element, this.customElements);
        if (cssDefinitions && Object.keys(cssDefinitions).length > 0) {
            Object.keys(cssDefinitions).forEach((cssKey) => {
                const definition = cssDefinitions[cssKey];
                const category = definition.subcategory ?? 'Component Variables';
                let categoryProps = cssProperties.find((c) => c.category === category);
                if (!categoryProps) {
                    categoryProps = {
                        category: category,
                        propertiesHtml: []
                    };
                    cssProperties.push(categoryProps);
                }

                if (definition.control === 'color') {
                    categoryProps.propertiesHtml.push(html`
                        <div class="tooltip css-prop">
                            <omni-color-field
                                id="input-${cssKey}"
                                class="css-prop"
                                label="--${cssKey}"
                                ?disabled=${this.disabled}
                                .value="${live(
                                    this.cssValueReader({
                                        name: `--${cssKey}`,
                                        value: ''
                                    }).value
                                )}"
                                @input="${async (e: Event) => {
                                    const colorField = e.target as TextField;
                                    const input = colorField.shadowRoot.getElementById('inputField') as HTMLInputElement;

                                    const value = input.value;
                                    this._cssChanged({
                                        name: `--${cssKey}`,
                                        value: value
                                    });
                                }}">
                            </omni-color-field>
                            <span class="tooltiptext">${definition.description}</span>
                        </div>
                    `);
                } else {
                    categoryProps.propertiesHtml.push(html`
                        <div class="tooltip css-prop">
                            <omni-text-field
                                class="css-prop"
                                ?disabled=${this.disabled}
                                label="--${cssKey}"
                                @input="${async (e: Event) => {
                                    const textField = e.target as TextField;

                                    const value = (textField.shadowRoot.getElementById('inputField') as HTMLInputElement).value;
                                    this._cssChanged({
                                        name: `--${cssKey}`,
                                        value: value
                                    });
                                }}">
                            </omni-text-field>
                            <span class="tooltiptext">${definition.description}</span>
                        </div>
                    `);
                }
            });
        }

        if (attributes.length === 0 && slots.length === 0 && cssProperties.filter((c) => c && c.propertiesHtml.length > 0).length === 0) {
            return nothing;
        }

        return html`
            <div>
                <br />
                <br />
                ${attributes.map((a) => a.html)}
                <br />
                <br />
                ${slots.map((s) => s.html)}
                <br />
                <br />
                <button type="button" class="collapsible" @click="${(e: PointerEvent) => this._expandCollapse(e)}">CSS Variables</button>
                <div class="expandable css-prop">
                    ${cssProperties.map(
                        (c) => html`
                            <div class="css-prop">
                                <button type="button" class="collapsible" @click="${(e: PointerEvent) => this._expandCollapse(e)}"
                                    >${c.category}</button
                                >
                                <div class="expandable"> ${c.propertiesHtml} </div>
                            </div>
                        `
                    )}
                </div>
            </div>
        `;
    }
    private _expandCollapse(e: PointerEvent) {
        const button = e.target as HTMLButtonElement;
        button.classList.toggle('active');
        const content = button.nextElementSibling as HTMLElement;
        if (content.style.display === 'flex') {
            content.style.display = 'none';
        } else {
            content.style.display = 'flex';
        }
    }
    private _propertyChanged(propertyChangeDetail: PropertyChangeEvent) {
        this.dispatchEvent(
            new CustomEvent('property-change', {
                detail: propertyChangeDetail
            })
        );
    }
    private _cssChanged(cssVariableDetail: CSSVariable) {
        this.dispatchEvent(
            new CustomEvent('css-change', {
                detail: cssVariableDetail
            })
        );
    }

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        if (_changedProperties.has('disabled') && this.slotCodeMirrors) {
            this.resetSlots();
        }
    }
}

export type PropertyChangeEvent = { property: string; newValue: string | number | boolean; oldValue: string | number | boolean };
export type CSSVariable = { name: string; value: string };
