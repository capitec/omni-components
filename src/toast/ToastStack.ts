import { css, html, render as renderToElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { type Ref, ref, createRef } from 'lit/directives/ref.js';
import { OmniElement } from '../core/OmniElement.js';
import { RenderFunction, RenderResult } from '../render-element/RenderElement.js';
import { Toast } from './Toast.js';

import './Toast.js';
import '../render-element/RenderElement.js';

/**
 * A toast container that animates in and stacks toast elements.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/toast';
 * ```
 *
 * @example
 * ```html
 * <omni-toast-stack position="bottom" reverse>
 *      <omni-toast
 *        type="info"
 *        header="Toast Title"
 *        detail="Short detail Text"
 *        closable>
 *      </omni-toast>
 * </omni-toast-stack>

 * ```
 *
 * @element omni-toast-stack
 *
 * @slot - Toast(s) to be displayed
 * 
 * @fires {CustomEvent<Toast>} toast-remove - Dispatched when the a toast is removed from the stack.
 * @fires {CustomEvent<ToastStack>} toast-stack-remove - Dispatched from a toast when it is removed from the stack.
 * 
 * @global_attribute {number} data-toast-duration - Duration milliseconds that a slotted toast must be shown in the stack before it is removed.
 *
 * @cssprop --omni-toast-stack-z-index - The z-index of the stack.
 * @cssprop --omni-toast-stack-font-color - The font color applied to the stack.
 *
 * @cssprop --omni-toast-stack-anchor-bottom - The position from the bottom toast `position` is set to `bottom`, `bottom-left`, or `bottom-right`.
 * @cssprop --omni-toast-stack-anchor-top - The position from the bottom toast `position` is set to `top`, `top-left`, or `top-right`.
 * @cssprop --omni-toast-stack-anchor-left - The position from the bottom toast `position` is set to `left`, `top-left`, or `bottom-left`.
 * @cssprop --omni-toast-stack-anchor-right - The position from the bottom toast `position` is set to `right`, `top-right`, or `bottom-right`.
 *
 * @cssprop --omni-toast-stack-gap - The vertical gap between toast elements in the stack.
 */
@customElement('omni-toast-stack')
export class ToastStack extends OmniElement {
    /**
     * The position to stack toasts
     * @attr
     */
    @property({ type: String, reflect: true }) position:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right' = 'bottom';

    /**
     * Reverse the order of toast with newest toasts showed on top of the stack. By default newest toasts are showed at the bottom of the stack.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) reverse?: boolean;

    @query('.toast-box') private toastContainer!: HTMLDivElement;
    @query('slot') private slotElement!: HTMLSlotElement;

    private toastCloseClickBound = this.closeToast.bind(this);

    /**
     * Creates a new `<omni-toast-stack>` element with the provided context and appends it to the DOM (either to document body or to provided target parent element).
     * @param init Initialisation context for the element.
     * @returns The {@link ToastStack} instance that was created.
     */
    public static create(init?: ToastStackInit) {
        init = init ?? {};
        if (!init.parent) {
            // If no parent element is specified, the ToastStack will be appended directly on the document body.
            init.parent = document.createElement('div');
            init.parent.style.display = 'contents';
            document.body.appendChild(init.parent);
        }

        if (typeof init.parent === 'string') {
            // If a parent element is specified as a string, find the actual parent element instance using the provided string as an id.
            init.parent = document.getElementById(init.parent);
            if (!init.parent) {
                return undefined;
            }
        }

        const refToStack: Ref<ToastStack> = createRef();
        renderToElement(
            html`        
            <omni-toast-stack
                    ${ref(refToStack)}
                    id="${ifDefined(init.id)}"
                    position="${ifDefined(init.position)}"
                    ?reverse="${init.reverse}">
            </omni-toast-stack>
        `,
            init.parent
        );

        return refToStack.value;
    }

    /**
     * Push a toast message onto the toast stack.
     * @returns The {@link Toast} instance that was created.
     */
    public showToast(init: ShowToastInit) {
        // Create the toast element.
        const toast = document.createElement('omni-toast') as Toast;
        toast.type = init.type;
        toast.header = init.header;
        toast.detail = init.detail;
        toast.closeable = init.closeable;
        if (init.duration) {
            toast.setAttribute(toastDurationAttribute, init.duration.toString());
        }

        // Setup optional renderers for slot(s)
        if (init.prefix) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'prefix';
            renderElement.renderer = typeof init.prefix === 'function' ? init.prefix : () => init.prefix as RenderResult;
            toast.appendChild(renderElement);
        }
        if (init.content) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.renderer = typeof init.content === 'function' ? init.content : () => init.content as RenderResult;
            toast.appendChild(renderElement);
        }
        if (init.close && init.closeable) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'close';
            renderElement.renderer = typeof init.close === 'function' ? init.close : () => init.close as RenderResult;
            toast.appendChild(renderElement);
        }

        return this.showInstance(toast);
    }

    /**
     * Push an existing toast instance onto the toast stack.
     */
    public showInstance(instance: Toast, options?: ShowToastOptions) {
        if (options?.duration) {
            instance.setAttribute(toastDurationAttribute, options.duration.toString());
        }
        if (typeof options?.closeable !== 'undefined') {
            instance.closeable = options.closeable;
        }

        const { matches: motionOK } = window.matchMedia(animationAllowedMedia);

        if (motionOK && document.timeline) {
            // Animate in the toast if the user allows motion.
            this.slideIn(instance);
        } else {
            // Add the toast to the stack without animation.
            this.appendChild(instance);
        }

        return instance;
    }

    private onSlotChange() {
        const closeClickEvent = 'close-click';
        const toastLoadedAttribute = 'data-toast-loaded';

        const { matches: motionOK } = window.matchMedia(animationAllowedMedia);
        const animationsAllowed = motionOK && document.timeline;

        this.slotElement.assignedElements({ flatten: true }).forEach(async (slotted) => {
            // Reset the close listeners so any new elements also have close listeners added now.
            slotted.removeEventListener(closeClickEvent, this.toastCloseClickBound);
            slotted.addEventListener(closeClickEvent, this.toastCloseClickBound);

            if (!slotted.hasAttribute(toastLoadedAttribute)) {
                // Slotted element has not been loaded before, set the loaded attribute so it wont load again after this.
                slotted.setAttribute(toastLoadedAttribute, '');

                // If the slotted element has a duration attribute it needs to be removed after the provided milliseconds.
                if (slotted.hasAttribute(toastDurationAttribute)) {
                    if (!animationsAllowed) {
                        //No animations, just wait for the time to pass.
                        await new Promise((resolve) => setTimeout(resolve, Number(slotted.getAttribute(toastDurationAttribute) ?? '5000')));

                        // Remove the toast from the stack after allocated time.
                        if (slotted.parentElement) {
                            slotted.remove();
                            this.raiseToastRemove(slotted);
                        }
                    } else {
                        // Animations are allowed, animate the fade in and out of the toast for the duration provided.
                        const anim = slotted.animate(
                            [
                                // key frames
                                { offset: 0, opacity: 0 },
                                { offset: 0.1, opacity: 1 },
                                { offset: 0.9, opacity: 1 },
                                { offset: 1, opacity: 0 }
                            ],
                            {
                                // sync options
                                duration: Number(slotted.getAttribute(toastDurationAttribute) ?? '5000'),
                                easing: 'ease'
                            }
                        );

                        await anim.finished;

                        // Remove the toast from the stack once it finishes animation out.
                        if (slotted.parentElement) {
                            slotted.remove();
                            this.raiseToastRemove(slotted);
                        }
                    }
                } else if (animationsAllowed) {
                    // Only animate the toast fading in.
                    slotted.animate(
                        [
                            // key frames
                            { offset: 0, opacity: 0 },
                            { offset: 1, opacity: 1 }
                        ],
                        {
                            // sync options
                            duration: 500,
                            easing: 'ease'
                        }
                    );
                }
            }
        });
    }

    private async closeToast(e: Event) {
        const toast = e.currentTarget as HTMLElement;

        const { matches: motionOK } = window.matchMedia(animationAllowedMedia);

        // Animate the toast fading out if the user allows motion.
        if (motionOK && document.timeline) {
            // Get current opacity to cater for existing fade out of timed toasts.
            const currentOpacity = Number(getComputedStyle(toast).getPropertyValue('opacity'));

            const anim = toast.animate(
                [
                    // key frames
                    { offset: 0, opacity: currentOpacity },
                    { offset: 1, opacity: 0 }
                ],
                {
                    // sync options
                    duration: 200,
                    easing: 'ease'
                }
            );
            await anim.finished;
        }

        if (toast.parentElement) {
            toast.remove();
            this.raiseToastRemove(toast);
        }
    }

    private raiseToastRemove(toast: Element) {
        this.dispatchEvent(
            new CustomEvent<Toast>('toast-remove', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: toast as Toast
            })
        );
        toast?.dispatchEvent(
            new CustomEvent<ToastStack>('toast-stack-remove', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: this
            })
        );
    }

    private async slideIn(toast: Toast) {
        // Using the FLIP animation technique for performance. See more here: https://aerotwist.com/blog/flip-your-animations/

        // Ensure the toast has rendered at least the first update before adding toasts to the container.
        if (!this.toastContainer) {
            await this.updateComplete;
        }

        // FIRST
        const first = this.toastContainer.offsetHeight;

        // add new child to change container size
        this.appendChild(toast);

        // LAST
        const last = this.toastContainer.offsetHeight;

        // INVERT
        const invert = last - first;

        // PLAY
        const animation = this.toastContainer.animate([{ transform: `translateY(${invert}px)` }, { transform: 'translateY(0)' }], {
            duration: 150,
            easing: 'ease-out'
        });

        animation.startTime = document.timeline.currentTime;
    }

    static override get styles() {
        return [
            css`
			:host {
				position: fixed;

				z-index: var(--omni-toast-stack-z-index, 10000);

				gap: 20px;
                color: var(--omni-toast-stack-font-color, var(--omni-font-color));
                
			}

            :host(:not([position])),
            :host([position=bottom]) {
				bottom: var(--omni-toast-stack-anchor-bottom, 20px);
                left: 50%;
                transform: translate(-50%, 0);
            }

            :host([position=top]) {
				top: var(--omni-toast-stack-anchor-top, 20px);
                left: 50%;
                transform: translate(-50%, 0);
            }

            :host([position=left]) {
				left: var(--omni-toast-stack-anchor-left, 20px);
                top: 50%;
                transform: translate(0, -50%);
            }

            :host([position=right]) {
				right: var(--omni-toast-stack-anchor-right, 20px);
                top: 50%;
                transform: translate(0, -50%);
            }

            :host([position=top-left]) {
				top: var(--omni-toast-stack-anchor-top, 20px);
				left: var(--omni-toast-stack-anchor-left, 20px);
            }

            :host([position=top-right]) {
				top: var(--omni-toast-stack-anchor-top, 20px);
				right: var(--omni-toast-stack-anchor-right, 20px);
            }

            :host([position=bottom-left]) {
				bottom: var(--omni-toast-stack-anchor-bottom, 20px);
				left: var(--omni-toast-stack-anchor-left, 20px);
            }
            
            :host([position=bottom-right]) {
				bottom: var(--omni-toast-stack-anchor-bottom, 20px);
				right: var(--omni-toast-stack-anchor-right, 20px);
            }

            .toast-box {
                display: flex;
                flex-direction: column;
            }

            :host([reverse]) .toast-box {
                flex-direction: column-reverse;
            }

            ::slotted(omni-toast),
			omni-toast {
				min-width: unset;
				max-width: unset;

				will-change: opacity;

				margin-top: var(--omni-toast-stack-gap, 10px) !important;
			}
		`
        ];
    }

    override render() {
        return html`
			<div class="toast-box">
                <slot @slotchange="${this.onSlotChange.bind(this)}"></slot>
            </div>
		`;
    }
}

