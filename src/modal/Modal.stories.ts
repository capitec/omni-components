import { TemplateResult, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import { Modal } from './Modal.js';

import './Modal.js';
import '../button/Button.js';

interface Args {
    headerLabel: string;
    headerAlign: 'left' | 'center' | 'right';
    header: string;
    '[Default Slot]': string;
    footer: string | ((args: Args) => TemplateResult);
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
}${
    args.footer
        ? typeof args.footer === 'string'
            ? html`${'\r\n'}${unsafeHTML(assignToSlot('footer', args.footer))}`
            : html`${'\r\n'}${args.footer(args)}`
        : nothing
}
        </omni-modal>
`;
const footerSource: string = raw`<div slot="footer">
    <omni-button id="modal-close-btn" label="Close"></omni-button>
    <script defer>
        document.getElementById('modal-close-btn').addEventListener('click', () => {
            document.getElementById('omni-modal').hide = true;
        });
    </script>
</div>`;
const footerTemplate = (args: Args) => html`
<div slot="footer">
    <omni-button id="modal-close-btn" label="Close" @click="${() => {
        args.hide = true;
        document.dispatchEvent(
            new CustomEvent('story-renderer-interactive-update', {
                bubbles: true,
                composed: true
            })
        );
    }}"></omni-button>
</div>`;

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
            ${getSourceFromLit(modalHtml(args), (container) => {
                const modal = container.querySelector('omni-modal');
                if (modal) {
                    modal.removeAttribute('hide');
                }
            })}            
            `
        },
        {
            framework: 'Vue',
            load: (args) => raw`
            ${getSourceFromLit(
                modalHtml(args),
                (container) => {
                    const modal = container.querySelector('omni-modal');
                    if (modal) {
                        modal.removeAttribute('hide');
                    }
                },
                (s) =>
                    s
                        .replace(' hide', ' :hide="true"')
                        .replace(' no-header', ' :no-header="true"')
                        .replace(' no-footer', ' :no-footer="true"')
                        .replace(' no-fullscreen', ' :no-fullscreen="true"')
            )}            
            `
        }
    ],
    name: 'Interactive',
    args: {
        header: raw`<strong style="padding-left: 10px;">Slotted Header Content</strong>`,
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        footer: raw`<span>Footer Content</span>`,
        hide: true,
        headerAlign: 'left',
        headerLabel: 'Header Label',
        noFullscreen: false,
        noHeader: false,
        noFooter: false
    }
};

export const Header_Label: ComponentStoryFormat<Args> = {
    description: 'Set text content to display in the modal header.',
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
            framework: 'Lit',
            load: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="${() => document.getElementById(\'omni-modal\').hide = true}"')
)}
            `
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="closeModal"')
)}`,
                jsFragment: `window.vueData = {
        closeModal: () => document.getElementById("omni-modal").hide = true
};`
            }
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(
                modalHtml({
                    ...args,
                    footer: footerSource
                }),
                (container) => {
                    const modal = container.querySelector('omni-modal');
                    if (modal) {
                        modal.removeAttribute('hide');
                        modal.setAttribute('id', 'omni-modal');
                    }
                }
            )}
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
import { OmniButton } from "@capitec/omni-components-react/button";
            
const App = () => {
    let omniModal = null;
    const setRef = e => {
        omniModal = e;
    }
    return (<OmniModal ref={setRef}${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>        
               <span style={{
                   minWidth: "777px",
                   minHeight: "434px",
                   display: "flex",
                   justifyContent: "center",
                   textAlign: "center",
                   alignItems: "center"
                 }}>Body Content</span>
               <div slot="footer">
                 <OmniButton label="Close" onclick={() => {
                     omniModal.hide = true;
                 }}/>
               </div>
             </OmniModal>);
}`
        }
    ],
    name: 'Header Label',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        headerLabel: 'Header Label',
        footer: footerTemplate
    }
};

export const Header_Align: ComponentStoryFormat<Args> = {
    description: 'Align header content horizontally.',
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="closeModal"')
)}`,
                jsFragment: `window.vueData = {
        closeModal: () => document.getElementById("omni-modal").hide = true
};`
            }
        },
        {
            framework: 'Lit',
            load: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="${() => document.getElementById(\'omni-modal\').hide = true}"')
)}
            `
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(
                modalHtml({
                    ...args,
                    footer: footerSource
                }),
                (container) => {
                    const modal = container.querySelector('omni-modal');
                    if (modal) {
                        modal.removeAttribute('hide');
                        modal.setAttribute('id', 'omni-modal');
                    }
                }
            )}
            
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
import { OmniButton } from "@capitec/omni-components-react/button";
            
const App = () => {
    let omniModal = null;
    const setRef = e => {
        omniModal = e;
    }
    return (<OmniModal ref={setRef}${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>        
                <span style={{
                    minWidth: "777px",
                    minHeight: "434px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center"
                    }}>Body Content</span>
                <div slot="footer">
                    <OmniButton label="Close" onclick={() => {
                        omniModal.hide = true;
                    }}/>
                </div>
            </OmniModal>);
}`
        }
    ],
    name: 'Header Align',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        headerLabel: 'Header Aligned',
        headerAlign: 'center',
        footer: footerTemplate
    }
};

