import { within, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Button } from '../button/Button.js';
import { RenderElement } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit, querySelectorAsync, raw } from '../utils/StoryUtils.js';
import { Modal } from './Modal.js';

import './Modal.js';
import '../button/Button.js';

export default {
    title: 'UI Components/Modal',
    component: 'omni-modal'
} as CSFIdentifier;

interface Args {
    headerLabel: string;
    headerAlign: 'left' | 'center' | 'right';
    header: string;
    '[Default Slot]': string;
    footer: string;
    hide?: boolean;
    noHeader?: boolean;
    noFooter?: boolean;
    noFullscreen?: boolean;
}

const modalHtml = (args: Args) => html`
        <omni-modal
            @click-outside="${() => {
                args.hide = true;
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }}"
            data-testid="test-modal"
            ?hide="${args.hide}"
            ?no-fullscreen="${args.noFullscreen}"
            header-label="${ifNotEmpty(args.headerLabel)}"
            header-align="${ifNotEmpty(args.headerAlign)}"
            ?no-header="${args.noHeader}"
            ?no-footer="${args.noFooter}">${args.header ? html`${'\r\n'}${unsafeHTML(assignToSlot('header', args.header))}` : nothing}${
    args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing
}${args.footer ? html`${'\r\n'}${unsafeHTML(assignToSlot('footer', args.footer))}` : nothing}
        </omni-modal>
`;
export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'Interactive',
    args: {
        header: raw`<strong>Header Content</strong>`,
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        footer: raw`<span>Footer Content</span>`,
        hide: true,
        headerAlign: 'left',
        headerLabel: 'Header Label',
        noFullscreen: false,
        noHeader: false,
        noFooter: false
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const Header_Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'Header Label',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        headerLabel: 'Header Label'
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const Header_Align: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'Header Align',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        headerLabel: 'Header Aligned',
        headerAlign: 'center'
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const Header_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'Header Slot',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        header: raw`<span>Header <strong>Slot</strong></span>`
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const No_Header: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
       <omni-button data-testid="test-modal-btn" @click="${() => {
           args.hide = false;
           document.dispatchEvent(
               new CustomEvent('story-renderer-interactive-update', {
                   bubbles: true,
                   composed: true
               })
           );
       }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'No Header',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        noHeader: true
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const Footer_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'Footer Slot',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        footer: raw`<span>Footer <strong>Slot</strong></span>`
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

export const No_Footer: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-modal-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Modal" ></omni-button>
        ${modalHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args))}
            <script>
                const modal = document.querySelector('omni-modal');
                modal.hide = false;
                modal.addEventListener('click-outside', (e) => {
                    modal.hide = true;
                });
            </script>
            `
        }
    ],
    name: 'No Footer',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        noFooter: true
    },
    play: async (context) => {
        let modal = within(context.canvasElement).getByTestId<Modal>('test-modal');
        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(context.canvasElement, '[data-testid="test-modal"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};

const footer = document.createElement('div');
footer.textContent = 'The footer';
footer.style.color = 'orange';
let modal: Modal | undefined = undefined;
export const Scripted_Modal: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
                    <omni-button data-testid="test-modal-btn" @click="${() => {
                        args.hide = false;
                        if (modal) {
                            modal.hide = false;
                        } else {
                            modal = Modal.show({
                                body: () =>
                                    raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
                                footer: footer,
                                header: args.header,
                                headerAlign: args.headerAlign,
                                id: 'some-id'
                            });
                            if (modal) {
                                modal.setAttribute('data-testid', 'test-modal-scripted');
                                modal.addEventListener('click-outside', () => {
                                    modal!.hide = true;
                                    args.hide = true;

                                    document.dispatchEvent(
                                        new CustomEvent('story-renderer-interactive-update', {
                                            bubbles: true,
                                            composed: true
                                        })
                                    );
                                });
                            }
                        }

                        document.dispatchEvent(
                            new CustomEvent('story-renderer-interactive-update', {
                                bubbles: true,
                                composed: true
                            })
                        );
                    }}" label="Show Modal" ></omni-button>
     `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => raw`
                <script type="module">                        
                        import { Modal } from '@capitec/omni-components/modal';

                        const footer = document.createElement('div');
                        footer.textContent = 'The footer';
                        footer.style.color = 'orange';

                        const modal = Modal.show({
                            body: () => '<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>',
                            footer: footer,
                            header: 'Header Content',
                            headerAlign: 'right',
                            id: 'some-id'
                        });
                        if (modal) {
                            modal.addEventListener('click-outside', () => {
                                modal.hide = true;
                            });
                        }
                </script>
            `
        }
    ],
    name: 'Scripted Modal',
    args: {
        hide: true,
        header: 'Header Content',
        headerAlign: 'right'
    },
    play: async (context) => {
        let modal = document.querySelector('[data-testid="test-modal-scripted"]') as Modal;

        await expect(modal && !modal.hide).toBeFalsy();

        const btn = within(context.canvasElement).getByTestId<Button>('test-modal-btn');
        btn.click();

        modal = (await querySelectorAsync(document, '[data-testid="test-modal-scripted"]')) as Modal;

        await expect(modal && !modal.hide).toBeTruthy();

        const footerSlot = modal.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
        const footerRenderer = footerSlot.assignedElements().find((e) => (e as RenderElement).renderer) as RenderElement;

        await waitFor(async () => await expect(Array.from(footerRenderer.shadowRoot!.children)).toContain(footer));

        const footerContent = Array.from(footerRenderer.shadowRoot!.children);
        await expect(footerContent.length).toBe(1);

        const headerSlot = modal.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement;
        const headerRenderer = headerSlot.assignedElements().find((e) => (e as RenderElement).renderer) as RenderElement;

        await waitFor(async () => await expect(headerRenderer.shadowRoot!.textContent).toBe(context.args.header));

        await userEvent.click(modal.dialog, {
            pointerEventsCheck: 0
        });

        await expect(modal && !modal.hide).toBeFalsy();
    }
};