const animationAllowedMedia = '(prefers-reduced-motion: no-preference)';

/**
 * Attribute for the duration milliseconds that a slotted toast must be shown in an `<omni-toast-stack>` before it is removed.
 */
export const toastDurationAttribute = 'data-toast-duration';

/**
 * Context for `ToastStack.create` function to programmatically create a new `<omni-toast-stack>` instance.
 */
export type ToastStackInit = {
    /**
     * The id to apply to the ToastStack element.
     */
    id?: string;

    /**
     * The container to append the ToastStack as child. If not provided will append to a new div element on the document body.
     */
    parent?: string | HTMLElement | DocumentFragment | null;

    /**
     * The position to stack toasts
     */
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /**
     * Reverse the order of toast with newest toasts showed on top of the stack. By default newest toasts are showed at the bottom of the stack.
     */
    reverse?: boolean;
};

/**
 * Context for `showToast` function to programmatically add a new `<omni-toast>` instance to an existing `<omni-toast-stack>`.
 */
export type ShowToastInit = {
    /**
     * The type of toast to display.
     */
    type: 'success' | 'warning' | 'error' | 'info' | 'none';

    /**
     * The toast title.
     */
    header?: string;

    /**
     * The toast description.
     */
    detail?: string;

    /**
     * If true, will display a close button that fires a `close-click` event when clicked and removes the toast from the stack.
     */
    closeable?: boolean;

    /**
     * If provided will be the time in millisecond the toast is displayed before being automatically removed from the stack.
     */
    duration?: number;

    /**
     * Content to render before toast message area.
     */
    prefix?: RenderFunction | RenderResult;

    /**
     * Content to render inside the component message area.
     */
    content?: RenderFunction | RenderResult;

    /**
     * Content to render as the close button when `closeable`.
     */
    close?: RenderFunction | RenderResult;
};

/**
 * Context for `showToast` function to programmatically add an existing `<omni-toast>` instance to an existing `<omni-toast-stack>`.
 */
export type ShowToastOptions = {
    /**
     * If provided will be the time in milliseconds the toast is displayed before being automatically removed from the stack.
     */
    duration?: number;

    /**
     * If true, will display a close button that fires a `close-click` event when clicked and removes the toast from the stack.
     */
    closeable?: boolean;
};

declare global {
    interface HTMLElementTagNameMap {
        'omni-toast-stack': ToastStack;
    }
}
