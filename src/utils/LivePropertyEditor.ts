import { html as langHtml } from '@codemirror/lang-html';
import { githubDark } from '@ddietr/codemirror-themes/github-dark.js';
import { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
import { css, html, LitElement, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import OmniElement from '../core/OmniElement.js';
import { CodeMirror, CodeMirrorEditorEvent, CodeMirrorSourceUpdateEvent } from './CodeMirror.js';
import { ifNotEmpty } from './Directives.js';
import {
    loadCustomElementsModuleFor,
    loadCustomElements,
    loadCustomElementsCodeMirrorCompletionsRemote,
    ComponentStoryFormat
} from './StoryUtils.js';

import '../label/Label.js';
import '../icons/Loading.icon.js';
import '../switch/Switch.js';
import './CodeMirror.js';

@customElement('live-property-editor')
export class LivePropertyEditor extends OmniElement {
    @property({ type: Object, reflect: false }) data: ComponentStoryFormat<any>;
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
            `
        ];
    }

    public resetSlots() {
        if (this.slotCodeMirrors) {
            this.slotCodeMirrors.forEach(async (codeMirror) => {
                const slotName = codeMirror.getAttribute('data-slot-name');
                if (slotName) {
                    const newCode = (this.data && this.data.args[slotName] ? this.data.args[slotName] : undefined);
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

        const attributes: TemplateResult[] = [];
        const slots: { html: TemplateResult; name: string }[] = [];
        module.declarations.forEach((d) => {
            const declaration = d as CustomElement;
            if (declaration.slots) {
                declaration.slots.forEach((slot) => {
                    if (slots.find((s) => s.name === slot.name) || (this.data && !Object.prototype.hasOwnProperty.call(this.data.args, slot.name))) {
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
                                .extensions="${async () => [githubDark, langHtml(await loadCustomElementsCodeMirrorCompletionsRemote())]}"
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
                    if (this.ignoreAttributes && this.ignoreAttributes.split(',').includes(attribute.name)) {
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
                        attribute.type.text.includes('\'')
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
                    } else if (attribute.type.text === 'object' || 
                               attribute.type.text.includes('Promise') || 
                               (this.data?.args && this.data.args[attribute.name] && (typeof this.data.args[attribute.name] === 'function' || typeof this.data.args[attribute.name].then === 'function'))) {
                        return;
                    } else {
                        // Apply regex for color picker, etc...
                        attributeEditor = html` <input
                            ?disabled=${this.disabled}
                            type="text"
                            .value="${live(
                                this.data
                                    ? this.data.args[attribute.name] ?? this.data.args[attribute.fieldName ?? attribute.name] ?? ''
                                    : ''
                            )}"
                            @input="${(e: Event) => {
                                const value = (e.target as HTMLInputElement).value;
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
                            }}" />`;
                    }
                    if (attributeEditor) {
                        attributes.push(html`
                            <omni-label type="subtitle" label="${attribute.name}"></omni-label>
                            ${attributeEditor}
                        `);
                    }
                });
            }
        });

        if (attributes.length === 0 && slots.length === 0) {
            return nothing;
        }

        return html`
            <div>
                <br />
                <br />
                ${attributes}
                <br />
                <br />
                ${slots.map((s) => s.html)}
                <br />
                <br />
            </div>
        `;
    }
    private _propertyChanged(propertyChangeDetail: PropertyChangeEvent) {
        this.dispatchEvent(
            new CustomEvent('property-change', {
                detail: propertyChangeDetail
            })
        );
    }

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        if (_changedProperties.has('disabled') && this.slotCodeMirrors) {
            this.resetSlots();
        }
    }
}

export type PropertyChangeEvent = { property: string; newValue: string; oldValue: string };
