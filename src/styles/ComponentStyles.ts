import { css } from 'lit';

/** * 
 * @cssprop --omni-theme-font-color - Theme Font color.
 * @cssprop --omni-theme-font-family - Theme Font Family.
 * @cssprop --omni-theme-hint-font-color - Theme Hint Font Color.
 * @cssprop --omni-theme-error-font-color - Theme Error Font Color.
 * @cssprop --omni-theme-disabled-background-color - Theme Disable Background Color.
 * @cssprop --omni-theme-disabled-border-color - Theme Disable Border Color.
 * @cssprop --omni-theme-filled-background-color - Theme Filled Background Color.
 * @cssprop --omni-theme-track-filled-background-color - Theme Track Filled Background Color.
 * @cssprop --omni-theme-track-background-color - Theme Track Background Color.
 * @cssprop --omni-theme-light-box-shadow-color - Theme Light Box Shadow Color.
 * @cssprop --omni-theme-light-background-color - Theme Light Background Color.
 */
export default css`
    * {
        --omni-font-color: var(--omni-theme-font-color,black);
        --omni-font-family: var(--omni-theme-font-family,Arial, Helvetica, sans-serif);

        --omni-hint-font-color: var(--omni-theme-hint-font-color,lightgrey);
        --omni-error-font-color: var(--omni-theme-error-font-color,red);
        --omni-disabled-background-color: var(--omni-theme-disabled-background-color, #DEDEDE);
        --omni-disabled-border-color: var(--omni-theme-disabled-border-color, #dedede44);
        --omni-filled-background-color: var(--omni-theme-filled-background-color, #009DE0);
        --omni-track-filled-background-color: var(--omni-theme-track-filled-background-color, #7FCAEC);
        --omni-track-background-color: var(--omni-theme-track-background-color, #7C7C7C);
        --omni-light-box-shadow-color: var(--omni-theme-light-box-shadow-color, #E6F7FF);
        --omni-light-background-color: var(--omni-theme-light-background-color,#FFFFFF);

        box-sizing: border-box;
    }

    :host {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;

        padding: 0px;
        margin: 0px;
        user-select: var(--omni-theme-text-select);
    }

    :host([hidden]) {
        display: none;
    }
`;