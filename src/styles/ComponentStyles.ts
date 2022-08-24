import { css } from 'lit';

/** 
 * @cssprop --omni-theme-primary-color - The XXXX
 * @cssprop --omni-theme-accent-color - The XXXX
 * 
 * @cssprop --omni-theme-font-family - The XXXX
 * @cssprop --omni-theme-font-size - The XXXX
 * @cssprop --omni-theme-font-weight - The XXXX
 * 
 * @cssprop --omni-theme-font-color - The XXXX
 * @cssprop --omni-theme-background-color - The XXXX
 * @cssprop --omni-theme-disabled-border-color - The XXXX
 * @cssprop --omni-theme-disabled-background-color - The XXXX
 * @cssprop --omni-theme-error-font-color - The XXXX
 * @cssprop --omni-theme-error-border-color - The XXXX
 * @cssprop --omni-theme-hint-font-color - The XXXX
 * @cssprop --omni-theme-inactive-color - The XXXX
 * @cssprop --omni-theme-box-shadow-color - The XXXX
 * 
 * @cssprop --omni-theme-border-radius - The XXXX
 * @cssprop --omni-theme-border-width - The XXXX
 * @cssprop --omni-theme-box-shadow - The XXXX
 */
export default css`

    * {
        box-sizing: border-box;
    }

    :host {
        
        /* ----- THEMES -----*/

        --omni-primary-color: var(--omni-theme-primary-color, #009DE0);
        --omni-accent-color: var(--omni-theme-accent-color, #7FCAEC);

        --omni-font-family: var(--omni-theme-font-family, Arial, Helvetica, sans-serif);
        --omni-font-size: var(--omni-theme-font-size, 14px);
        --omni-font-weight: var(--omni-theme-font-weight, normal);

        --omni-font-color: var(--omni-theme-font-color, black);
        --omni-background-color: var(--omni-theme-background-color, #FFFFFF);
        --omni-disabled-border-color: var(--omni-theme-disabled-border-color, #dedede44);
        --omni-disabled-background-color: var(--omni-theme-disabled-background-color, #DEDEDE);
        --omni-error-font-color: var(--omni-theme-error-font-color, red);
        --omni-error-border-color: var(--omni-theme-error-border-color, red);
        --omni-hint-font-color: var(--omni-theme-hint-font-color, lightgrey);
        --omni-inactive-color: var(--omni-theme-inactive-color, #7C7C7C);
        --omni-box-shadow-color: var(--omni-theme-box-shadow-color, #E6F7FF);

        --omni-border-radius: var(--omni-theme-border-radius, 4px);
        --omni-border-width: var(--omni-theme-border-width, 2px);
        
        --omni-margin-left: var(--omni-theme-margin-left, 8px);
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