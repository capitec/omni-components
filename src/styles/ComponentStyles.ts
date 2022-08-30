import { css } from 'lit';

/** 
 * @cssprop --omni-theme-primary-color - The XXXX
 * @cssprop --omni-theme-primary-hover-color - The XXXX
 * @cssprop --omni-theme-primary-active-color - The XXXX
 * 
 * @cssprop --omni-theme-accent-color - The XXXX
 * @cssprop --omni-theme-accent-hover-color - The XXXX
 * @cssprop --omni-theme-accent-active-color - The XXXX
 * 
 * @cssprop --omni-theme-background-color - The XXXX
 * @cssprop --omni-theme-background-hover-color - The XXXX
 * @cssprop --omni-theme-background-active-color - The XXXX
 * 
 * @cssprop --omni-theme-font-color - The XXXX
 * 
 * @cssprop --omni-theme-disabled-border-color - The XXXX
 * @cssprop --omni-theme-disabled-background-color - The XXXX
 * @cssprop --omni-theme-error-font-color - The XXXX
 * @cssprop --omni-theme-error-border-color - The XXXX
 * @cssprop --omni-theme-hint-font-color - The XXXX
 * @cssprop --omni-theme-inactive-color - The XXXX
 * @cssprop --omni-theme-box-shadow-color - The XXXX
 * 
 * @cssprop --omni-theme-font-family - The XXXX
 * @cssprop --omni-theme-font-size - The XXXX
 * @cssprop --omni-theme-font-weight - The XXXX
 * 
 * @cssprop --omni-theme-border-radius - The XXXX
 * @cssprop --omni-theme-border-width - The XXXX
 * 
 * @cssprop --omni-theme-box-shadow - The XXXX
 */
export default css`

    * {
        box-sizing: border-box;
    }

    :host {
        
        /* ----- THEMES -----*/

        /* Handy tool for color lighten / darken: https://www.cssfontstack.com/oldsites/hexcolortool/. */

        --omni-primary-color: var(--omni-theme-primary-color, #009DE0);
        --omni-primary-hover-color: var(--omni-theme-primary-hover-color, #0095D8); /* 3% darker */
        --omni-primary-active-color: var(--omni-theme-primary-active-color, #008ED1); /* 6% darker */

        --omni-accent-color: var(--omni-theme-accent-color, #7FCAEC);
        --omni-accent-hover-color: var(--omni-theme-accent-hover-color, #77C2E4); /* 3% darker */
        --omni-accent-active-color: var(--omni-theme-accent-active-color, #70BBDD); /* 6% darker */

        --omni-background-color: var(--omni-theme-background-color, #FFFFFF);
        --omni-background-hover-color: var(--omni-theme-background-hover-color, #F7F7F7); /* 3% darker */
        --omni-background-active-color: var(--omni-theme-background-active-color, #F0F0F0); /* 6% darker */

        --omni-font-color: var(--omni-theme-font-color, black);
        --omni-disabled-border-color: var(--omni-theme-disabled-border-color, #dedede44);
        --omni-disabled-background-color: var(--omni-theme-disabled-background-color, #DEDEDE);
        --omni-error-font-color: var(--omni-theme-error-font-color, red);
        --omni-error-border-color: var(--omni-theme-error-border-color, red);
        --omni-hint-font-color: var(--omni-theme-hint-font-color, lightgrey);
        --omni-inactive-color: var(--omni-theme-inactive-color, #7C7C7C);
        --omni-box-shadow-color: var(--omni-theme-box-shadow-color, #E6F7FF);

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