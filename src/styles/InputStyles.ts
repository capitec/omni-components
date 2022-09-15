import { css } from 'lit';
import ComponentStyles from './ComponentStyles';

/** 
 * 
 * 
 * @cssprop --omni-input-container-label-padding-left - Input container left label padding.
 * @cssprop --omni-input-container-label-padding-top - Input container top label padding.
 * @cssprop --omni-input-container-label-line-height - Input container label line height.
 * 
 * @cssprop --omni-input-container-label-background-color - Input container label background color.
 * @cssprop --omni-input-container-label-border-radius - Input container label border radius.
 * @cssprop --omni-input-container-label-color - Input container label color.
 * @cssprop --omni-input-container-label-font-family - Input container label font family.
 * @cssprop --omni-input-container-label-font-size - Input container label font size.
 * @cssprop --omni-input-container-label-font-weight- Input container label font weight.
 * 
 * @cssprop --omni-input-field-background-color - Input field background color.
 * @cssprop --omni-input-field-border-width - Input field border width.
 * @cssprop --omni-input-field-border-color - Input field border color.
 * @cssprop --omni-input-field-border-radius - Input field border radius.
 * @cssprop --omni-input-field-font-color - Input field font color.
 * @cssprop --omni-input-field-font-family - Input field font family.
 * @cssprop --omni-input-field-font-size - Input field font size.
 * @cssprop --omni-input-field-font-weight - Input field font weight.
 * 
 * @cssprop --omni-input-field-padding-top - Input field top padding.
 * @cssprop --omni-input-field-padding-bottom - Input field bottom padding.
 * @cssprop --omni-input-field-padding-left - Input field left padding.
 * @cssprop --omni-input-field-padding-right - Input field right padding.
 * 
 * @cssprop --omni-input-container-hint-font-color - Input container hint font color.
 * @cssprop --omni-input-container-hint-font-family - Input container hint font family.
 * @cssprop --omni-input-container-hint-font-size - Input container hint font size.
 * @cssprop --omni-input-container-hint-font-weight - Input container hint font weight
 * .
 * @cssprop --omni-input-container-hint-padding-left - Input container hint left padding.
 * @cssprop --omni-input-container-hint-border-width - Input container hint border width.
 * 
 * @cssprop --omni-input-container-error-font-color - Input container error font color.
 * @cssprop --omni-input-container-error-font-family - Input container error font family.
 * @cssprop --omni-input-container-error-font-size - Input container error font family.
 * @cssprop --omni-input-container-error-font-weight - Input container error font family.
 * 
 * @cssprop --omni-input-container-error-padding-left - Input container hint font family.
 * @cssprop --omni-input-container-error-border-width -  Input container error border width.
 * 
 * @cssprop --omni-input-container-label-error-color - Input container label error color.
 * @cssprop --omni-input-container-label-error-font-family - Input container label font family.
 * 
 * @cssprop --omni-input-container-field-hover-border-color - Input field hover color.
 * 
 * @cssprop --omni-input-container-disabled-label-background-color - Input container label disabled label color.
 * 
 * @cssprop --omni-input-container-field-disabled-background-color - Input container disabled background color.
 * @cssprop --omni-input-container-field-disabled-border-color - Input container field disabled border color.
 * @cssprop --omni-input-container-field-disabled-font-color- Input container field disabled font color.
 * 
 * @cssprop --omni-input-container-field-focussed-border-color - Input container field focussed border color.
 * @cssprop --omni-input-container-field-focussed-box-shadow-color - Input container field focussed box shadow color.
 * 
 * @cssprop --omni-input-container-label-padding-sides - Input container label padding sides.
 * 
 * @cssprop --omni-input-error-label-font-color - Input error label font color.
 * @cssprop --omni-input-label-focussed-font-color - Input focussed label font color.
 * @cssprop --omni-input-label-completed-font-color - Input completed label font color.
 * 
 * @cssprop --omni-input-container-padding-top - Input container top padding.
 * @cssprop --omni-input-container-padding-bottom - Input container bottom padding.
 * 
 * @cssprop --omni-input-container-field-error-border-color - Input container field error border color.
 * @cssprop --omni-input-container-field-focussed-error-border-color - Input container field error border color.
 * 
 * @cssprop --omni-input-container-disabled-label-background-color - Input container disabled label background color.
 * 
 * @cssprop --omni-input-container-field-disabled-background-color- Input container field disabled background color.
 * @cssprop --omni-input-container-field-disabled-border-color - Input container field disabled border color.
 * @cssprop --omni-input-container-field-disabled-font-color - Input container field disabled font color.
 * 
 */