export const Header_Slot: ComponentStoryFormat<Args> = {
    description: 'Set custom html content to display in modal header.',
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="closeModal"')
)}`,
                jsFragment: `window.vueData = {
        closeModal: () => document.getElementById("omni-modal").hide = true
};`
            }
        },
        {
            framework: 'Lit',
            load: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="${() => document.getElementById(\'omni-modal\').hide = true}"')
)}
            `
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(
                modalHtml({
                    ...args,
                    footer: footerSource
                }),
                (container) => {
                    const modal = container.querySelector('omni-modal');
                    if (modal) {
                        modal.removeAttribute('hide');
                        modal.setAttribute('id', 'omni-modal');
                    }
                }
            )}
            
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
import { OmniButton } from "@capitec/omni-components-react/button";
            
const App = () => {
    let omniModal = null;
    const setRef = e => {
        omniModal = e;
    }
    return (<OmniModal ref={setRef}${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>        
                <span slot="header">Header <strong>Slot</strong></span>
                <span style={{
                    minWidth: "777px",
                    minHeight: "434px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center"
                    }}>Body Content</span>
                <div slot="footer">
                    <OmniButton label="Close" onclick={() => {
                        omniModal.hide = true;
                    }}/>
                </div>
            </OmniModal>);
}`
        }
    ],
    name: 'Header Slot',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        header: raw`<span>Header <strong>Slot</strong></span>`,
        footer: footerTemplate
    }
};

export const No_Header: ComponentStoryFormat<Args> = {
    description: 'Remove the header section of the modal.',
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) =>
        s
            .replace('id="modal-close-btn"', '@click="closeModal"')
            .replace(' hide', ' :hide="true"')
            .replace(' no-header', ' :no-header="true"')
            .replace(' no-footer', ' :no-footer="true"')
            .replace(' no-fullscreen', ' :no-fullscreen="true"')
)}`,
                jsFragment: `window.vueData = {
        closeModal: () => document.getElementById("omni-modal").hide = true
};`
            }
        },
        {
            framework: 'Lit',
            load: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) => s.replace('id="modal-close-btn"', '@click="${() => document.getElementById(\'omni-modal\').hide = true}"')
)}
            `
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(
                modalHtml({
                    ...args,
                    footer: footerSource
                }),
                (container) => {
                    const modal = container.querySelector('omni-modal');
                    if (modal) {
                        modal.removeAttribute('hide');
                        modal.setAttribute('id', 'omni-modal');
                    }
                }
            )}
            
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
import { OmniButton } from "@capitec/omni-components-react/button";
            
const App = () => {
    let omniModal = null;
    const setRef = e => {
        omniModal = e;
    }
    return (<OmniModal ref={setRef}${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>        
                <span style={{
                    minWidth: "777px",
                    minHeight: "434px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center"
                    }}>Body Content</span>
                <div slot="footer">
                    <OmniButton label="Close" onclick={() => {
                        omniModal.hide = true;
                    }}/>
                </div>
            </OmniModal>);
}`
        }
    ],
    name: 'No Header',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        noHeader: true,
        footer: footerTemplate
    }
};

