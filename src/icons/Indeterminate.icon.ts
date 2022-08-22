import { html, TemplateResult } from 'lit';

/**
 * 
 * @returns {TemplateResult} Indeterminate Icon
 */
export default function indeterminate_icon(): TemplateResult {
    return html`
    <svg version="1.1"  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <g transform="translate(-2,-1.5)">
            <path d="M5 10.75v-1.5h10v1.5Z"></path>
        </g>
    </svg>
    `;
}

export { indeterminate_icon };