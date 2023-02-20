import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import OmniElement from '../core/OmniElement.js';
import '../icons/ArrowRight.icon.js';
import '../icons/Backspace.icon.js';
import '../icons/ChevronDown.icon.js';
import '../icons/Check.icon.js';
import '../icons/CapsOff.icon.js';
import '../icons/CapsOn.icon.js';
import '../icons/CapsOnPermanent.icon.js';
import '../icons/Next.icon.js';
import '../icons/Previous.icon.js';
import '../icons/Search.icon.js';
import '../icons/Send.icon.js';
import '../label';
import '../icon';
import './KeyboardButton.js';

/**
 * An on-screen keyboard control component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/keyboard';
 * ```
 *
 * @example
 * ```html
 * <omni-keyboard></omni-keyboard>
 * ```
 *
 * @element omni-keyboard
 *
 *
 * @slot caps-off - Content to display on case change button when in a lowercase state.
 * @slot caps-on - Content to display on case change button when in a single uppercase state.
 * @slot caps-on-permanent - Content to display on case change button when in a permanent uppercase state.
 * @slot close - Content to display next to close label.
 * @slot backspace - Content to display on backspace button.
 * @slot cta-done - Content to display on call to action button ('Enter') when target component has enterkeyhint="done".
 * @slot cta-go - Content to display on call to action button ('Enter') when target component has enterkeyhint="go".
 * @slot cta-next - Content to display on call to action button ('Enter') when target component has enterkeyhint="next".
 * @slot cta-previous - Content to display on call to action button ('Enter') when target component has enterkeyhint="previous".
 * @slot cta-search - Content to display on call to action button ('Enter') when target component has enterkeyhint="search".
 * @slot cta-send - Content to display on call to action button ('Enter') when target component has enterkeyhint="send".
 * @slot cta-enter - Content to display on call to action button ('Enter') when target component has enterkeyhint="enter" or enterkeyhint is not set.
 *
 *
 */
@customElement('omni-keyboard')
export class Keyboard extends OmniElement {
    /**
     * The rule for the Keyboard to attach to inputs for showing on component focus.
     * * `all` - The Keyboard will show on focus for all input related components unless opted out with `data-omni-keyboard-hidden` on the component or a combination of `inputmode="none"` on the component and  `input-mode-none="hide"` on the Keyboard.
     * * `attribute` - The Keyboard will only show on focus for input related components with the `data-omni-keyboard-attach` attribute
     * @attr [attach-mode="all"]
     */
    @property({ type: String, attribute: 'attach-mode', reflect: true }) attachMode: 'all' | 'attribute' = 'all';

    /**
     * The text label to display by the close button.
     * @attr [close-label="Close"]
     */
    @property({ type: String, attribute: 'close-label', reflect: true }) closeLabel: string = 'Close';

    /**
     * The text label to display on the spacebar button.
     * @attr [space-label="Space"]
     */
    @property({ type: String, attribute: 'space-label', reflect: true }) spaceLabel: string = 'Space';

    /**
     * The text label to display on the clear button.
     * @attr [clear-label="Clear"]
     */
    @property({ type: String, attribute: 'clear-label', reflect: true }) clearLabel: string = 'Clear';

    /**
     * The text label to display on the call to action button when `enterkeyhint` is not defined or `enterkeyhint="enter"`. The `cta-enter` slot takes precedence over this label.
     * @attr [cta-label="Enter"]
     */
    @property({ type: String, attribute: 'cta-label', reflect: true }) ctaLabel: string = 'Enter';

    /**
     * The behaviour when encountering an inputmode="none" attribute on target component.
     *  * `show` - Will display the Keyboard on focus even if set to none.
     *  * `hide` - Will hide the Keyboard on focus when set to none. (Default)
     * @attr [input-mode-none="hide"]
     */
    @property({ type: String, attribute: 'input-mode-none', reflect: true }) inputModeNone: 'hide' | 'show' = 'hide';

    @state() private mode: KeyboardMode = 'none';
    @state() private currentCase: 'lower' | 'upper' | 'upper-single' = 'lower';
    @state() private state: KeyboardMode | 'special' = 'none';

    @state() private target?: HTMLInputElement | HTMLTextAreaElement;
    private targetObserver?: MutationObserver;
    private targetComponent?: HTMLElement;
    private targetComponentObserver?: MutationObserver;
    private returnMode: 'change-value' | 'multi-line' = 'change-value';

