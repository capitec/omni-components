/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-prototype-builtins */
import { html as langHtml } from '@codemirror/lang-html';
import { githubDark as codeThemeDark } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { Package, CustomElement } from 'custom-elements-manifest/schema';
import { css, html, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import OmniElement from '../core/OmniElement.js';
import { TextField } from '../text-field/TextField.js';
import { CodeEditor, CodeMirrorSourceUpdateEvent } from './CodeEditor.js';
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
import './CodeEditor.js';

/**
 * @ignore
 */
@customElement('live-property-editor')
export class LivePropertyEditor extends OmniElement {
    @property({ type: Object, reflect: false }) data?: ComponentStoryFormat<any>;
    @property({ type: String, reflect: true }) element?: string;
    @property({ type: Boolean, reflect: true }) disabled!: boolean;
    @property({ type: String, attribute: 'ignore-attributes', reflect: true }) ignoreAttributes?: string;
    @property({ type: String, attribute: 'custom-elements', reflect: true }) customElementsPath: string = './custom-elements.json';

    @state() customElements?: Package;

    @queryAll('.slot-code') slotCodeEditors?: NodeListOf<CodeEditor>;

    private _firstRenderCompleted!: boolean;
    private theme?: string;

    override async connectedCallback() {
        super.connectedCallback();

        this.customElements = await loadCustomElements(this.customElementsPath);

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

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                }

                :host([disabled]) {
                    pointer-events: none;
                    background-color: #f9f9f9;
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

                .docs-text-field {
                    width: 100%;
                    /*
                    --omni-form-border-color: var(--docs-border-color);
                    --omni-theme-border-width: 10px;
                    --omni-form-hover-color: transparent;
                    --omni-form-focussed-border-width: 1px;
                    --omni-form-focussed-border-color: var(--docs-border-color);
                    */
                    /*border: 1px solid var(--docs-border-color);*/
                }

                .docs-select {
                    /*
                    padding: 5px;
                    cursor: pointer;
                    border-radius: 6px;
                    border: 1px solid var(--docs-border-color);
                    display: flex;
                    min-width: 191px;
                    min-height: 41px;
                    width: 100%;
                    background-color: var(--omni-theme-background-color, inherit);
                    color: var(--omni-theme-font-color, inherit);*/
                }

                .docs-select:focus-visible {
                    outline: none;
                }

                .live-header {
                    margin-top: 15px;
                }

                .live-header:first-of-type {
                    margin-top: 0;
                }
            `
        ];
    }

    public resetSlots() {
        if (this.slotCodeEditors) {
            this.slotCodeEditors.forEach(async (codeEditor) => {
                const slotName = codeEditor.getAttribute('data-slot-name');
                if (slotName) {
                    const newCode = this.data && this.data.args![slotName] ? this.data.args![slotName] : undefined;
                    await codeEditor.refresh(() => newCode);
                }
            });
        }
    }

    protected override render() {
        if (!this.customElements) {
            return html`<omni-loading-icon class="loading"></omni-loading-icon>`;
        }

        const module = loadCustomElementsModuleFor(this.element as string, this.customElements);
        const attributes: { html: TemplateResult; name: string }[] = [];
        const slots: { html: TemplateResult; name: string }[] = [];

        module?.declarations?.forEach((d) => {
            const declaration = d as unknown as CustomElement & { cssCategory: string };
            if (declaration.slots) {
                declaration.slots.forEach((slot) => {
                    if (slots.find((s) => s.name === slot.name) || (this.data && !Object.prototype.hasOwnProperty.call(this.data.args, slot.name)))
                        return;

                    slots.push({
                        name: slot.name,
                        html: html`
              <omni-label class="live-header" label="${slot.name}"></omni-label>
              <code-editor
                class="slot-code"
                data-slot-name="${slot.name}"
                ?disabled=${this.disabled}
                .extensions="${async () => [this._currentCodeTheme(), langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
                .code="${ifNotEmpty(this.data && this.data.args![slot.name] ? this.data.args![slot.name] : undefined)}"
                @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
                    this._propertyChanged({
                        property: slot.name,
                        newValue: e.detail.source,
                        oldValue: e.detail.oldSource
                    });
                }}">
              </code-editor>
            `
                    });
                });
            }

            if (declaration.attributes) {
                declaration.attributes.forEach((attribute) => {
                    if (
                        (this.ignoreAttributes && this.ignoreAttributes.split(',').includes(attribute.name)) ||
                        attributes.find((a) => a.name === attribute.name)
                    )
                        return;

                    let attributeEditor: TemplateResult = undefined as any;
                    try {
                        if (attribute?.type?.text?.replace('| undefined', '')?.trim() === 'boolean') {
                            attributeEditor = html`
              <omni-switch
                class="docs-select"
                ?disabled=${this.disabled}
                ?checked="${
                    this.data
                        ? this.data.args![attribute.name] ?? this.data.args![attribute.fieldName ?? attribute.name]
                        : attribute.default === 'true'
                }"
                @value-change="${(e: CustomEvent) => {
                    this._propertyChanged({
                        property:
                            this.data && attribute.fieldName && this.data.args?.hasOwnProperty(attribute.fieldName)
                                ? attribute.fieldName
                                : attribute.name,
                        newValue: e.detail.new,
                        oldValue: e.detail.old
                    });
                }}">
              </omni-switch>
            `;
                        } else if (
                            attribute.type?.text?.replace('| undefined', '')?.trim() !== 'object' &&
                            attribute.type?.text?.replace('| undefined', '')?.trim() !== 'string' &&
                            attribute.type?.text?.replace('| undefined', '')?.trim() !== 'boolean' &&
                            !attribute.type?.text?.replace('| undefined', '')?.trim().includes('Promise') &&
                            attribute.type?.text?.replace('| undefined', '')?.trim().includes("'")
                        ) {
                            const typesRaw = attribute.type?.text.split(' | ');
                            const types = [];
                            for (const type in typesRaw) {
                                const typeValue = typesRaw[type];
                                types.push(typeValue.substring(1, typeValue.length - 1));
                            }
                            const startValue = this.data
                                ? this.data.args![attribute.name] ?? this.data.args![attribute.fieldName ?? attribute.name]
                                : undefined;

                            attributeEditor = html`
              <omni-select
                class="docs-select"
                ?disabled=${this.disabled}
                value=${startValue}
                .items=${types}
                @change="${(e: Event) => {
                    const value = (e.target as HTMLSelectElement).value;
                    this._propertyChanged({
                        property:
                            this.data && attribute.fieldName && this.data.args?.hasOwnProperty(attribute.fieldName)
                                ? attribute.fieldName
                                : attribute.name,
                        newValue: value,
                        oldValue: this.data ? this.data.args![attribute.name] : undefined
                    });
                }}"
            >
                
            </omni-select>

            `;
                        } else if (
                            attribute.type?.text?.replace('| undefined', '')?.trim() === 'object' ||
                            attribute.type?.text?.replace('| undefined', '')?.trim().includes('Promise') ||
                            (this.data?.args &&
                                this.data.args[attribute.name] &&
                                (typeof this.data.args[attribute.name] === 'function' || typeof this.data.args[attribute.name].then === 'function'))
                        ) {
                            return;
                        } else {
                            const val = this.data
                                ? this.data.args![attribute.name] ?? this.data.args![attribute.fieldName ?? attribute.name] ?? ''
                                : '';
                            let boundValue = '';
                            if (typeof val === 'string') {
                                boundValue = val;
                            } else {
                                boundValue = JSON.stringify(val);
                            }
                            attributeEditor = html`
              <omni-text-field
                class="docs-text-field"
                data-omni-keyboard-hidden
                ?disabled=${this.disabled}
                .value="${live(boundValue)}"
                @input="${async (e: Event) => {
                    const textField = e.target as TextField;
                    // textField.requestUpdate();
                    // await textField.updateComplete;

                    let value = (textField.shadowRoot?.getElementById('inputField') as HTMLInputElement).value;
                    if (typeof val !== 'string') {
                        value = JSON.parse(value);
                    }
                    this._propertyChanged({
                        property:
                            this.data && attribute.fieldName && this.data.args?.hasOwnProperty(attribute.fieldName)
                                ? attribute.fieldName
                                : attribute.name,
                        newValue: value,
                        oldValue: this.data ? this.data.args![attribute.name] ?? this.data.args![attribute.fieldName ?? attribute.name] : undefined
                    });
                }}">
              </omni-text-field>
            `;
                        }
                    } catch (error) {
                        console.error(error);
                        return;
                    }
                    if (attributeEditor) {
                        attributes.push({
                            html: html`
                            <omni-label class="live-header" label="${attribute.name}"></omni-label>                
                ${attributeEditor}
              `,
                            name: attribute.name
                        });
                    }
                });
            }
        });

        if (attributes.length === 0 && slots.length === 0) {
            return nothing;
        }

        return html` <div style="padding: 24px;"> ${attributes.map((a) => a.html)} ${slots.map((s) => s.html)} </div> `;
    }

    private _propertyChanged(propertyChangeDetail: PropertyChangeEvent) {
        this.dispatchEvent(
            new CustomEvent('property-change', {
                detail: propertyChangeDetail
            })
        );
    }

    private _currentCodeTheme() {
        if (this.theme?.toLowerCase() === 'dark') {
            return codeThemeDark;
        }
        return codeTheme;
    }

    protected override async updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
        if (_changedProperties.has('disabled') && this.slotCodeEditors) {
            this.resetSlots();
        }

        if (_changedProperties.has('data') && _changedProperties.get('data')) {
            if (!this._firstRenderCompleted) {
                // console.log('await updateComplete');
                await this.updateComplete;
                // console.log('awaited updateComplete');
                this.dispatchEvent(
                    new CustomEvent('component-render-complete', {
                        bubbles: true
                    })
                );
                this._firstRenderCompleted = true;
            }
        }
    }
}

export type PropertyChangeEvent = { property: string; newValue: string | number | boolean; oldValue: string | number | boolean };
