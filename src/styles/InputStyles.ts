import { css } from 'lit';
import ComponentStyles from './ComponentStyles';


export default css`
    ${ComponentStyles}
    /* CONTAINER STYLES */
    .container {
        width: 100%;
        position: relative;
    }
    
    .container > .error {
		color: var(--theme-input-error-font-color, #C83C37);
		font-family: var(--theme-input-error-font-family, Arial, Helvetica, sans-serif);
		font-size: var(--theme-input-error-font-size, 12px);
		font-weight: var(--theme-input-error-font-weight, 300);

		padding-top: 2px;
		padding-left: calc(var(--theme-input-padding-left, 10px) + var(--theme-input-border-width, 1px));
	}

    .container > .label {
        position: absolute;
        left: var(--omni-input-label-padding-left, 16px);
        top: var(--omni-input-label-padding-top, 16px);

        z-index: 10;
        line-height: var(--omni-input-label-line-height, 0.8);
        padding: 0px;
    
        transition:
            transform 150ms ease-out,
            font-size 150ms ease-out,
            padding 150ms ease-out;

        background-color: var(--omni-input-label-background-color, #FFFFFF);

        border-radius: var(--omni-input-label-border-radius, 4px);

        color: var(--omni-input-label-color, #4E6066);
        font-family: var(--omni-input-label-font-family, Arial, Helvetica, sans-serif);
        font-size: var(--omni-input-label-font-size, 14px);
        font-weight: var(--omni-input-label-font-weight, normal);
    }

    .container > .label.error { 
        color: var(--omni-input-label-error-color, #C83C37);
        font-family: var(--omni-input-label-error-font-family, Arial, Helvetica, sans-serif);
    }

    .container > .field {
        box-sizing: border-box;
        outline: 0;
        width: 100%;
        padding: -2px;
        transition: border 150ms ease-out;
    
        background-color: var(--omni-input-field-background-color, #FFFFFF);

        border-width: var(--omni-input-field-border-width,1px);
        border-style: solid;
        border-color: var(--omni-input-field-border-color, #E1E1E1);
        border-radius: var(--omni-input-field-border-radius, 4px);

        color: var(--omni-input-field-font-color, #4E6066);
        font-family: var(--omni-input-field-font-family, Arial, Helvetica, sans-serif);
        font-size: var(--omni-input-field-font-size, 16px);
        font-weight: var(--omni-input-field-font-weight, normal);
    
        padding-top: var(--omni-input-field-padding-top , 8px);
        padding-bottom: var(--omni-input-field-padding-bottom, 14px);
        padding-left: var(--omni-input-field-padding-left, 10px);
        padding-right: var(--omni-input-field-padding-right, 10px);
    }

    /* Same as above came from text field directly*/
    .container > .field {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* HOVER STATE STYLES */

    .container > .field:hover {
        border-color: var(--omni-input-field-hover-border-color, #009DE0);
    }

    /* DISABLED STATE STYLES */

    .container.disabled > .label {
        cursor: default;        
        background-color: var(--omni-input-disabled-label-background-color, #DEDEDE);
    }

    .container.disabled > .field {
        cursor: default;              
        background-color: var(--omni-input-disabled-background-color, #DEDEDE);
        border-color: var(--omni-input-disabled-border-color, #E1E1E1);               
        color: var(--omni-input-disabled-font-color, #7C7C7C);
    }

    /* FOCUSSED STATE STYLES */

    .container.focussed > .field {
        border-color: var(--omni-input-field-focussed-border-color, #009DE0);
        box-shadow:inset 0px 0px 0px 1px var(--omni-input-field-focussed-box-shadow-color, #009DE0);
    }

    /* COMPLETED STATE STYLES */
    .container.completed > .label, 
    .container.focussed > .label,
    .container.filtered > .label {
        /* The below transform is used to ensure Edge 41 compatibility. */
        transform: translateX(-3px) translateY(-23px); 
        font-size: var(--theme-input-label-font-size, 14px);
        padding: 0px var(--theme-input-label-padding-sides, 4px);
        visibility: inherit;
    }

    /* ERROR STATE STYLES */

	.container.error > .field {
		border-color: var(--theme-input-error-border-color, #C83C37);
	}

	.container.error.focussed > .field {
		box-shadow:inset 0px 0px 0px 1px var(--theme-input-error-border-color, #009DE0);
	}

	.container.error > .field:hover {
		box-shadow:inset 0px 0px 0px 1px var(--theme-input-error-border-color, #009DE0);
	}
`;