    private get displayValue() {
        if (
            !this.target ||
            this.returnMode === 'multi-line' ||
            this.target.hasAttribute(noDisplayValueAttribute) ||
            this.targetComponent?.hasAttribute(noDisplayValueAttribute)
        ) {
            return '';
        }

        if (this.target.type === 'password' || this.targetComponent?.hasAttribute(maskAttribute) || this.target?.hasAttribute(maskAttribute)) {
            return '*'.repeat(this.target.value.length);
        }

        return this.target.value;
    }

    private get displayCase() {
        return this.currentCase === 'upper' || this.currentCase === 'upper-single' ? 'upper' : 'lower';
    }

    private get currentEnterKeyHint() {
        return (
            this.targetComponent?.hasAttribute('enterkeyhint')
                ? this.targetComponent.getAttribute('enterkeyhint')
                : this.target?.getAttribute('enterkeyhint') ?? 'enter'
        ) as EnterKeyHint;
    }

    private globalClick = this._globalClick.bind(this);
    private globalFocus = this._globalFocus.bind(this);

    /**
     * Initialises the component.
     *
     * @hideconstructor
     */
    constructor() {
        super();
    }

    override connectedCallback(): void {
        super.connectedCallback();

        window.addEventListener('click', this.globalClick);
        document.addEventListener('focus', this.globalFocus, true);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener('click', this.globalClick);
        document.removeEventListener('focus', this.globalFocus, true);
    }

