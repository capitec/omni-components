import OmniElement from './OmniElement.js';

/**
 * An custom web component that renders the template directly into the main DOM tree instead of the ShadowRoot
 */
export abstract class DOMTreeElement extends OmniElement {

    // Render the template into the main DOM tree as the element's children instead of using the ShadowRoot
    protected override createRenderRoot() {
        return this;
    }
}

export default DOMTreeElement;