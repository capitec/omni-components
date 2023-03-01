import { html, css, TemplateResult, nothing, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

import '../label/';

/**
 * Control to group radio components for single selection
 *
 * @import
 * ```js
 * import '@capitec/omni-components/radio';
 * ```
 *
 * @example
 * ```html
 * <omni-radio-group>
 *      <omni-radio label="Lorem Ipsum"></omni-radio>
 *      <omni-radio label="Dolor"></omni-radio>
 * </omni-radio-group>
 * ```
 *
 * @element omni-radio-group
 * 
 * @slot - Content to manage in the radio group, typically &lt;input type="radio" /&gt; and/or &lt;omni-radio&gt;&lt;/omni-radio&gt;.
 *
 * @fires {CustomEvent<RadioChangeEventDetail>} radio-change - Dispatched when a radio selection is changed.
 *
 * @csspart radios - Container element for slotted radio elements
 * 
 * @cssprop --omni-radio-group-label-font-size - Label font size.
 * @cssprop --omni-radio-group-label-font-weight - Label font weight.
 * @cssprop --omni-radio-group-label-margin-bottom - Label bottom margin.
 * @cssprop --omni-radio-group-vertical-margin - Margin in between radio elements when arranged vertically.
 * @cssprop --omni-radio-group-horizontal-margin - Margin in between radio elements when arranged horizontally.
 *
 */
@customElement('omni-radio-group')
export class RadioGroup extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;
    /**
     * Allow deselection of radio elements.
     * @attr [allow-deselect]
     */
    @property({ type: Boolean, attribute: 'allow-deselect', reflect: true }) allowDeselect?: boolean;
    /**
     * Arrange radio elements horizontally.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) horizontal?: boolean;

    /**
     * Data associated with the component.
     * @attr
     */
    @property({ type: Object, reflect: true }) data?: object;

    private _selected: number = NaN;
    private radios: CheckableElement[] = [];

    /**
     * Selected index of radio elements
     * @no_attribute
     * @ignore
     */
    set selected(idx: number) {
        if (this.selected === idx) {
            return;
        }

        if (isFinite(this.selected)) {
            const previousSelected = this.radios[this.selected];
            if (previousSelected) {
                this._uncheckElement(previousSelected);
            }
        }

        const newSelected = this.radios[idx];
        if (newSelected) {
            this._checkElement(newSelected);
        }

        this.setAttribute('selected', idx.toString());
        this._selected = idx;
    }

    /**
     * Selected index of radio elements
     * @no_attribute
     * @ignore
     */
    get selected() {
        return this._selected;
    }

    private _uncheckElement(previousSelected: CheckableElement) {
        previousSelected.removeAttribute('aria-checked');
        if ('checked' in previousSelected) {
            previousSelected.checked = false;
        }
        previousSelected.removeAttribute('checked');
    }

    private _checkElement(newSelected: CheckableElement) {
        newSelected.focus();
        newSelected.setAttribute('aria-checked', 'true');
        if ('checked' in newSelected) {
            newSelected.checked = true;
        }
        newSelected.setAttribute('checked', 'true');
    }

    override connectedCallback(): void {
        this.setAttribute('role', 'radioGroup');

        this.addEventListener('click', this._handleClick.bind(this));

        super.connectedCallback();
    }

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        const slot = this.renderRoot.querySelector('slot');
        if (slot) {
            slot.addEventListener('slotchange', (e) => {
                this._loadRadios();
            });
        }
        this._loadRadios();
    }

    _loadRadios() {
        const slot = this.renderRoot.querySelector('slot');
        this.radios = Array.from(slot?.assignedElements() ?? []) as CheckableElement[];

        if (this.radios.length > 0) {
            // Setup initial state
            const selectedRadio = this.radios.find((r) => r.hasAttribute('checked'));
            if (selectedRadio) {
                selectedRadio.setAttribute('aria-checked', 'true');
                this._selected = this.radios.indexOf(selectedRadio);
            } else {
                this._selected = -1;
            }
        }
    }

    _handleClick(e: MouseEvent) {
        const target = e.target as CheckableElement;
        let idx = this.radios.indexOf(target);
        if (idx === -1 || target.hasAttribute('disabled')) {
            return;
        }
        const previousSelected = this.radios[this.selected];
        const isDeselect = this.selected === idx;
        if (isDeselect && this.allowDeselect) {
            idx = -1;
        }
        this.selected = idx;
        const newSelected = this.radios[this.selected];

        if (!this.allowDeselect && !target.hasAttribute('checked')) {
            this._checkElement(target);
        }
        if (isDeselect && this.allowDeselect && target.hasAttribute('checked')) {
            this._uncheckElement(target);
        }

        this.dispatchEvent(
            new CustomEvent<RadioChangeEventDetail>('radio-change', {
                bubbles: true,
                composed: true,
                detail: {
                    current: newSelected,
                    previous: previousSelected
                }
            })
        );
        this.requestUpdate();
    }

    static override get styles() {
        return [
            super.styles,
            css`
				:host {
					flex-shrink: 0;				
					display: flex;
					flex-direction: column;
				}

				:host > .wrapper {
					flex-grow: 1;

					display: flex;
					flex-direction: column;
				}

				.label {
					--omni-label-default-font-size: var(--omni-radio-group-label-font-size, 14px);
					--omni-label-default-font-weight: var(--omni-radio-group-label-font-weight, 400);
					margin-bottom: var(--omni-radio-group-label-margin-bottom, 6px);
				}

                .radios:not([data-horizontal]) ::slotted(:not(:last-child)) {
                    margin-bottom: var(--omni-radio-group-vertical-margin, 10px) !important;
                }

                .radios[data-horizontal] {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .radios[data-horizontal] ::slotted(:not(:last-child)) {
                    margin-right: var(--omni-radio-group-horizontal-margin, 10px) !important;
                }
			`
        ];
    }

    override render(): TemplateResult {
        return html`
        ${this.label ? html`<omni-label class="label" label="${this.label}" type="default"></omni-label>` : nothing}
        <div class="radios" part="radios" ?data-horizontal="${this.horizontal}">
            <slot></slot>
        </div>
    `;
    }
}

export type CheckableElement = HTMLElement & { checked: boolean | undefined };

export type RadioChangeEventDetail = { current?: CheckableElement; previous?: CheckableElement };

declare global {
    interface HTMLElementTagNameMap {
        'omni-radio-group': RadioGroup;
    }
}
