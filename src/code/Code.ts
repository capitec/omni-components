import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import ComponentStyles from '../styles/ComponentStyles';
import Prism from 'prismjs';

/**
 * A control to syntax highlight and display source code.
 *
 * ```js 
 * import '@capitec/omni-components/code'; 
 * ```
 * 
 * @example
 * 
 * ```html
* <omni-code language="html">
*   <div>
*     <h1>Hello World</h1>
*   </div>
* </omni-menu>
 * ```
 * 
 * @element omni-code
 * 
 * Registry of all properties defined by the component.
 * 
 * @property {String} [header] Renders a small header above the block itself.
 * @property {String} [content] Raw text to parse as content. If this property is specified, it will take precedence over slotted content. This should also be used if you are using dynamic content
 * @property {String} language Programming language used, e.g. html, css, javascript, etc.
 * 
 * @cssprop --omni-code-scrollbar-width - Scrollbar Width.
 * @cssprop --omni-code-scrollbar-track-box-shadow - Scrollbar track box shadow.
 * @cssprop --omni-code-scrollbar-track-border-width - Scrollbar track border width.
 * @cssprop --omni-code-scrollbar-thumb-background - Scrollbar thumb background. 
 * @cssprop --omni-code-scrollbar-thumb-hover-background - Scrollbar thumb background on hover. 
 * @cssprop --omni-code-scrollbar-thumb-border-radius - Scrollbar thumb border radius. 
 * @cssprop --omni-code-header-background - Header background. 
 * @cssprop --omni-code-header-border-radius - Header border radius. 
 * @cssprop --omni-code-header-padding - Header padding. 
 * @cssprop --omni-code-header-border - Header border. 
 * @cssprop --omni-code-header-family - Header font family.
 * @cssprop --omni-code-header-font-weight - Header font weight. 
 * 
 */
@customElement('omni-code')
export class Code extends LitElement {

	@property({ type: String, reflect: true }) header?: string;
	@property({ type: String, reflect: true }) language = 'html';

	private _content = '';
	@property({ type: String, reflect: true })
	get content(): string {
		return this._content;
	}
	set content(val: string) {
		const oldVal = this._content;

		this._parseContent(val);
		this.requestUpdate('content', oldVal);
	}

	// ----------
	// INITIALISATION
	// ----------

	/**
	 * @hideconstructor
	 */
	constructor() {

		super();
	}

	// ------------
	// LIFECYCLE HANDLERS
	// ------------

	override connectedCallback() {

		super.connectedCallback();

		// Format the slotted content to a source code preview.
		if (!this.content) {
			this._parseContent(this.innerHTML);
		}
	}

	// -----------
	// PUBLIC FUNCTIONS
	// -----------

	override focus() {
		this.shadowRoot.getElementById('track').focus();
	}

	// ----------
	// EVENT HANDLERS
	// ----------

	// n/a

	// ----------
	// PRIVATE METHODS
	// ----------

	_parseContent(source: string): void {

		if (source.length > 0) {

			// Remove the starting newline character.
			if (source.startsWith('\n')) {
				source = source.replace('\n', '');
			}

			// Remove any trailing whitespace, newlines or tabs.
			source = source.trimRight();

			// Count the number of tabs used on the first line.
			let count = 0;
			let key = source[count];

			while (key === '\t') {
				key = source[++count];
			}

			// Replace that amount of tabs on every line to normalise the string to start with zero padding.
			source = source.replace(new RegExp(source.substr(0, count), 'g'), '');

			// Replace empty HTML attribute values [disabled=""] with empty string [disabled]
			if (this.language === 'html') {
				source = source.replace(/(="")/gi, '');
			}

			// Set the code preview content.
			this._content = Prism.highlight(source, Prism.languages[this.language], 'css');

		}
	}

	// -------------
	// RENDERING TEMPLATES
	// -------------

