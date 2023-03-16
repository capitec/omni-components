import { css, html, nothing, TemplateResult, render as renderToElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import OmniElement from '../core/OmniElement.js';
import { RenderFunction } from '../render-element/RenderElement.js';

export { RenderFunction, RenderResult } from '../render-element/RenderElement.js';

import '../icons/ArrowRight.icon.js';
import '../icons/Backspace.icon.js';
import '../icons/ChevronDown.icon.js';
import '../icons/Check.icon.js';
import '../icons/CapsOff.icon.js';
import '../icons/CapsOn.icon.js';
import '../icons/CapsLock.icon.js';
import '../icons/Next.icon.js';
import '../icons/Previous.icon.js';
import '../icons/Search.icon.js';
import '../icons/Send.icon.js';
import '../render-element/RenderElement.js';
import '../label/Label.js';
import '../icon/Icon.js';
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
 * @slot caps-lock - Content to display on case change button when in a permanent uppercase state (caps lock).
 * @slot close - Content to display next to close label.
 * @slot backspace - Content to display on backspace button.
 * @slot clear - Content to display on clear button.
 * @slot action-done - Content to display on call to action button ('Enter') when target component has enterkeyhint="done".
 * @slot action-go - Content to display on call to action button ('Enter') when target component has enterkeyhint="go".
 * @slot action-next - Content to display on call to action button ('Enter') when target component has enterkeyhint="next".
 * @slot action-previous - Content to display on call to action button ('Enter') when target component has enterkeyhint="previous".
 * @slot action-search - Content to display on call to action button ('Enter') when target component has enterkeyhint="search".
 * @slot action-send - Content to display on call to action button ('Enter') when target component has enterkeyhint="send".
 * @slot action-enter - Content to display on call to action button ('Enter') when target component has enterkeyhint="enter" or enterkeyhint is not set.
 *
 * @cssprop --omni-keyboard-button-icon-max-height - Max height for slotted content in keyboard buttons.
 * @cssprop --omni-keyboard-button-icon-max-width - Max width for slotted content in keyboard buttons.
 * @cssprop --omni-keyboard-button-font-family - Font family for text in keyboard buttons.
 * @cssprop --omni-keyboard-button-font-color - Font color for text in keyboard buttons.
 * @cssprop --omni-keyboard-button-font-size - Font size for text in keyboard buttons.
 * @cssprop --omni-keyboard-button-background-color - Background color for keyboard buttons.
 * @cssprop --omni-keyboard-button-border - Border for keyboard buttons.
 * @cssprop --omni-keyboard-button-margin - Margin for keyboard buttons.
 * @cssprop --omni-keyboard-button-font-weight - Font weight for text in keyboard buttons.
 * @cssprop --omni-keyboard-button-height - Height for keyboard buttons.
 * @cssprop --omni-keyboard-button-width - Width for keyboard buttons.
 * @cssprop --omni-keyboard-button-line-height - Line height for keyboard buttons.
 * @cssprop --omni-keyboard-button-border-radius - Border radius for keyboard buttons.
 *
 * @cssprop --omni-keyboard-button-mobile-margin - Margin for keyboard buttons in mobile viewports.
 * @cssprop --omni-keyboard-button-mobile-height - Height for keyboard buttons in mobile viewports.
 * @cssprop --omni-keyboard-button-mobile-width - Width for keyboard buttons in mobile viewports.
 * @cssprop --omni-return-keyboard-button-mobile-width - Width for return keyboard buttons in mobile viewports.
 * @cssprop --omni-numeric-keyboard-button-mobile-width - Width for numeric keyboard buttons in mobile viewports.
 *
 * @cssprop --omni-keyboard-button-mobile-small-height - Height for keyboard buttons in small mobile viewports.
 * @cssprop --omni-keyboard-button-mobile-small-width - Width for keyboard buttons in small mobile viewports.
 * @cssprop --omni-keyboard-button-mobile-small-font-size - Font size for text in keyboard buttons in small mobile viewports.
 * @cssprop --omni-keyboard-button-mobile-small-border-radius - Border radius for keyboard buttons in small mobile viewports.
 * @cssprop --omni-return-keyboard-button-mobile-small-width - Width for return keyboard buttons in small mobile viewports.
 * @cssprop --omni-numeric-keyboard-button-mobile-small-width - Width for numeric keyboard buttons in small mobile viewports.
 *
 * @cssprop --omni-keyboard-shadow-border-radius - Border radius for keyboard shadow.
 * @cssprop --omni-keyboard-shadow-padding-bottom - Bottom padding for keyboard shadow.
 * @cssprop --omni-keyboard-shadow-background-color - Background color for keyboard shadow.
 *
 * @cssprop --omni-keyboard-top-bar-width - Width for keyboard top bar.
 * @cssprop --omni-keyboard-top-bar-padding-left - Left padding for keyboard top bar.
 * @cssprop --omni-keyboard-top-bar-padding-right - Right padding for keyboard top bar.
 * @cssprop --omni-keyboard-top-bar-background-color - Background color for keyboard top bar.
 * @cssprop --omni-keyboard-top-bar-border-radius - Border radius for keyboard top bar.
 * @cssprop --omni-keyboard-top-bar-border-bottom-color - Border bottom color for keyboard top bar.
 * 
 * @cssprop --omni-keyboard-wrapper-width - Width for keyboard button rows wrapper.
 * @cssprop --omni-keyboard-special-wrapper-width - Width for keyboard button rows wrapper for special keys.
 * @cssprop --omni-keyboard-numeric-wrapper-width - Width for keyboard button rows wrapper for numeric keyboard mode.
 *
 * @cssprop --omni-keyboard-action-button-width - Width for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-max-width - Max width for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-color - Font or icon colour for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-background-color - Background colour for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-font-size - Font size for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-font-weight - Font weight for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-border-radius - Border radius for keyboard call to action button.
 * @cssprop --omni-keyboard-action-button-margin - Margin for keyboard call to action button.
 *
 * @cssprop --omni-keyboard-close-icon-width - Width for keyboard close button icon.
 * @cssprop --omni-keyboard-close-button-font-weight - Font weight for keyboard close button.
 * @cssprop --omni-keyboard-close-button-color - Font colour for keyboard close button.
 * @cssprop --omni-keyboard-close-button-font-size - Font size for keyboard close button.
 * @cssprop --omni-keyboard-closer-width - Width for keyboard close button area.
 * @cssprop --omni-keyboard-closer-padding-right - Right padding for keyboard close button area.
 *
 * @cssprop --omni-keyboard-background-color - Background color for keyboard.
 *
 * @cssprop --omni-keyboard-key-row-margin - Margin for keyboard rows.
 * @cssprop --omni-keyboard-key-row-width - Width for keyboard rows.
 * @cssprop --omni-keyboard-row-padding-top - Top padding for first keyboard row.
 * @cssprop --omni-keyboard-row-padding-bottom - Bottom padding for last keyboard row.
 *
 * @cssprop --omni-keyboard-icons-color - Colour for keyboard icons.
 *
 * @cssprop --omni-keyboard-top-bar-mobile-height - Height for keyboard top bar in mobile viewports.
 * @cssprop --omni-keyboard-top-bar-mobile-border-radius - Border radius for keyboard top bar in mobile viewports.
 *
 * @cssprop --omni-keyboard-mobile-key-row-margin - Margin for keyboard rows in mobile viewports.
 * @cssprop --omni-keyboard-mobile-special-key-row-margin - Margin for special keyboard rows in mobile viewports.
 * @cssprop --omni-keyboard-mobile-key-row-width - Width for keyboard rows in mobile viewports.
 *
 * @cssprop --omni-keyboard-mobile-action-button-height - Height for keyboard call to action button in mobile viewports.
 * @cssprop --omni-keyboard-mobile-action-button-max-width - Max width for keyboard call to action button in mobile viewports.
 * @cssprop --omni-keyboard-mobile-action-button-margin - Margin for keyboard call to action button in mobile viewports.
 *
 * @cssprop --omni-keyboard-mobile-close-icon-width - Width for keyboard close button icon in mobile viewports.
 * @cssprop --omni-keyboard-mobile-close-icon-width - Width for keyboard close button icon in mobile viewports.
 *
 * @cssprop --omni-keyboard-mobile-small-key-row-margin - Margin for keyboard rows in small mobile viewports.
 * @cssprop --omni-keyboard-mobile-small-key-row-margin - Margin for special keyboard rows in small mobile viewports.
 *
 * @cssprop --omni-keyboard-mobile-small-action-button-height - Height for keyboard call to action button in small mobile viewports.
 * @cssprop --omni-keyboard-mobile-small-action-button-max-width - Max width for keyboard call to action button in small mobile viewports.
 */
@customElement('omni-keyboard')
export class Keyboard extends OmniElement {
    /**
     * The rule for the Keyboard to attach to inputs for showing on component focus.
     * * `all` - The Keyboard will show on focus for all input related components unless opted out with `data-omni-keyboard-hidden` on the component.
     * * `attribute` - The Keyboard will only show on focus for input related components with the `data-omni-keyboard-attach` attribute
     * @attr [attach-mode="all"]
     */
    @property({ type: String, attribute: 'attach-mode', reflect: true }) attachMode: 'all' | 'attribute' | 'id' = 'all';

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
     * The text label to display on the clear button. The `clear` slot takes precedence over this label.
     * @attr [clear-label="Clear"]
     */
    @property({ type: String, attribute: 'clear-label', reflect: true }) clearLabel: string = 'Clear';

    /**
     * The text label to display on the call to action button when `enterkeyhint` is not defined or `enterkeyhint="enter"`. The `action-enter` slot takes precedence over this label.
     * @attr [action-label="Enter"]
     */
    @property({ type: String, attribute: 'action-label', reflect: true }) actionLabel: string = 'Enter';

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

    private get currentEnterKeyHint(): EnterKeyHint {
        const explicitHint = (
            this.targetComponent?.hasAttribute('enterkeyhint')
                ? this.targetComponent.getAttribute('enterkeyhint')
                : this.target?.getAttribute('enterkeyhint')
        );

        if (!explicitHint) {
            if (this.target?.type === 'search') {
                return 'search';
            } else {
                return 'enter';
            }
        }
        
       return explicitHint as EnterKeyHint;
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

    /**
     * Creates a new Keyboard element with the provided context and appends it to the DOM (either to document body or to provided target parent element).
     * @param init Initialisation context for Keyboard element that will be created.
     * @returns Keyboard element that was created.
     */
    static create(init: KeyboardInit) {
        if (!init.parent) {
            // If no parent element is specified, the Keyboard will be appended to an empty div directly on the document body.
            init.parent = document.createElement('div');
            document.body.appendChild(init.parent);
        }

        if (typeof init.parent === 'string') {
            // If a parent element is specified as a string, find the actual parent element instance using the provided string as an id.
            init.parent = document.getElementById(init.parent);
            if (!init.parent) {
                return undefined;
            }
        }

        const refToKeyboard: Ref<Keyboard> = createRef();
        renderToElement(
            html`        
                <omni-keyboard ${ref(refToKeyboard)} id="${ifDefined(init.id)}"
                    attach-mode="${ifDefined(init.attachMode)}" 
                    clear-label="${ifDefined(init.clearLabel)}" 
                    space-label="${ifDefined(init.spaceLabel)}" 
                    action-label="${ifDefined(init.actionLabel)}" 
                    close-label="${ifDefined(init.closeLabel)}">
                    <omni-render-element slot="clear" .renderer="${init.clear ? init.clear : () => html`${init.clearLabel}`}"></omni-render-element>
                    ${
                        init.capsOff
                            ? html`<omni-render-element  slot="caps-off" .renderer="${init.capsOff}"></omni-render-element>`
                            : html`<omni-caps-off-icon style="display: inherit;" slot="caps-off"></omni-caps-off-icon>`
                    }
                    ${
                        init.capsOn
                            ? html`<omni-render-element slot="caps-on" .renderer="${init.capsOn}"></omni-render-element>`
                            : html`<omni-caps-on-icon style="display: inherit;" slot="caps-on"></omni-caps-on-icon>`
                    }
                    ${
                        init.capsLock
                            ? html`<omni-render-element slot="caps-lock" .renderer="${init.capsLock}"></omni-render-element>`
                            : html`<omni-caps-lock-icon style="display: inherit;" slot="caps-lock"></omni-caps-lock-icon>`
                    }
                    ${
                        init.backspace
                            ? html`<omni-render-element slot="backspace" .renderer="${init.backspace}"></omni-render-element>`
                            : html`<omni-backspace-icon style="display: inherit;" slot="backspace"></omni-backspace-icon>`
                    }
                    ${
                        init.close
                            ? html`<omni-render-element slot="close" .renderer="${init.close}"></omni-render-element>`
                            : html`<omni-chevron-down-icon style="display: inherit;" slot="close"></omni-chevron-down-icon>`
                    }
                    <omni-render-element slot="action-enter" .renderer="${
                        init.actionEnter ? init.actionEnter : () => html`${init.actionLabel}`
                    }"></omni-render-element>
                    ${
                        init.actionDone
                            ? html`<omni-render-element slot="action-done" .renderer="${init.actionDone}"></omni-render-element>`
                            : html`<omni-check-icon style="display: inherit;"  slot="action-done"></omni-check-icon>`
                    }
                    ${
                        init.actionGo
                            ? html`<omni-render-element slot="action-go" .renderer="${init.actionGo}"></omni-render-element>`
                            : html`<omni-arrow-right-icon style="display: inherit;" slot="action-go"></omni-arrow-right-icon>`
                    }
                    ${
                        init.actionNext
                            ? html`<omni-render-element slot="action-next" .renderer="${init.actionNext}"></omni-render-element>`
                            : html`<omni-next-icon style="display: inherit;"  slot="action-next"></omni-next-icon>`
                    }
                    ${
                        init.actionPrevious
                            ? html`<omni-render-element slot="action-previous" .renderer="${init.actionPrevious}"></omni-render-element>`
                            : html`<omni-previous-icon style="display: inherit;" slot="action-previous"></omni-previous-icon>`
                    }
                    ${
                        init.actionSearch
                            ? html`<omni-render-element slot="action-search" .renderer="${init.actionSearch}"></omni-render-element>`
                            : html`<omni-search-icon style="display: inherit;" slot="action-search"></omni-search-icon>`
                    }
                    ${
                        init.actionSend
                            ? html`<omni-render-element slot="action-send" .renderer="${init.actionSend}"></omni-render-element>`
                            : html`<omni-send-icon style="display: inherit;" slot="action-send"></omni-send-icon>`
                    }
                </omni-keyboard>
            `,
            init.parent
        );

        return refToKeyboard.value;
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
     */
    _close(raiseChange = false, nextFocus = false): void {
        if (raiseChange && this.target) {
            this.target.dispatchEvent(
                new Event('change', {
                    bubbles: true,
                    cancelable: true,
                    composed: true
                })
            );
        }

        // When the 'enterkeyhint' attribute is 'previous' the tabIndex to be focused must be searched in reverse
        const focusReverse = this.currentEnterKeyHint === 'previous';

        const previous = (this.targetComponent?.hasAttribute('tabindex') ? this.targetComponent : this.target) as Element;
        this.target?.blur();

        // Reset all states as the Keyboard has no current target input after a close
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

    /**
     * Focuses the next highest tabIndex from the previous element's tabIndex. If `reverse` is true, will focus the next smallest tabIndex instead.
     *
     * @ignore
     */
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if (elem.parentNode && (elem.parentNode as any).host) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
     * @param event - The event details.
     *
     * @ignore
     */
    async _keypress(event: CustomEvent<{ value: string }>) {
        if (this.target) {
            const selection = {
                start: this.target.selectionStart ?? this.target.value.length,
                end: this.target.selectionEnd ?? this.target.value.length
            };
            let allowContinue = false;
            if (event.detail) {
                if (event.detail.value === 'return') {
                    // Call to action was clicked, treat as 'Enter' key being pressed
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
                    // // Uncomment if support for async event handlers are required
                    // if (allowContinue) {
                    //     await this.waitForAsyncHandlers();
                    //     allowContinue = !keyDownEvent.defaultPrevented;
                    // }

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
                        // If returnMode is 'multi-line', the keyboard inserts a new line into the value when enter is pressed.
                        event.detail.value = '\r\n';
                    }
                } else if (event.detail.value === 'backspace') {
                    // Backspace was clicked
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
                    // // Uncomment if support for async event handlers are required
                    // if (allowContinue) {
                    //     await this.waitForAsyncHandlers();
                    //     allowContinue = !keyDownEvent.defaultPrevented;
                    // }
                    if (allowContinue) {
                        const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                        allowContinue = this.target.dispatchEvent(beforeInputEvent);
                        // // Uncomment if support for async event handlers are required
                        // if (allowContinue) {
                        //     await this.waitForAsyncHandlers();
                        //     allowContinue = !beforeInputEvent.defaultPrevented;
                        // }
                    }
                    if (!allowContinue) {
                        this.target.dispatchEvent(new KeyboardEvent('keyup', keyInfo));
                        return;
                    }
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
                    // Clear button pressed
                    const inputInfo: InputEventInitWithType = {
                        inputType: 'deleteContent',

                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };

                    // Reset the whole value to be empty
                    const newVal = '';

                    // Notify the input that its value is updated
                    this.target.value = newVal;
                    const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                    allowContinue = this.target.dispatchEvent(beforeInputEvent);
                    // // Uncomment if support for async event handlers are required
                    // if (allowContinue) {
                    //     await this.waitForAsyncHandlers();
                    //     allowContinue = !beforeInputEvent.defaultPrevented;
                    // }
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
                    // Keydown has not yet been fired (This may be already set if call to action button was clicked as multi-line)
                    allowContinue = this.target.dispatchEvent(keyDownEvent);
                    // // Uncomment if support for async event handlers are required
                    // if (allowContinue) {
                    //     await this.waitForAsyncHandlers();
                    //     allowContinue = !keyDownEvent.defaultPrevented;
                    // }
                }

                if (allowContinue) {
                    const beforeInputEvent = new InputEvent('beforeinput', inputInfo);
                    allowContinue = this.target.dispatchEvent(beforeInputEvent);
                    // // Uncomment if support for async event handlers are required
                    // if (allowContinue) {
                    //     await this.waitForAsyncHandlers();
                    //     allowContinue = !beforeInputEvent.defaultPrevented;
                    // }
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

        if (this.currentCase === 'upper-single') {
            // Imitate 'Shift' key behaviour, after the keypress the characters revert to lowercase.
            this.currentCase = 'lower';
        }
    }

    // // Uncomment if support for async event handlers are required
    // private async waitForAsyncHandlers(asyncLevel = 5) {
    //     let waitFor = Promise.resolve();
    //     // Chain promises up to `asyncLevel` times
    //     for (let index = 0; index < asyncLevel; index++) {
    //         // Defer execution to the next asynchronous execution
    //         // console.log('Waiting', index, asyncLevel);
    //         // await Promise.resolve().then();
    //         waitFor = waitFor.then();
    //     }
    //     await waitFor;
    // }

    async _globalClick(e: MouseEvent) {
        await this.updateComplete;

        if (e.composedPath()) {
            if (e.composedPath().includes(this)) {
                // Clicking anywhere in the Keyboard should refocus to the target element.
                this.target?.focus();
            } else if (this.target && !e.composedPath().includes(this.target) && this.targetComponent !== this._findActiveElement()) {
                // When clicking outside both the Keyboard and the target element, the Keyboard should auto close.
                this._close();
            }
        }
    }

    _globalFocus() {
        const active = this._findActiveElement();
        if (
            active &&
            (active instanceof HTMLInputElement ||
                active instanceof HTMLTextAreaElement ||
                active?.shadowRoot?.activeElement instanceof HTMLInputElement ||
                active?.shadowRoot?.activeElement instanceof HTMLTextAreaElement)
        ) {
            // Current active element is supported.
            const input = (active?.shadowRoot?.activeElement ?? active) as HTMLInputElement | HTMLTextAreaElement;

            if (
                // When the focused element is already the target, no more action is required.
                this.target === input ||
                // When the focused input has an unsupported type (e.g. 'color' or 'date'), treat as ignored.
                !supportedTypes.includes(input.type) ||
                // When either the active component or the innermost focused element has 'data-omni-keyboard-hidden' attribute, treat as ignored.
                active.hasAttribute(hiddenAttribute) ||
                input.hasAttribute(hiddenAttribute) ||
                // When the Keyboard attach mode requires the 'data-omni-keyboard-attach' attribute and it is not present on either the active component or innermost focused element, treat as ignored.
                (this.attachMode === 'attribute' && !(input.hasAttribute(attachAttribute) || active.hasAttribute(attachAttribute))) ||
                // When the Keyboard attach mode requires the 'data-omni-keyboard-attach' attribute to be equal to its id and it is not present and set to the correct id on either the active component or innermost focused element, treat as ignored.
                (this.attachMode === 'id' &&
                    !(this.id && (input.getAttribute(attachAttribute) === this.id || active.getAttribute(attachAttribute) === this.id))) ||
                // When either the active component or innermost focused element has the 'data-omni-keyboard-attach' attribute set to a value and that value does not equal the Keyboard id, treat as ignored.
                (input.getAttribute(attachAttribute) && input.getAttribute(attachAttribute) !== this.id) ||
                (active.getAttribute(attachAttribute) && active.getAttribute(attachAttribute) !== this.id)
            ) {
                return;
            }

            this.target = input;
            this.targetComponent = active as HTMLElement;

            if ('MutationObserver' in window) {
                // If the browser supports 'MutationObserver', watch for the 'type' or 'data-omni-keyboard-mask' attribute changing on both the active component as well as the innermost focused element.
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

            const mode = (this.targetComponent.hasAttribute(explicitKeyboardMode) ? this.targetComponent.getAttribute(explicitKeyboardMode) : this.target.getAttribute(explicitKeyboardMode)) ?? input.inputMode;

            this.mode =
                input.type === 'number' ||
                input.type === 'tel' ||
                mode === 'decimal' ||
                mode === 'numeric' ||
                mode === 'tel'
                    ? 'numeric'
                    : 'alpha-numeric';
            this.state = this.mode;
            this.returnMode =
                this.targetComponent.hasAttribute(multiLineAttribute) || input instanceof HTMLTextAreaElement ? 'multi-line' : 'change-value';
        }
    }

    /**
     * Finds the current innermost active component or element.
     * @ignore
     */
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
					background: var(--omni-keyboard-shadow-background-color,var(--omni-background-color));

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
				}

				.topbar{
					width: var(--omni-keyboard-top-bar-width, 100%);
                    padding-left: var(--omni-keyboard-top-bar-padding-left, 12px);
                    padding-right: var(--omni-keyboard-top-bar-padding-right, 5px);
					background-color: var(--omni-keyboard-top-bar-background-color,var(--omni-background-active-color));
					list-style: none;
					display: flex;
					border-radius: var(--omni-keyboard-top-bar-border-radius,10px 10px 0px 0px);
					align-items: center;
					justify-content: space-between;
					border-bottom: 3px solid var(--omni-keyboard-top-bar-border-bottom-color,var(--omni-accent-color));
				}

                
				.action-button {
					width: var(--omni-keyboard-action-button-width, 100%);
                    max-width: var(--omni-keyboard-action-button-max-width,114px);
					color: var(--omni-keyboard-action-button-color,var(--omni-background-color));
					background-color: var(--omni-keyboard-action-button-background-color,var(--omni-primary-color));
					border: none;
					text-align: center;
					font-size: var(--omni-keyboard-action-button-font-size,15px);
					font-weight: var(--omni-keyboard-action-button-font-weight,600);
					border-radius: var(--omni-keyboard-action-button-border-radius,8px);
					margin: var(--omni-keyboard-action-button-margin,var(--omni-keyboard-button-margin, 6px 7px));
					float: right;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
				}

                .action-fill {
                    height: var(--omni-keyboard-button-height, 40px);
                    margin: var(--omni-keyboard-button-margin, 6px 7px);
                    max-width: unset !important;
                }


                .action-icon {
                    --omni-icon-fill: var(--omni-keyboard-action-button-color,var(--omni-background-color));
                }

                .fill-space {
                    width: 100%;
                }

                .close-icon {
                    width: var(--omni-keyboard-close-icon-width, 32px);
                }

				.closeButton{
					cursor: pointer; 
					font-weight: var(--omni-keyboard-close-button-font-weight,600); 
					color: var(--omni-keyboard-close-button-color,var(--omni-primary-color)); 
					font-size: var(--omni-keyboard-close-button-font-size,16px);
				}
				
				.closer{
					display: flex;
					flex-direction: row; 
					align-items: center;
					justify-content: space-between;
					width: var(--omni-keyboard-closer-width,68px);
					padding-right: var(--omni-keyboard-closer-padding-right,81px);
                    cursor: pointer;
                    box-sizing: border-box;
				}

				.items {
					padding: 0;
					margin: 0;
					list-style: none;
					display: flex;
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
                    width: var(--omni-keyboard-wrapper-width,672px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;

					background: var(--omni-keyboard-background-color,var(--omni-background-color));
				}

                .special-wrapper {
                    width: var(--omni-keyboard-special-wrapper-width,355px);
                }

                .numeric-wrapper {
                    width: var(--omni-keyboard-numeric-wrapper-width,224px);
                }

				.wrapper:first-child {
					margin-top: 0;
				}
				
				.keyrow {
					display: flex; 
					justify-content: center; /* space-between ? */
					margin: var(--omni-keyboard-key-row-margin, 0px 15px);
					width: var(--omni-keyboard-key-row-width,auto);
                    align-items: stretch;
				}

                .pad-top {
                    padding-top: var(--omni-keyboard-row-padding-top, 10px);
                }

                .pad-bottom {
                    padding-bottom: var(--omni-keyboard-row-padding-bottom, 10px);
                }

                .themed-icon {
                    --omni-icon-fill: var(--omni-keyboard-icons-color,var(--omni-primary-color, currentColor));
                }

                .stretch-icon {
                    height: 100%;
                }

                .flex-text-center {                    
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    display: flex;
                }
            
                /* Mobile device styling */
                @media screen and (max-width: 766px) {

                    .topbar{
                        height: var(--omni-keyboard-top-bar-mobile-height, 24px);
                        border-radius: var(--omni-keyboard-top-bar-mobile-border-radius,8px 8px 0px 0px);
                        padding-right: 0px;
                    }

                    :host {
                        --omni-icon-size-medium: 20px;
                    }

                    .wrapper {
                        width: var(--omni-keyboard-wrapper-width,auto);
                        background: var(--omni-keyboard-background-color,var(--omni-background-color));
                    }

                    .keyrow {
                        margin: var(--omni-keyboard-mobile-key-row-margin,8px 36px);
                        width: var(--omni-keyboard-key-row-width,auto);
                        align-items: center;
                    }

                    .pad-top {
                        padding-top: 0px;
                    }

                    .pad-bottom {
                        padding-bottom: 0px;
                    }

                    .special-row {
                        margin: var(--omni-keyboard-mobile-special-key-row-margin,8px 59px);
                    }

                    .shadow {
                        width:100%
                    }

                   .action-button {
                        height: var(--omni-keyboard-mobile-action-button-height, 28px);
                        margin: var(--omni-keyboard-mobile-action-button-margin, 2px);
                        max-width: var(--omni-keyboard-mobile-action-button-max-width, 60px);
                        
                   }

                   .close-icon {
                        width: var(--omni-keyboard-mobile-close-icon-width, 24px);
                   }

                   .closeButton {
                        font-size: var(--omni-keyboard-close-button-font-size,16px);
                    }
                
                }

                /* Small mobile device */
                @media screen and (max-width: 355px) {

                    :host {
                        --omni-icon-size-medium: 20px;
                    }
                    
                    .keyrow {
                        margin: var(--omni-keyboard-mobile-small-key-row-margin,8px 9px);
                    }

                    .special-row {
                        margin: var(--omni-keyboard-mobile-small-key-row-margin,8px 17px);
                    }

                    .action-button {
                        font-size: x-small;
                        height: var(--omni-keyboard-mobile-small-action-button-height, 20px);
                        max-width: var(--omni-keyboard-mobile-small-action-button-max-width, 36px);
                        --omni-icon-size-medium: 15px;
                    }

                    .topbar > omni-label {
                        --omni-label-default-font-size: x-small;
                    }
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
								<omni-keyboard-button class="fill-space" @keyboard-click="${this._toggleCase}" mode="action"
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
								<omni-keyboard-button class="fill-space" @keyboard-click="${
                                    this._keypress
                                }" mode="action" character="backspace" case="custom">                                    
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
								<omni-keyboard-button class="fill-space" @keyboard-click="${this._keypress}" mode="space" label="${this.spaceLabel}"
									character=" " case="custom"></omni-keyboard-button>
								${this.renderClear()}
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
						<div class="wrapper special-wrapper">
							<div>
								<div>
									<div class="keyrow pad-top special-row" >
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
									<div class="keyrow special-row">
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
									<div class="keyrow special-row">
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
									<div class="keyrow special-row">
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
									<div class="keyrow pad-bottom special-row">
										${
                                            this.mode === 'alpha-numeric'
                                                ? html`<omni-keyboard-button
											@keyboard-click="${this._toggleState}" mode="numeric" label="abc" case="custom">
										</omni-keyboard-button>`
                                                : nothing
                                        }
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="@">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label=".">
										</omni-keyboard-button>
										${this.renderClear('numeric')}
                                        ${this.renderCallToAction({
                                            'action-fill': true
                                        })}
									</div>
								</div>
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
						<div class="wrapper numeric-wrapper">
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
									<div class="keyrow">
										${this.renderClear('numeric')}
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" label="0">
										</omni-keyboard-button>
										<omni-keyboard-button @keyboard-click="${this._keypress}" mode="numeric" character="backspace" case="custom">            
                                            <omni-icon size="medium" class="themed-icon">${this.renderBackspace()}</omni-icon>
                                        </omni-keyboard-button>
									</div>
									<div class="keyrow pad-bottom numeric-row">
                                        ${this.renderCallToAction({
                                            'action-fill': true
                                        })}
									</div>
								</div>
							</div>
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
                    <div class="stretch-icon">
                        <slot name="caps-off">
                            <omni-caps-off-icon style="display: unset;"></omni-caps-off-icon>
                        </slot>
                    </div>
                </omni-icon>           
            `
            : this.currentCase === 'upper-single'
            ? html`
                <omni-icon size="medium" class="themed-icon">
                    <div class="stretch-icon">
                        <slot name="caps-on">
                            <omni-caps-on-icon style="display: unset;"></omni-caps-on-icon>
                        </slot>
                    </div>
                </omni-icon>
            `
            : this.currentCase === 'upper'
            ? html`
                <omni-icon size="medium" class="themed-icon">
                    <div class="stretch-icon">
                        <slot name="caps-lock">
                            <omni-caps-lock-icon style="display: unset;"></omni-caps-lock-icon>
                        </slot>
                    </div>
                </omni-icon>
            `
            : nothing;
    }

    renderClose() {
        return html`
        <div class="close-icon">
            <slot name="close">
                <omni-chevron-down-icon style="display: unset;"></omni-chevron-down-icon>
            </slot>
        </div>
        `;
    }

    renderBackspace() {
        return html`
            <div class="stretch-icon">
                <slot name="backspace">
                    <omni-backspace-icon style="display: unset;"></omni-backspace-icon>
                </slot>
            </div>
        `;
    }

    renderClear(mode: 'return' | 'numeric' = 'return') {
        return html`
        <omni-keyboard-button @keyboard-click="${this._keypress}" 
            mode="${mode}" 
            character="clear" 
            case="custom">
            
            <slot name="clear">
                ${this.clearLabel}
            </slot>
        </omni-keyboard-button>
        `;
    }

    renderCallToAction(extraClasses: ClassInfo | undefined = undefined) {
        const enterKeyHint = this.currentEnterKeyHint;
        const classes: ClassInfo = {
            'action-button': true,
            ...extraClasses
        };
        return html`
            <button class="${classMap(classes)}" @click="${() =>
            this._keypress({ detail: { value: 'return' } } as CustomEvent<{ value: string }>)}" mode="action">
                ${
                    enterKeyHint === 'done'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-done">
                                    <omni-check-icon  style="display: unset;"></omni-check-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : enterKeyHint === 'go'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-go">
                                    <omni-arrow-right-icon style="display: unset;"></omni-arrow-right-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : enterKeyHint === 'next'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-next">
                                    <omni-next-icon  style="display: unset;"></omni-next-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : enterKeyHint === 'previous'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-previous">
                                    <omni-previous-icon  style="display: unset;"></omni-previous-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : enterKeyHint === 'search'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-search">
                                    <omni-search-icon  style="display: unset;"></omni-search-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : enterKeyHint === 'send'
                        ? html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon">
                                <slot name="action-send">
                                    <omni-send-icon  style="display: unset;"></omni-send-icon>
                                </slot>
                            </div>
                        </omni-icon>`
                        : html`
                        <omni-icon size="medium" class="action-icon">
                            <div class="stretch-icon flex-text-center">
                                <slot name="action-enter">
                                    ${this.actionLabel}
                                </slot>
                            </div>
                        </omni-icon>`
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
/**
 * Indicates that the Keyboard is to render in specified type of inputmode. Takes precedence over `inputmode` attribute.
 */
export const explicitKeyboardMode = 'data-omni-keyboard-mode';

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

export type KeyboardInit = {
    /**
     * The id to apply to the Keyboard elements.
     */
    id?: string;

    /**
     * The container to append the Keyboard as child. If not provided will append to a new div element on the document body.
     */
    parent?: string | HTMLElement | DocumentFragment | null;

    /**
     * The rule for the Keyboard to attach to inputs for showing on component focus.
     * * `all` - The Keyboard will show on focus for all input related components unless opted out with `data-omni-keyboard-hidden` on the component.
     * * `attribute` - The Keyboard will only show on focus for input related components with the `data-omni-keyboard-attach` attribute.
     */
    attachMode?: 'all' | 'attribute' | 'id';

    /**
     * The text label to display by the close button.
     */
    closeLabel?: string;

    /**
     * The text label to display on the spacebar button.
     */
    spaceLabel?: string;

    /**
     * The text label to display on the clear button. The `clear` slot takes precedence over this label.
     */
    clearLabel?: string;

    /**
     * The text label to display on the call to action button when `enterkeyhint` is not defined or `enterkeyhint="enter"`. The `action-enter` slot takes precedence over this label.
     */
    actionLabel?: string;

    /**
     * A function that returns content to render within the 'clear' slot
     */
    clear?: RenderFunction;

    /**
     * A function that returns content to render within the 'caps-off' slot
     */
    capsOff?: RenderFunction;

    /**
     * A function that returns content to render within the 'caps-on' slot
     */
    capsOn?: RenderFunction;

    /**
     * A function that returns content to render within the 'caps-lock' slot
     */
    capsLock?: RenderFunction;

    /**
     * A function that returns content to render within the 'backspace' slot
     */
    backspace?: RenderFunction;

    /**
     * A function that returns content to render within the 'close' slot
     */
    close?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-enter' slot
     */
    actionEnter?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-done' slot
     */
    actionDone?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-go' slot
     */
    actionGo?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-next' slot
     */
    actionNext?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-previous' slot
     */
    actionPrevious?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-search' slot
     */
    actionSearch?: RenderFunction;

    /**
     * A function that returns content to render within the 'action-send' slot
     */
    actionSend?: RenderFunction;
};

declare global {
    interface HTMLElementTagNameMap {
        'omni-keyboard': Keyboard;
    }
}
