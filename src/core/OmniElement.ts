import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

/**
 * Base element class that manages element properties and attributes, and
 * renders a lit template with asynchronous rendering support and themed styles.
 *
 * @slot loading_indicator - Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called
 *
 * @csscat Theme Variables
 *
 * @cssprop --omni-theme-primary-color - Theme primary color.
 * @cssprop --omni-theme-primary-hover-color - Theme primary hover color.
 * @cssprop --omni-theme-primary-active-color - Theme primary active color.
 *
 * @cssprop --omni-theme-accent-color - Theme accent color.
 * @cssprop --omni-theme-accent-hover-color - Theme accent hover color.
 * @cssprop --omni-theme-accent-active-color - Theme accent active color.
 *
 * @cssprop --omni-theme-background-color - Theme background color.
 * @cssprop --omni-theme-background-hover-color - Theme background hover color.
 * @cssprop --omni-theme-background-active-color - Theme background active color.
 *
 * @cssprop --omni-theme-font-color - Theme font color.
 *
 * @cssprop --omni-theme-disabled-border-color - Theme disabled border color.
 * @cssprop --omni-theme-disabled-background-color - Theme disabled background color.
 * @cssprop --omni-theme-error-font-color - Theme disabled background color.
 * @cssprop --omni-theme-error-border-color - Theme error border color.
 * @cssprop --omni-theme-hint-font-color - Theme hint font color.
 * @cssprop --omni-theme-inactive-color - Theme inactive color.
 * @cssprop --omni-theme-box-shadow-color - Theme inactive color.
 *
 * @cssprop --omni-theme-font-family - Theme font family.
 * @cssprop --omni-theme-font-size - Theme font size.
 * @cssprop --omni-theme-font-weight - Theme font weight.
 *
 * @cssprop --omni-theme-border-radius - Theme border radius.
 * @cssprop --omni-theme-border-width - Theme border width.
 *
 * @cssprop --omni-theme-box-shadow - Theme box shadow.
 */
export abstract class OmniElement extends LitElement {
    /**
     * Used to set the base direction of text for display
     * @attr
     */
    @property() override dir: string;
    /**
     * Used to identify the language of text content on the web
     * @attr
     */
    @property() override lang: string;

    static override get styles(): CSSResultGroup {
        return css`
      * {
        box-sizing: border-box;
      }

      :host {
        /* ----- THEMES -----*/

        /* Handy tool for color lighten / darken: https://www.cssfontstack.com/oldsites/hexcolortool/. */

        --omni-primary-color: var(--omni-theme-primary-color, #808080);
        --omni-primary-hover-color: var(--omni-theme-primary-hover-color, #7878781a); /* 3% darker */
        --omni-primary-active-color: var(--omni-theme-primary-active-color, #787878); /* 6% darker */

        --omni-accent-color: var(--omni-theme-accent-color, #c3c3c3);
        --omni-accent-hover-color: var(--omni-theme-accent-hover-color, #bbbbbb1a); /* 3% darker */
        --omni-accent-active-color: var(--omni-theme-accent-active-color, #b4b4b4); /* 6% darker */

        --omni-background-color: var(--omni-theme-background-color, #ffffff);
        --omni-background-hover-color: var(--omni-theme-background-hover-color, #f7f7f71a); /* 3% darker */
        --omni-background-active-color: var(--omni-theme-background-active-color, #f0f0f0); /* 6% darker */

        --omni-font-color: var(--omni-theme-font-color, black);
        --omni-disabled-border-color: var(--omni-theme-disabled-border-color, #dedede44);
        --omni-disabled-background-color: var(--omni-theme-disabled-background-color, #dedede);
        --omni-error-font-color: var(--omni-theme-error-font-color, red);
        --omni-error-border-color: var(--omni-theme-error-border-color, red);
        --omni-hint-font-color: var(--omni-theme-hint-font-color, lightgrey);
        --omni-inactive-color: var(--omni-theme-inactive-color, #7c7c7c);
        --omni-box-shadow-color: var(--omni-theme-box-shadow-color, #f2f2f2);

        --omni-font-family: var(--omni-theme-font-family, Arial, Helvetica, sans-serif);
        --omni-font-size: var(--omni-theme-font-size, 14px);
        --omni-font-weight: var(--omni-theme-font-weight, normal);

        --omni-border-radius: var(--omni-theme-border-radius, 4px);
        --omni-border-width: var(--omni-theme-border-width, 2px);

        /*
            --omni-cursor: var(--omni-theme-cursor, default);
            --omni-cursor-target: var(--omni-theme-target-cursor, pointer);
            --omni-cursor-disabled: var(--omni-theme-cursor-disabled, not-allowed);
            */

        /*  
            --omni-margin: var(--omni-theme-margin, 1px);
            --omni-padding: var(--omni-theme-padding, 1px);
            --omni-outline: var(--omni-theme-outline, 1px);
            */

        --omni-box-shadow: var(--omni-theme-box-shadow, 0 0 4px 4px var(--omni-box-shadow-color));

        /* ----- -----*/

        display: flex;
        flex-direction: column;

        box-sizing: border-box;

        padding: 0px;
        margin: 0px;

        -webkit-touch-callout: var(--omni-theme-text-select, none);
        -webkit-user-select: var(--omni-theme-text-select, none);
        -khtml-user-select: var(--omni-theme-text-select, none);
        -moz-user-select: var(--omni-theme-text-select, none);
        -ms-user-select: var(--omni-theme-text-select, none);
        user-select: var(--omni-theme-text-select, none);
      }

      :host([hidden]) {
        display: none;
      }
    `;
    }

    protected override render(): TemplateResult | typeof nothing {
        return html`${until(this.renderAsync(), this.renderLoading())}`;
    }

    protected renderLoading(): TemplateResult | typeof nothing {
        return html`<slot name="loading_indicator"></slot>`;
    }

    protected async renderAsync() {
        return super.render();
    }
}

export default OmniElement;