export default css`
    ${ComponentStyles}

    /* CONTAINER STYLES */

    .container {
        width: 100%;
        position: relative;
    }

    .container > .label {
        position: absolute;
        left: var(--omni-input-container-label-padding-left, 16px);
        top: var(--omni-input-container-label-padding-top, 16px);
    
        z-index: 10;
        line-height: var(--omni-input-container-label-line-height, 0.8);
        padding: 0px;
    
        transition:
            transform 150ms ease-out,
            font-size 150ms ease-out,
            padding 150ms ease-out;
    
        background-color: var(--omni-input-container-label-background-color, var(--omni-background-color));
    
        border-radius: var(--omni-input-container-label-border-radius, var(--omni-border-radius));
    
        color: var(--omni-input-container-label-color,var(--omni-font-color));
        font-family: var(--omni-input-container-label-font-family,var(--omni-font-family));
        font-size: var(--omni-input-container-label-font-size, var(--omni-font-size));
        font-weight: var(--omni-input-container-label-font-weight, var(--omni-font-weight));
    }

    .container > .field {
        box-sizing: border-box;
        outline: 0;
        width: 100%;
        padding: -2px;
        transition: border 150ms ease-out;

        background-color: var(--omni-input-field-background-color, var(--omni-background-color));

        border-width: var(--omni-input-field-border-width, 1px);
        border-style: solid;
        border-color: var(--omni-input-field-border-color, #E1E1E1);
        border-radius: var(--omni-input-field-border-radius, 4px);

        color: var(--omni-input-field-font-color, #4E6066);
        font-family: var(--omni-input-field-font-family, var(--omni-font-family));
        font-size: var(--omni-input-field-font-size, var(--omni-font-size));
        font-weight: var(--omni-input-field-font-weight, var(--omni-font-weight));

        padding-top: var(--omni-input-field-padding-top , 8px);
        padding-bottom: var(--omni-input-field-padding-bottom, 14px);
        padding-left: var(--omni-input-field-padding-left, 10px);
        padding-right: var(--omni-input-field-padding-right, 10px);
    }

    .container > .hint {
        color: var(--omni-input-container-hint-font-color, var(--omni-hint-font-color));
        font-family: var(--omni-input-container-hint-font-family, var(--omni-font-family));
        font-size: var(--omni-input-container-hint-font-size, 0.86em);
        font-weight: var(--omni-input-container-hint-font-weight, 300);

        padding-top: 2px;
        padding-left: calc(var(--omni-input-container-hint-padding-left, 10px) + var(--omni-input-container-hint-border-width, 1px));
    }

    .container > .error {
        color: var(--omni-input-container-error-font-color, var(--omni-error-font-color));
        font-family: var(--omni-input-container-error-font-family, var(--omni-font-family));
        font-size: var(--omni-input-container-error-font-size, var(--omni-font-size));
        font-weight: var(--omni-input-container-error-font-weight, var(--omni-font-weight));

        padding-top: 2px;
        padding-left: calc(var(--omni-input-container-error-padding-left, 10px) + var(--omni-input-container-error-border-width, 1px));
    }

    .container > .label.error { 
        color: var(--omni-input-container-label-error-color, var(--omni-error-font-color));
        font-family: var(--omni-input-container-label-error-font-family, var(--omni-font-family));
    }

    /* HOVER STATE STYLES */

    .container > .field:hover {
        border-color: var(--omni-input-container-field-hover-border-color, var(--omni-primary-color));
    }

    /* DISABLED STATE STYLES */

    .container.disabled > .label {
        cursor: default;        
        background-color: var(--omni-input-container-disabled-label-background-color, var(--omni-background-color));
    }

    .container.disabled > .field {
        cursor: default;              
        background-color: var(--omni-input-container-field-disabled-background-color, var(--omni-background-color));
        border-color: var(--omni-input-container-field-disabled-border-color, #E1E1E1);               
        color: var(--omni-input-container-field-disabled-font-color, #7C7C7C);
    }

    /* FOCUSSED STATE STYLES */

    .container.focussed > .field {
        border-color: var(--omni-input-container-field-focussed-border-color, var(--omni-primary-color));
        box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-focussed-box-shadow-color, var(--omni-primary-color));
    }

    /* COMPLETED STATE STYLES */

    .container.completed > .label, 
    .container.focussed > .label,
    .container.filtered > .label {
        /* The below transform is used to ensure Edge 41 compatibility. */
        transform: translateX(-3px) translateY(-23px); 
        font-size: var(--omni-input-container-label-font-size, var(--omni-font-size));
        padding: 0px var(--omni-input-container-label-padding-sides, 4px);
        visibility: inherit;
    }

    .container:hover {
        border-radius: 4px;
    }

    .container.focussed > .label.error {
        color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
    }

    .container.completed > .label.error {
        color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
    }

    .container.focussed > .label {
        color: var(--omni-input-label-focussed-font-color, var(--omni-primary-color));
    }

    .container.completed > .label {
        color: var(--omni-input-label-completed-font-color, var(--omni-primary-color));
    }

    .container.completed > .field, 
    .container.focussed > .field {
        padding-top: calc(var(--omni-input-container-field-padding-top, 8px) + 3px);
        padding-bottom: calc(var(--omni-input-container-field-padding-bottom, 14px) - 3px);
    }

    /* ERROR STATE STYLES */

    .container.error > .field {
        border-color: var(--omni-input-container-field-error-border-color, var(--omni-error-font-color));
    }

    .container.error.focussed > .field {
        box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-focussed-error-border-color,var(--omni-primary-color));
    }

    .container.error > .field:hover {
        box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-error-border-color,var(--omni-error-border-color));
    }

    /* DISABLED STATE STYLES */

    .container.disabled > .label {
        cursor: default;

        background-color: var(--omni-input-container-disabled-label-background-color, var(--omni-disabled-background-color));
    }

    .container.disabled > .field {
        cursor: default;

        background-color: var(--omni-input-container-field-disabled-background-color, var(--omni-disabled-background-color));
        border-color: var(--omni-input-container-field-disabled-border-color, var(--omni-disabled-border-color));

        color: var(--omni-input-container-field-disabled-font-color, #7C7C7C);
    }
`;