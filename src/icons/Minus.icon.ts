import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A minus icon component
 *
 * ```js
 * import '@capitec/omni-components/icons/Minus.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-minus-icon></omni-minus-icon>
 * ```
 *
 * @element omni-minus-icon
 *
 */
@customElement('omni-minus-icon')
export class MinusIcon extends LitElement {
    // --------------
    // INITIALISATION
    // --------------

    /**
     * @hideconstructor
     */
    constructor() {
        super();
    }

    // ------------------
    // LIFECYCLE HANDLERS
    // ------------------

    // n/a

    // ----------------
    // PUBLIC FUNCTIONS
    // ----------------

    // n/a

    // --------------
    // EVENT HANDLERS
    // --------------

    // n/a

    // ---------------
    // PRIVATE METHODS
    // ---------------

    // n/a

    // -------------------
    // RENDERING TEMPLATES
    // -------------------

    /**
     * The element style template.
     *
     */
    static override get styles() {
        return [
            ComponentStyles,
            css`
                :host {
                    color: inherit;
                    fill: inherit;
                    background-color: inherit;
                    background: inherit;

                    width: var(--omni-icon-size, 16px);
                    height: var(--omni-icon-size, 16px);
                }
            `
        ];
    }

    /**
     * Apply changes to the element DOM when a property value changes.
     *
     * @returns {TemplateResult} The updated DOM template.
     */
    override render(): TemplateResult {
        return html` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
            <path d="M28.615 24c0 .35-.26.64-.598.686l-.094.006h-7.846a.692.692 0 0 1-.094-1.378l.094-.006h7.846c.382 0 .692.31.692.692Z" />
        </svg>`;
    }
}
