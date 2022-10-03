import { html, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import OmniElement from '../core/OmniElement.js';

import '../icons/Loading.icon';

/**
 * An element that renders content from a provided function/promise.
 *
 * ```js
 *
 * import '@capitec/omni-components/render-element';
 * ```
 *
 * @example
 *
 * ```html
 *
 * <omni-render-element></omni-render-element>
 * ```
 *
 * @element omni-render-element
 */
@customElement('omni-render-element')
export class RenderElement extends OmniElement {
    /**
     * The renderer function
     */
    @property({ type: Object, reflect: false }) renderer: RenderFunction;

    /**
     * Data associated with the component.
     * @attr
     */
    @property({ type: Object, reflect: true }) data: object | Promise<object>;

    override connectedCallback(): void {
        super.connectedCallback();

    }

    private _setChildInstance(result: HTMLElement) {
        this._clearElements();
        if (result) {
            this.renderRoot.appendChild(result);
        }
    }

    private async _updateChildInstance(result: HTMLElement) {
        await this.updateComplete;

        this._setChildInstance(result);
    }

    private async _internalRenderer(): Promise<TemplateResult | typeof nothing> {
        try {
            const data = this.data ? await this.data : undefined;
            const result = this.renderer ? await this.renderer(data) : undefined;
            if (result && result instanceof HTMLElement) {
                this._updateChildInstance(result);
                return nothing;
            } else if (result && typeof result === 'string') {
                return html`${unsafeHTML(result)}`;
            } else if (result) {
                return result as TemplateResult | typeof nothing;
            } else {
                return nothing;
            }
        } catch (error) {
            console.error(error);
            return nothing;
        }
    }

    private _clearElements(el: Element | ShadowRoot = undefined) {
        if (!el) {
            el = this.renderRoot;
        }
        let child = el.lastElementChild;
        while (child) {
            const curChild = child;
            child = child.previousElementSibling;
            if (!curChild.hasAttribute('slot')) {
                el.removeChild(curChild);
            }
        }
    }

    protected override renderLoading() {
        return html`<slot name="loading_indicator"><omni-loading-icon></omni-loading-icon></slot>`;
    }

    protected override async renderAsync() {
        this._clearElements();
        return await this._internalRenderer();
    }
}

export type RenderResult = TemplateResult | typeof nothing | HTMLElement | string;
export type RenderFunction = (data: object) => RenderResult | Promise<RenderResult>;