export const Footer_Slot: ComponentStoryFormat<Args> = {
    description: 'Set custom html content to display in modal footer.',
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) =>
        s
            .replace('id="modal-close-btn"', '@click="closeModal"')
            .replace(' hide', ' :hide="true"')
            .replace(' no-header', ' :no-header="true"')
            .replace(' no-footer', ' :no-footer="true"')
            .replace(' no-fullscreen', ' :no-fullscreen="true"')
)}`
            }
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args), (container) => {
                const modal = container.querySelector('omni-modal');
                if (modal) {
                    modal.removeAttribute('hide');
                }
            })}
            
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
            
const App = () => <OmniModal${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>
                    <span style={{
                        minWidth: "777px",
                        minHeight: "434px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center"
                      }}>Body Content</span>
                      <span slot="footer">Footer <strong>Slot</strong></span>
                  </OmniModal>;`
        }
    ],
    name: 'Footer Slot',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        footer: raw`<span>Footer <strong>Slot</strong></span>`
    }
};

export const No_Footer: ComponentStoryFormat<Args> = {
    description: 'Remove the footer section of the modal.',
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) => raw`
${getSourceFromLit(
    modalHtml(args),
    (container) => {
        const modal = container.querySelector('omni-modal');
        if (modal) {
            modal.removeAttribute('hide');
            modal.setAttribute('id', 'omni-modal');
        }
    },
    (s) =>
        s
            .replace('id="modal-close-btn"', '@click="closeModal"')
            .replace(' hide', ' :hide="true"')
            .replace(' no-header', ' :no-header="true"')
            .replace(' no-footer', ' :no-footer="true"')
            .replace(' no-fullscreen', ' :no-fullscreen="true"')
)}`
            }
        },
        {
            framework: 'HTML',
            load: (args) => raw`
            ${getSourceFromLit(modalHtml(args), (container) => {
                const modal = container.querySelector('omni-modal');
                if (modal) {
                    modal.removeAttribute('hide');
                }
            })}
            
            `
        },
        {
            framework: 'React',
            load: (args) => `import { OmniModal } from "@capitec/omni-components-react/modal";
            
const App = () => <OmniModal${args.headerLabel ? ` header-label='${args.headerLabel}'` : ''}${
                args.headerAlign ? ` header-align='${args.headerAlign}'` : ''
            }${args.noFooter ? ` no-footer` : ''}${args.noHeader ? ` no-header` : ''}${args.noFullscreen ? ` no-fullscreen` : ''}>
                    <span style={{
                        minWidth: "777px",
                        minHeight: "434px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center"
                      }}>Body Content</span>
                  </OmniModal>;`
        }
    ],
    name: 'No Footer',
    args: {
        '[Default Slot]': raw`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>`,
        hide: true,
        noFooter: true
    }
};

const footer = document.createElement('div');
footer.textContent = 'The footer';
footer.style.color = 'orange';
let modal: Modal | undefined = undefined;
export const Scripted_Modal: ComponentStoryFormat<Args> = {
    description: () => html`Create and show an <code class="language-html">&lt;omni-modal&gt;</code> instance programmatically.`,
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<span>Page Content</span>`,
                jsFragment: `import { Modal } from '@capitec/omni-components/modal';

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
                `
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<span>Page Content</span>`,
                jsFragment: `import { Modal } from '@capitec/omni-components/modal';

const footer = document.createElement('div');
footer.textContent = 'The footer';
footer.style.color = 'orange';

const modal = Modal.show({
    body: () => html\`<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>\`,
    footer: footer,
    header: 'Header Content',
    headerAlign: 'right',
    id: 'some-id'
});
                `
            }
        },
        {
            framework: 'HTML',
            load: () => raw`
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
                </script>
            `
        },
        {
            framework: 'React',
            load: () => `import { Modal } from "@capitec/omni-components-react/modal";

const footerContainer = document.createElement('div');
footerContainer.style.display = 'contents';

const Footer = () => <>
                        <div style={{ color: 'orange' }}>
                            The footer
                        </div>
                     </>;
ReactDOM.render(<Footer/>, footerContainer);

const modal = Modal.show({
    body: () => '<span style="min-width: 777px;min-height: 434px;display: flex;justify-content: center;text-align: center;align-items: center;">Body Content</span>',
    footer: footerContainer,
    header: 'Header Content',
    headerAlign: 'right',
    id: 'some-id'
});
            
const App = () => <>
                    App Content
                  </>;`
        }
    ],
    name: 'Scripted Modal',
    args: {
        hide: true,
        header: 'Header Content',
        headerAlign: 'right'
    }
};