    /**
     * Handles closing of the Keyboard component
     *
     * @ignore
     * @returns {void}
     */
    _close(raiseChange = false, nextFocus = false) {
        if (raiseChange && this.target) {
            this.target.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                    cancelable: true,
                    composed: true
                })
            );
        }
        const focusReverse = this.currentEnterKeyHint === 'previous';
        this.target?.blur();
        const previous = (this.targetComponent?.hasAttribute('tabindex') ? this.targetComponent : this.target) as Element;

        this.target = undefined;
        this.targetObserver?.disconnect();
        this.targetObserver = undefined;

        this.targetComponent = undefined;
        this.targetComponentObserver?.disconnect();
        this.targetComponentObserver = undefined;
        this.state = 'none';
        this.mode = 'none';

        if (nextFocus && previous) {
            this._focusNext(previous, focusReverse);
        }
    }

    _focusNext(fromInput: Element, reverse: boolean = false) {
        const elem = fromInput;
        const tidx = Number(elem.getAttribute('tabindex'));

        const nextFocus = this._findNextTabIndex(elem, elem, tidx, reverse, null);
        if (nextFocus && nextFocus.element) {
            nextFocus.element.focus();
        }
        return nextFocus;
    }

    _findNextTabIndex(
        elem: Element,
        searchingElem: Element,
        tidx: number,
        reverse: boolean,
        foundNext: { element: HTMLElement; tabIndex: number } | null
    ): { element: HTMLElement; tabIndex: number } | null {
        foundNext = this._findNextTabIndexInChildren(elem, searchingElem, tidx, reverse, foundNext);

        if (elem.parentElement) {
            foundNext = this._findNextTabIndex(elem.parentElement, elem, tidx, reverse, foundNext);
        } else if (elem.parentNode && (elem.parentNode as any).host) {
            foundNext = this._findNextTabIndex((elem.parentNode as any).host, elem, tidx, reverse, foundNext);
        }
        return foundNext;
    }

    _findNextTabIndexInChildren(
        elem: Element,
        searchingElem: Element,
        tidx: number,
        reverse: boolean,
        foundNext: { element: HTMLElement; tabIndex: number } | null
    ): { element: HTMLElement; tabIndex: number } | null {
        const tidx1Attr = elem.getAttribute('tabindex');

        if (tidx1Attr) {
            const tidx1 = Number(tidx1Attr);

            let found = (foundNext && tidx1 > tidx && tidx1 < foundNext.tabIndex) || (!foundNext && tidx1 > tidx);
            if (reverse) {
                found = (foundNext && tidx1 < tidx && tidx1 > foundNext.tabIndex) || (!foundNext && tidx1 < tidx);
            }
            if (found) {
                foundNext = {
                    element: elem as HTMLElement,
                    tabIndex: tidx1
                };
            }
        }

        const children = elem.children;

        for (let i = 0; i < children.length; i++) {
            const element = children[i];

            if (element !== searchingElem) {
                foundNext = this._findNextTabIndexInChildren(element, element, tidx, reverse, foundNext);
            }
        }

        if (elem.shadowRoot) {
            const shadowRootChildren = elem.shadowRoot.children;

            for (let i = 0; i < shadowRootChildren.length; i++) {
                const element = shadowRootChildren[i];

                if (element !== searchingElem) {
                    foundNext = this._findNextTabIndexInChildren(element, element, tidx, reverse, foundNext);
                }
            }
        }

        return foundNext;
    }

    /**
     * Handles component key down events.
     *
     * @param {KeyboardEvent} event - The event details.
     *
     * @ignore
     * @returns {void}
     */
    async _keypress(event: CustomEvent<any>) {
        if (this.target) {
            const selection = {
                start: this.target.selectionStart ?? this.target.value.length,
                end: this.target.selectionEnd ?? this.target.value.length
            };
            let allowContinue = false;
            if (event.detail) {
                if (event.detail.value === 'return') {
                    const keyInfo: KeyboardEventInit = {
                        shiftKey: this.currentCase === 'upper-single',
                        modifierCapsLock: this.currentCase === 'upper',
                        key: 'Enter',
                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };
                    const keyDownEvent = new KeyboardEvent('keydown', keyInfo);
                    allowContinue = this.target.dispatchEvent(keyDownEvent);
                    if (allowContinue) {
                        await this.waitForAsyncHandlers();
                        allowContinue = !keyDownEvent.defaultPrevented;
                    }

                    // Enter/return key pressed
                    if (this.returnMode === 'change-value') {
                        this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));
                        // If returnMode is 'change-value', the keyboard will close when enter is pressed and focus on the element with the next tabIndex, if any.
                        this._close(true, true);
                        return;
                    } else if (this.returnMode === 'multi-line') {
                        if (!allowContinue) {
                            this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));
                            return;
                        }
                        // If returnMode is 'multi-line', the keyboard insert a new line into the value when enter is pressed
                        event.detail.value = '\r\n';
                    }
                } else if (event.detail.value === 'backspace') {
                    const keyInfo: KeyboardEventInit = {
                        shiftKey: this.currentCase === 'upper-single',
                        modifierCapsLock: this.currentCase === 'upper',
                        key: 'Backspace',
                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };
                    const inputInfo: InputEventInitWithType = {
                        inputType: 'deleteContentBackward',

                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };
                    const keyDownEvent = new KeyboardEvent('keydown', keyInfo);
                    allowContinue = this.target.dispatchEvent(keyDownEvent);
                    if (allowContinue) {
                        await this.waitForAsyncHandlers();
                        allowContinue = !keyDownEvent.defaultPrevented;
                    }
                    if (allowContinue) {
                        const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                        allowContinue = this.target.dispatchEvent(beforeInputEvent);
                        if (allowContinue) {
                            await this.waitForAsyncHandlers();
                            allowContinue = !beforeInputEvent.defaultPrevented;
                        }
                    }
                    if (!allowContinue) {
                        this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));
                        return;
                    }
                    // Backspace key pressed
                    const old = this.target.value;

                    if (selection.start === 0) {
                        // Nothing to backspace
                        return;
                    }

                    let newVal = old;
                    if (selection.start === selection.end) {
                        // Single caret position (no selection), so we only remove the character before the current position
                        newVal = `${old.substring(0, selection.start - 1)}${old.substring(selection.start)}`;
                    } else {
                        // There is a selection of one or more characters, so we remove only the selected characters
                        newVal = `${old.substring(0, selection.start)}${old.substring(selection.end)}`;
                    }

                    // Notify the input that its value is updated via a keyboard press by raising its input event
                    this.target.value = newVal;
                    this.target.dispatchEvent(new InputEvent('input', inputInfo));
                    this.target.focus();
                    this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));

                    // Re-render for the changes to be visible, and set the caret position to its position relative to the new changes
                    this.requestUpdate();

                    await this.updateComplete;

                    if (selectionSupportedTypes.includes(this.target.type)) {
                        this.target.setSelectionRange(
                            selection.start === selection.end ? selection.start - 1 : selection.start,
                            selection.start === selection.end ? selection.start - 1 : selection.start
                        );
                    }
                    this.target.focus();
                    this.requestUpdate();
                    return;
                } else if (event.detail.value === 'clear') {
                    const inputInfo: InputEventInitWithType = {
                        inputType: 'deleteContent',

                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };
                    // Clear button pressed
                    const old = this.target.value;

                    // Reset the whole value to be empty
                    const newVal = '';

                    // Notify the input that its value is updated
                    this.target.value = newVal;
                    const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                    allowContinue = this.target.dispatchEvent(beforeInputEvent);
                    if (allowContinue) {
                        await this.waitForAsyncHandlers();
                        allowContinue = !beforeInputEvent.defaultPrevented;
                    }
                    if (allowContinue) {
                        this.target.dispatchEvent(new InputEvent('input', inputInfo));
                    }
                    this.target.dispatchEvent(
                        new Event('change', {
                            bubbles: true,
                            cancelable: true,
                            composed: true
                        })
                    );

                    // Re-render for the changes to be visible
                    this.requestUpdate();
                    return;
                }

                const keyInfo: KeyboardEventInit = {
                    shiftKey: this.currentCase === 'upper-single',
                    modifierCapsLock: this.currentCase === 'upper',
                    key: event.detail.value === 'return' ? 'Enter' : event.detail.value,
                    bubbles: true,
                    cancelable: true,
                    composed: true
                };
                const inputInfo: InputEventInitWithType = {
                    inputType: 'insertText',
                    data: event.detail.value === 'return' ? null : event.detail.value?.toString(),
                    bubbles: true,
                    cancelable: true,
                    composed: true
                };
                if (!allowContinue) {
                    const keyDownEvent = new KeyboardEvent('keydown', keyInfo);
                    // Keydown has not yet been fired (This may be already set if Enter key was pressed as multi-line)
                    allowContinue = this.target.dispatchEvent(keyDownEvent);
                    if (allowContinue) {
                        await this.waitForAsyncHandlers();
                        allowContinue = !keyDownEvent.defaultPrevented;
                    }
                }

                if (allowContinue) {
                    const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                    allowContinue = this.target.dispatchEvent(beforeInputEvent);
                    if (allowContinue) {
                        await this.waitForAsyncHandlers();
                        allowContinue = !beforeInputEvent.defaultPrevented;
                    }
                }
                if (!allowContinue) {
                    this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));
                    return;
                }

                // Character/Number key pressed
                const old = this.target.value;

                let newVal = old;
                if (selection.start === selection.end) {
                    // Single caret position (no selection), so we just insert the new value at that position in the existing value
                    newVal = `${old.substring(0, selection.start)}${event.detail.value}${old.substring(selection.start)}`;
                } else {
                    // There is a selection of one or more characters, so we replace the selected characters with the new value
                    newVal = `${old.substring(0, selection.start)}${event.detail.value}${old.substring(selection.end)}`;
                }

                // Notify the input that its value is updated via a keyboard press by raising its input event
                this.target.value = newVal;
                this.target.dispatchEvent(new InputEvent('input', inputInfo));
                this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));

                // Re-render for the changes to be visible, and set the caret position to its position relative to the new changes
                this.requestUpdate();
                await this.updateComplete;

                if (selectionSupportedTypes.includes(this.target.type)) {
                    this.target.setSelectionRange(selection.start + 1, selection.start + 1);
                }
                this.target.focus();
                this.requestUpdate();
            }
        }

        // event.stopPropagation();
        if (this.currentCase === 'upper-single') {
            this.currentCase = 'lower';
        }
    }

    private async waitForAsyncHandlers(asyncLevel = 5) {
        let waitFor = Promise.resolve();
        // Chain promises up to `asyncLevel` times
        for (let index = 0; index < asyncLevel; index++) {
            // Defer execution to the next asynchronous execution
            // console.log('Waiting', index, asyncLevel);
            // await Promise.resolve().then();
            waitFor = waitFor.then();
        }
        await waitFor;
    }

    async _globalClick(e: MouseEvent) {
        await this.updateComplete;

        if (e.composedPath()) {
            if (e.composedPath().includes(this)) {
                this.target?.focus();
            } else if (this.target && !e.composedPath().includes(this.target) && this.targetComponent !== this._findActiveElement()) {
                this._close();
            }
        }
    }

    _globalFocus(event: FocusEvent) {
        const active = this._findActiveElement();
        if (
            active &&
            (active instanceof HTMLInputElement ||
                active instanceof HTMLTextAreaElement ||
                active?.shadowRoot?.activeElement instanceof HTMLInputElement ||
                active?.shadowRoot?.activeElement instanceof HTMLTextAreaElement)
        ) {
            const input = (active?.shadowRoot?.activeElement ?? active) as HTMLInputElement | HTMLTextAreaElement;

            if (
                this.target === input ||
                !supportedTypes.includes(input.type) ||
                (this.inputModeNone === 'hide' && (active.getAttribute('inputmode') === 'none' || input.inputMode === 'none')) ||
                active.hasAttribute(hiddenAttribute) ||
                input.hasAttribute(hiddenAttribute) ||
                (this.attachMode === 'attribute' && !(input.hasAttribute(attachAttribute) || active.hasAttribute(attachAttribute)))
            ) {
                return;
            }

            this.target = input;
            this.targetComponent = active as HTMLElement;

            if ('MutationObserver' in window) {
                this.targetObserver = new MutationObserver((mutations) => {
                    if (
                        mutations.filter((m) => m.type === 'attributes').find((m) => m.attributeName === 'type' || m.attributeName === maskAttribute)
                    ) {
                        this.requestUpdate();
                    }
                });
                this.targetObserver.observe(this.target, { attributes: true });

                this.targetComponentObserver = new MutationObserver((mutations) => {
                    if (mutations.filter((m) => m.type === 'attributes').find((m) => m.attributeName === maskAttribute)) {
                        this.requestUpdate();
                    }
                });
                this.targetComponentObserver.observe(this.targetComponent, { attributes: true });
            }

            this.mode =
                input.type === 'number' ||
                input.type === 'tel' ||
                input.inputMode === 'decimal' ||
                input.inputMode === 'numeric' ||
                input.inputMode === 'tel'
                    ? 'numeric'
                    : 'alpha-numeric';
            this.state = this.mode;
            this.returnMode =
                this.targetComponent.hasAttribute(multiLineAttribute) || input instanceof HTMLTextAreaElement ? 'multi-line' : 'change-value';
        }
    }

    _findActiveElement(innerElement: boolean = false) {
        let active = document.activeElement;

        if (!active) {
            return active;
        }

        let doc: Document | ShadowRoot | undefined | null = document;
        let prev: Document | ShadowRoot = doc;
        while (doc) {
            if (innerElement || active?.shadowRoot) {
                prev = doc;
            }
            doc = active?.shadowRoot;
            if (doc) {
                active = doc.activeElement;
            } else {
                active = prev.activeElement;
            }
        }
        return active;
    }

    _toggleCase() {
        if (this.currentCase === 'lower') {
            this.currentCase = 'upper-single';
        } else if (this.currentCase === 'upper-single') {
            this.currentCase = 'upper';
        } else {
            this.currentCase = 'lower';
        }
    }

    _toggleState() {
        if (this.state === 'special') {
            this.state = 'alpha-numeric';
        } else {
            this.state = 'special';
        }
    }

    // --------------
    // PUBLIC METHODS
    // --------------

    // n/a

    // ---------------
    // PRIVATE METHODS
    // ---------------

    // n/a

    // ---------
    // RENDERING
    // ---------

    static override get styles() {
        return [
            super.styles,
            css`
				:host {
					/* Keyboard needs to have a very high z index in order to be always on top */
					z-index: var(--omni-keyboard-z-index, 9999);
                    position: absolute;
				}

				.footer{
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					background-color: transparent;
					color: white;
					text-align: center;
				}
				.shadow {
					box-shadow: -5px 0px 30px var(--omni-box-shadow-color);
					border-radius: var(--omni-keyboard-shadow-border-radius,16px 16px 0px 0px);
					padding-bottom: var(--omni-keyboard-shadow-padding-bottom,-10px);
					background: var(--omni-keyboard-input-background-color,var(--omni-background-color));
				}

				.topbar{
					height: var(--omni-keyboard-top-bar-height, 48px);
					width: var(--omni-keyboard-top-bar-width, auto);
					padding-left: var(--omni-keyboard-top-bar-padding-left, 24px); 
					padding-right: var(--omni-keyboard-top-bar-padding-right, 41px); 
					background-color: var(--omni-keyboard-top-bar-background-color,var(--omni-background-active-color));
					list-style: none;
					display: var(--omni-keyboard-flex-display, flex);
					border-radius: var(--omni-keyboard-top-bar-border-radius,16px 16px 0px 0px);
					align-items: center;
					justify-content: space-between;
				}

				.bottomBar {
					height: var(--omni-keyboard-bottom-bar-height,104px);
					width: var(--omni-keyboard-bottom-bar-width, auto);
					padding: var(--omni-keyboard-bottom-bar-padding, 0px 24px);
					background-color: var(--omni-keyboard-bottom-bar-background-color,var(--omni-background-active-color));
					background: var(--omni-keyboard-bottom-bar-background-color,var(--omni-background-active-color));
					border-top: var(--omni-keyboard-bottom-bar-border-top,3px solid var(--omni-accent-color));
				}
				.cta-button {
					height: var(--omni-keyboard-cta-button-height,56px);
					width: var(--omni-keyboard-cta-button-width,184px);
					color: var(--omni-keyboard-cta-button-color,var(--omni-background-color));
					background-color: var(--omni-keyboard-cta-button-background-color,var(--omni-primary-color));
					border: none;
					text-align: center;
					font-size: var(--omni-keyboard-cta-button-font-size,20px);
					font-weight: var(--omni-keyboard-cta-button-font-weight,600);
					border-radius: var(--omni-keyboard-cta-button-border-radius,8px);
					margin: var(--omni-keyboard-cta-button-margin,24px);
					float: var(--omni-keyboard-cta-button-float, right);
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
				}
                .cta-icon {
                    --omni-icon-fill: var(--omni-keyboard-cta-button-color,var(--omni-background-color));
                }
                .close-icon {
                    width: var(--omni-keyboard-close-icon-width, 32px);
                }
				.closeButton{
					cursor: pointer; 
					font-weight: var(--omni-keyboard-close-button-font-weight,600); 
					color: var(--omni-keyboard-close-button-color,var(--omni-primary-color)); 
					font-size: var(--omni-keyboard-close-button-font-size,18px);
				}
				
				.closer{
					display: var(--omni-keyboard-flex-display, flex);
					flex-direction: row; 
					align-items: center;
					justify-content: space-between;
					width: var(--omni-keyboard-closer-width,68px);
					padding-right: var(--omni-keyboard-closer-padding-right,81px);
                    cursor: pointer;
				}

				.items{
					padding: 0;
					margin: 0;
					list-style: none;
					display: var(--omni-keyboard-flex-display, flex);
				}

				.firstItem{
					justify-content: flex-start; 
				}

				.secondItem{
					justify-content: flex-end; 
				}

				.wrapperContainer{
					display: flex;
					flex-direction: column; 
					align-items: center; 
					background-color: transparent;
				}

				.subWrapper{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}

				.wrapper {
					width: var(--omni-keyboard-wrapper-width,auto);
					background: var(--omni-keyboard-input-background-color,var(--omni-background-color));
					border-top: 3px solid var(--omni-accent-color);
				}

				.wrapper:first-child {
					margin-top: 0;
				}
				
				.keyrow {
					display: flex; 
					justify-content: center;
					margin: var(--omni-keyboard-key-row-margin,14px 53px);
					width: var(--omni-keyboard-key-row-width,auto);
				}
                .pad-top {
                    padding-top: var(--omni-keyboard-row-padding-top, 24px);
                }
                .pad-bottom {
                    padding-bottom: var(--omni-keyboard-row-padding-bottom, 24px);
                }
                .themed-icon {
                    --omni-icon-fill: var(--omni-primary-color, currentColor);
                }
                .stretch-icon {
                    height: 100%;
                }
			`
        ];
    }

    protected override render(): TemplateResult | typeof nothing {
        if (this.mode === 'alpha-numeric' && this.state === 'alpha-numeric') {
            return html`
			<div class="footer">
				<div class="wrapperContainer">
					<div class="shadow">
						<div class="topbar">
							<omni-label label="${this.displayValue}"></omni-label>
							<div class="closer" @click="${this._close}">
								<omni-label class="closeButton" label="${this.closeLabel}"></omni-label>
								<omni-icon size="medium" class="themed-icon">${this.renderClose()}</omni-icon>
							</div>
						</div>
						<div class="wrapper">
							<div class="keyrow pad-top" >
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="1"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="2"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="3"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="4"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="5"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="6"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="7"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="8"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="9"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="0"
									case="${this.displayCase}">
								</omni-keyboard-button>
							</div>
							<div class="keyrow">
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="q"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="w"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="e"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="r"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="t"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="y"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="u"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="i"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="o"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="p"
									case="${this.displayCase}">
								</omni-keyboard-button>
							</div>
							<div class="keyrow">
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="a"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="s"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="d"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="f"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="g"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="h"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="j"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="k"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="l"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="z"
									case="${this.displayCase}">
								</omni-keyboard-button>
							</div>
							<div class="keyrow">
								<omni-keyboard-button @keyboard-click="${this._toggleCase}" mode="action"
									character="caps" case="custom">${this.renderCaps()}</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="x"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="c"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="v"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="b"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="n"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="m"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="action" character="backspace" case="custom">                                    
                                    <omni-icon size="medium"  class="themed-icon">${this.renderBackspace()}</omni-icon>
                                </omni-keyboard-button>
							</div>
							<div class="keyrow pad-bottom" >
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="."
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" label="@"
									case="${this.displayCase}">
								</omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._toggleState}" mode="alpha" label="!#$"
									case="custom"></omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="space" label="${this.spaceLabel}"
									character=" " case="custom"></omni-keyboard-button>
								<omni-keyboard-button @keyboard-click="${this._keypress}" mode="return" label="${this.clearLabel}"
									character="clear" case="custom"></omni-keyboard-button>
							</div>
							<div class="bottomBar">
                                ${this.renderCallToAction()}
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
        } else if (this.state === 'special') {
            this.state = 'special';
            return html`
			<div class="footer">
				<div class="wrapperContainer">
					<div class="shadow">
						<div class="topbar">
							<omni-label label="${this.displayValue}"></omni-label>
							<div class="closer" @click="${this._close}">
								<omni-label class="closeButton" label="${this.closeLabel}"></omni-label>
								<omni-icon size="medium" class="themed-icon">${this.renderClose()}</omni-icon>
							</div>
						</div>
						<div class="wrapper">
							<div>
								<div>
									<div class="keyrow pad-top" >
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="!">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="|">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="#">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="_">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" character="backspace" case="custom">
                                            <omni-icon size="medium"  class="themed-icon">${this.renderBackspace()}</omni-icon>
										</omni-keyboard-button>
									</div>
									<div class="keyrow">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="%">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="&gt;">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="'">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="^">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="$">
										</omni-keyboard-button>
									</div>
									<div class="keyrow">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="*">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="+">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="-">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="\'">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="~">
										</omni-keyboard-button>
									</div>
									<div class="keyrow">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="/">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="=">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="?">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="{">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="}">
										</omni-keyboard-button>
									</div>
									<div class="keyrow pad-bottom">
										${
                                            this.mode === 'alpha-numeric'
                                                ? html`<omni-keyboard-button
											@keyboard-click="${this._toggleState}" mode="alpha" label="abc" case="custom">
										</omni-keyboard-button>`
                                                : nothing
                                        }
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="@">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label=".">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="return" label="${this.clearLabel}"
											character="clear" case="custom"></omni-keyboard-button>
									</div>
								</div>
							</div>
							<div class="bottomBar">
							${this.renderCallToAction()}
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
        } else if (this.mode === 'numeric') {
            return html`
			<div class="footer">
				<div class="wrapperContainer">
					<div class="shadow">
						<div class="topbar">
							<omni-label label="${this.displayValue}"></omni-label>
							<div class="closer" @click="${this._close}">
								<omni-label class="closeButton" label="${this.closeLabel}"></omni-label>
								<omni-icon size="medium" class="themed-icon">${this.renderClose()}</omni-icon>
							</div>
						</div>
						<div class="wrapper">
							<div>
								<div>
									<div class="keyrow pad-top" >
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="1">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="2">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="3">
										</omni-keyboard-button>
									</div>
									<div class="keyrow">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="4">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="5">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="6">
										</omni-keyboard-button>
									</div>
									<div class="keyrow">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="7">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="8">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="9">
										</omni-keyboard-button>
									</div>
									<div class="keyrow" style="margin-bottom:0px; padding-bottom: 24px">
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="${this.clearLabel}"
											character="clear" case="custom"></omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="0">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="alpha" character="backspace" case="custom">            
                                            <omni-icon size="medium" class="themed-icon">${this.renderBackspace()}</omni-icon>
                                        </omni-keyboard-button>
									</div>
								</div>
							</div>
						</div>
						<div class="bottomBar">
							${this.renderCallToAction()}
						</div>
					</div>
				</div>
			</div>
			</div>
			`;
        }

        return nothing;
    }

    renderCaps() {
        return this.currentCase === 'lower'
            ? html`
                <omni-icon size="medium" class="themed-icon">
                    <slot name="caps-off">
                        <omni-caps-off-icon class="stretch-icon"></omni-caps-off-icon>
                    </slot>
                </omni-icon>           
            `
            : this.currentCase === 'upper-single'
            ? html`
                <omni-icon size="medium" class="themed-icon">
                    <slot name="caps-on">
                        <omni-caps-on-icon class="stretch-icon"></omni-caps-on-icon>
                    </slot>
                </omni-icon>
            `
            : this.currentCase === 'upper'
            ? html`
                <omni-icon size="medium" class="themed-icon">
                    <slot name="caps-on-permanent">
                        <omni-caps-on-permanent-icon class="stretch-icon"></omni-caps-on-permanent-icon>
                    </slot>
                </omni-icon>
            `
            : nothing;
    }

    renderClose() {
        return html`
        <slot name="close">
            <omni-chevron-down-icon  class="close-icon"></omni-chevron-down-icon>
        </slot>
        `;
    }

    renderBackspace() {
        return html`
            <slot name="backspace">
                <omni-backspace-icon class="stretch-icon"></omni-backspace-icon>
            </slot>
        `;
    }

    renderCallToAction() {
        const enterKeyHint = this.currentEnterKeyHint;
        return html`
            <button class="cta-button" @click="${() => this._keypress({ detail: { value: 'return' } } as CustomEvent<any>)}" mode="action">
                ${
                    enterKeyHint === 'done'
                        ? html`
                    <slot name="cta-done">
                        <omni-icon size="medium" class="cta-icon"><omni-check-icon class="stretch-icon"></omni-check-icon></omni-icon>
                    </slot>`
                        : enterKeyHint === 'go'
                        ? html`
                    <slot name="cta-go">
                        <omni-icon size="medium" class="cta-icon"><omni-arrow-right-icon class="stretch-icon"></omni-arrow-right-icon></omni-icon>
                    </slot>`
                        : enterKeyHint === 'next'
                        ? html`
                    <slot name="cta-next">
                        <omni-icon size="medium" class="cta-icon"><omni-next-icon class="stretch-icon"></omni-next-icon></omni-icon>
                    </slot>`
                        : enterKeyHint === 'previous'
                        ? html`
                    <slot name="cta-previous">
                        <omni-icon size="medium" class="cta-icon"><omni-previous-icon class="stretch-icon"></omni-previous-icon></omni-icon>
                    </slot>`
                        : enterKeyHint === 'search'
                        ? html`
                    <slot name="cta-search">
                        <omni-icon size="medium" class="cta-icon"><omni-search-icon class="stretch-icon"></omni-search-icon></omni-icon>
                    </slot>`
                        : enterKeyHint === 'send'
                        ? html`
                    <slot name="cta-send">
                        <omni-icon size="medium" class="cta-icon"><omni-send-icon class="stretch-icon"></omni-send-icon></omni-icon>
                    </slot>`
                        : html`
                    <slot name="cta-enter">
                        ${this.ctaLabel}
                    </slot>`
                }
            </button>
        `;
    }
}

