import { css } from 'lit';
import ComponentStyles from './ComponentStyles';

/** 
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
        color: var(--omni-input-hint-font-color,var(--omni-hint-font-color));
        font-family: var(--omni-input-hint-font-family, var(--omni-font-family));
        font-size: var(--omni-input-hint-font-size,  0.86em);
        font-weight: var(--omni-input-hint-font-weight, 300);

        padding-top: 2px;
        padding-left: calc(var(--theme-input-hint-padding-left, 10px) + var(--theme-input-hint-border-width, 1px));
    }

    

    .container > .error {
        color: var(--omni-input-container-error-font-color, var(--omni-error-font-color));
        font-family: var(--omni-input-container-error-font-family, var(--omni-font-family));
        font-size: var(--omni-input-container-error-font-size, var(--omni-font-size));
        font-weight: var(--omni-input-container-error-font-weight, var(--omni-font-weight));

        padding-top: 2px;
        padding-left: calc(var(--omni-input-container-padding-left, 10px) + var(--omni-input-container-border-width, 1px));
    }

    .container > .label.error { 
        color: var(--omni-input-container-label-error-color, var(--omni-error-font-color));
        font-family: var(--omni-input-container-label-error-font-family, var(--omni-font-family));
    }





    /* HOVER STATE STYLES */

    .container > .field:hover {
        border-color: var(--omni-input-field-hover-border-color,var(--omni-primary-color));
    }

    /* DISABLED STATE STYLES */

    .container.disabled > .label {
        cursor: default;        
        background-color: var(--omni-input-disabled-label-background-color, var(--omni-background-color));
    }

    .container.disabled > .field {
        cursor: default;              
        background-color: var(--omni-input-disabled-background-color, var(--omni-background-color));
        border-color: var(--omni-input-disabled-border-color, #E1E1E1);               
        color: var(--omni-input-disabled-font-color, #7C7C7C);
    }

    /* FOCUSSED STATE STYLES */

    .container.focussed > .field {
        border-color: var(--omni-input-field-focussed-border-color, var(--omni-primary-color));
        box-shadow:inset 0px 0px 0px 1px var(--omni-input-field-focussed-box-shadow-color, var(--omni-primary-color));
    }

    /* COMPLETED STATE STYLES */

    .container.completed > .label, 
    .container.focussed > .label,
    .container.filtered > .label {
        /* The below transform is used to ensure Edge 41 compatibility. */
        transform: translateX(-3px) translateY(-23px); 
        font-size: var(--theme-input-label-font-size, var(--omni-font-size));
        padding: 0px var(--theme-input-label-padding-sides, 4px);
        visibility: inherit;
    }

    .container:hover {
        border-radius: 4px;
    }

    .container.focussed > .label.error {
        color: var(--omni-input-error-font-color, var(--omni-error-font-color));
    }

    .container.completed > .label.error {
        color: var(--omni-input-error-font-color, var(--omni-error-font-color));
    }

    .container.focussed > .label {
        color: var(--theme-input-label-focussed-font-color, var(--omni-primary-color));
    }

    .container.completed > .label {
        color: var(--theme-input-label-font-color, var(--omni-primary-color));
    }

    .container.completed > .field, 
    .container.focussed > .field {
        padding-top: calc(var(--theme-input-padding-top, 8px) + 3px);
        padding-bottom: calc(var(--theme-input-padding-bottom, 14px) - 3px);
    }

    /* ERROR STATE STYLES */

    .container.error > .field {
        border-color: var(--theme-input-error-border-color, var(--omni-error-font-color));
    }

    .container.error.focussed > .field {
        box-shadow:inset 0px 0px 0px 1px var(--theme-input-error-border-color,var(--omni-primary-color));
    }

    .container.error > .field:hover {
        box-shadow:inset 0px 0px 0px 1px var(--theme-input-error-border-color,var(--omni-error-border-color));
    }

    /* DISABLED STATE STYLES */

    .container.disabled > .label {
        cursor: default;

        background-color: var(--omni-input-disabled-background-color, var(--omni-disabled-background-color));
    }

    .container.disabled > .field {
        cursor: default;

        background-color: var(--omni-input-disabled-background-color, var(--omni-disabled-background-color));
        border-color: var(--omni-input-border-color, var(--omni-disabled-border-color));

        color: var(--omni-input-disabled-font-color, #7C7C7C);
    }
`;