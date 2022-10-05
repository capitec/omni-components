import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A plus icon component
 *
 * ```js 
 * import '@capitec/omni-components/icons/Plus.icon.js'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-plus-icon></omni-plus-icon>
 * ```
 * 
 * @element omni-plus-icon
 * 
 */
@customElement('omni-plus-icon')
export class PlusIcon extends LitElement {

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
        return html`  
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%"><path clip-rule="evenodd" d="M24.72 24.72v3.36a.72.72 0 0 1-1.44 0v-3.36h-3.361a.72.72 0 1 1 0-1.44h3.36v-3.36a.72.72 0 1 1 1.44 0v3.36h3.36a.72.72 0 1 1 0 1.44h-3.36Z"/></svg>`;
    }
}