// Custom Global Attributes
/**
 * Indicates that the Keyboard display value must be masked.
 */
export const maskAttribute = 'data-omni-keyboard-mask';
/**
 * Indicates that the call to action button inserts a new line instead of default behaviour.
 */
export const multiLineAttribute = 'data-omni-keyboard-multi-line';
/**
 * Disables the Keyboard for that component.
 */
export const hiddenAttribute = 'data-omni-keyboard-hidden';
/**
 * Disables the Keyboard display value. Takes precedence over `data-omni-keyboard-mask`.
 */
export const noDisplayValueAttribute = 'data-omni-keyboard-no-display';
/**
 * Indicates that the Keyboard is enabled for that component when the Keyboard has `attach-mode="attribute"`.
 */
export const attachAttribute = 'data-omni-keyboard-attach';

const supportedTypes = ['number', 'email', 'tel', 'password', 'search', 'text', 'url', 'textarea'];
const selectionSupportedTypes = ['tel', 'password', 'search', 'text', 'url', 'textarea'];

export type InputEventTypes =
    | 'insertText'
    | 'insertReplacementText'
    | 'insertLineBreak'
    | 'insertParagraph'
    | 'insertOrderedList'
    | 'insertUnorderedList'
    | 'insertHorizontalRule'
    | 'insertFromYank'
    | 'insertFromDrop'
    | 'insertFromPaste'
    | 'insertFromPasteAsQuotation'
    | 'insertTranspose'
    | 'insertCompositionText'
    | 'insertLink'
    | 'deleteWordBackward'
    | 'deleteWordForward'
    | 'deleteSoftLineBackward'
    | 'deleteSoftLineForward'
    | 'deleteEntireSoftLine'
    | 'deleteHardLineBackward'
    | 'deleteHardLineForward'
    | 'deleteByDrag'
    | 'deleteByCut'
    | 'deleteContent'
    | 'deleteContentBackward'
    | 'deleteContentForward'
    | 'historyUndo'
    | 'historyRedo'
    | 'formatBold'
    | 'formatItalic'
    | 'formatUnderline'
    | 'formatStrikeThrough'
    | 'formatSuperscript'
    | 'formatSubscript'
    | 'formatJustifyFull'
    | 'formatJustifyCenter'
    | 'formatJustifyRight'
    | 'formatJustifyLeft'
    | 'formatIndent'
    | 'formatOutdent'
    | 'formatRemove'
    | 'formatSetBlockTextDirection'
    | 'formatSetInlineTextDirection'
    | 'formatBackColor'
    | 'formatFontColor'
    | 'formatFontName';
export type EnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
export type KeyboardMode = 'numeric' | 'alpha-numeric' | 'none';
export type InputEventInitWithType =
    | InputEventInit
    | {
          inputType: InputEventTypes;
      };

declare global {
    interface HTMLElementTagNameMap {
        'omni-keyboard': Keyboard;
    }
}
