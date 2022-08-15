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

        box-sizing: border-box;
    }

    :host {
        
        /* ----- THEMES -----*/

        --omni-font-color: var(--omni-theme-font-color,black);
        --omni-colored-font-color: var(--omni-theme-colored-font-color,#4E6066);
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
    
    /* MATERIAL ICON STYLES */

    .material-icon {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        padding: 0px;
        margin: 0px;

        align-self: center;
        justify-self: center;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
    }
`;


/**
 * The default css variables defined as a cssProps object used in {@link https://www.npmjs.com/package/@ljcl/storybook-addon-cssprops}
 */
 export const DefaultCssProperties = {
    "omni-theme-font-color": {
        value: "black",
        control: "color",
        description: "Theme Font color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-colored-font-color": {
        value: "#4E6066",
        control: "color",
        description: "Theme Colored Font color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-font-family": {
        value: "Arial, Helvetica, sans-serif",
        control: "text",
        description: "Theme Font Family",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-hint-font-color": {
        value: "lightgrey",
        control: "color",
        description: "Theme Hint Font color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-error-font-color": {
        value: "red",
        control: "color",
        description: "Theme Error Font color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-disabled-background-color": {
        value: "#DEDEDE",
        control: "color",
        description: "Theme Disabled Background color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-disabled-border-color": {
        value: "#dedede44",
        control: "color",
        description: "Theme Disabled Border Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-filled-background-color": {
        value: "#009DE0",
        control: "color",
        description: "Theme Filled Background Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-track-filled-background-color": {
        value: "#7FCAEC",
        control: "color",
        description: "Theme Track Filled Background Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-track-background-color": {
        value: "#7C7C7C",
        control: "color",
        description: "Theme Track Background Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-light-box-shadow-color": {
        value: "#E6F7FF",
        control: "color",
        description: "Theme Light Box Shadow Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
    "omni-theme-light-background-color": {
        value: "#FFFFFF",
        control: "color",
        description: "Theme Light Background Color",
        category: "CSS Variables",
        subcategory: "Theme Variables"
      },
}