	/**
	 * The element style template.
	 * 
	 */
	static override get styles() {

		return [
			ComponentStyles,
			css`
				code[class*="language-"],
				pre[class*="language-"] {
					color: #f8f8f2;
					background: none;
					text-shadow: 0 1px rgba(0, 0, 0, 0.3);
					font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
					font-size: 1em;
					text-align: left;
					white-space: pre;
					word-spacing: normal;
					word-break: normal;
					word-wrap: normal;
					line-height: 1.5;

					-moz-tab-size: 4;
					-o-tab-size: 4;
					tab-size: 4;

					-webkit-hyphens: none;
					-moz-hyphens: none;
					-ms-hyphens: none;
					hyphens: none;
        
					-webkit-touch-callout: text;
					-webkit-user-select: text;
					-khtml-user-select: text;
					-moz-user-select: text;
					-ms-user-select: text;
					user-select: text;
				}

				/* Code blocks */
				pre[class*="language-"] {
					padding: 1em;
					margin: .5em 0;
					overflow: auto;
					border-radius: 0.3em 0.3em 0.3em 0.3em;
				}

				pre[data-with-header="true"] {
					border-radius: 0 0 0.3em 0.3em;
					margin: 0 0 .5em 0;
				}

				:not(pre) > code[class*="language-"],
				pre[class*="language-"] {
					background: #272822;
				}

				/* Inline code */
				:not(pre) > code[class*="language-"] {
					padding: .1em;
					margin: 0;
					border-radius: .3em;
					white-space: normal;
				}

				.token.comment,
				.token.prolog,
				.token.doctype,
				.token.cdata {
					color: slategray;
				}

				.token.punctuation {
					color: #f8f8f2;
				}

				.namespace {
					opacity: .7;
				}

				.token.property,
				.token.tag,
				.token.constant,
				.token.symbol,
				.token.deleted {
					color: #f92672;
				}

				.token.boolean,
				.token.number {
					color: #ae81ff;
				}

				.token.selector,
				.token.attr-name,
				.token.string,
				.token.char,
				.token.builtin,
				.token.inserted {
					color: #a6e22e;
				}

				.token.operator,
				.token.entity,
				.token.url,
				.language-css .token.string,
				.style .token.string,
				.token.variable {
					color: #f8f8f2;
				}

				.token.atrule,
				.token.attr-value,
				.token.function,
				.token.class-name {
					color: #e6db74;
				}

				.token.keyword {
					color: #66d9ef;
				}

				.token.regex,
				.token.important {
					color: #fd971f;
				}

				.token.important,
				.token.bold {
					font-weight: bold;
				}
				.token.italic {
					font-style: italic;
				}

				.token.entity {
					cursor: help;
				}

				pre[class*="language-"].line-numbers {
					position: relative;
					padding-left: 3.8em;
					counter-reset: linenumber;
				}

				pre[class*="language-"].line-numbers > code {
					position: relative;
					white-space: inherit;
				}

				.line-numbers .line-numbers-rows {
					position: absolute;
					pointer-events: none;
					top: 0;
					font-size: 100%;
					left: -3.8em;
					width: 3em; /* works for line-numbers below 1000 lines */
					letter-spacing: -1px;
					border-right: 1px solid #999;

					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;

				}

				.line-numbers-rows > span {
					pointer-events: none;
					display: block;
					counter-increment: linenumber;
				}

				.line-numbers-rows > span:before {
					content: counter(linenumber);
					color: #999;
					display: block;
					padding-right: 0.8em;
					text-align: right;
				}

				.hidden {
					display: none;
				}

				pre {
					width: 100%;
				}

				pre[class*="language-css"]{
					overflow-y: auto;
				}

				/* width */
				pre[class*="language"]::-webkit-scrollbar {
					width: var(--omni-code-scrollbar-width, 10px);
				}

				/* Track */
				pre[class*="language-"]::-webkit-scrollbar-track {
					box-shadow: var(--omni-code-scrollbar-track-box-shadow, inset 0 0 5px grey);
					border-radius: var(--omni-code-scrollbar-track-border-width, 0px);
				}

				/* Handle */
				pre[class*="language-"]::-webkit-scrollbar-thumb {
					background: var(--omni-code-scrollbar-thumb-background, var(--omni-primary-color));
					border-radius: var(--omni-code-scrollbar-thumb-border-radius, 10px);
				}

				/* Handle on hover */
				pre[class*="language-"]::-webkit-scrollbar-thumb:hover {
					background: var(--omni-code-scrollbar-thumb-hover-background, var(--omni-accent-color));
				}

				.header {
					background: var(--omni-code-header-background, #F4F4F4);
					border-radius: var(--omni-code-header-border-radius, 0.3em 0.3em 0 0);
					padding: var(--omni-code-header-padding, 4px 12px);
					border: var(--omni-code-header-border, 1px solid #CCCCCC);
					font-family: var(--omni-code-header-family, var(--omni-font-family));
					font-weight: var(--omni-code-header-font-weight, 500);
				}
			`
		];
	}

	/**
	 * Apply changes to the element DOM when a property value changes.
	 * 
	 * @returns {TemplateResult} The updated DOM template.
	 */
	override render(): TemplateResult {
		return html`
			<div class="hidden">
				<slot></slot>
			</div>
			${this.header ? html`
			<div class="header">${this.header}</div>
			${this._renderPre(true)}
			` : html`
			${this._renderPre(false)}
			`}
		`;
	}

	_renderPre(withTitle: boolean): TemplateResult {

		return html`<pre data-with-header="${withTitle}" class="language-${this.language}"
	style="white-space: pre-wrap;"><code>${unsafeHTML(this._content)}</code></pre>`;
	}
}