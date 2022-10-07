import { LitElement } from 'lit';

/**
 * An custom web component that renders the template directly into the main DOM tree instead of the ShadowRoot
 */
export abstract class DOMTreeElement extends LitElement {
    override connectedCallback() {
        super.connectedCallback();

        this.style.cssText = `

            display: flex;
            flex-direction: column;

            box-sizing: border-box;

            padding: 0px;
            margin: 0px;

            ${this.style.cssText}
        `;
    }

    // Render the template into the main DOM tree as the element's children instead of using the ShadowRoot
    protected override createRenderRoot() {
        return this;
    }
}

export default DOMTreeElement;
