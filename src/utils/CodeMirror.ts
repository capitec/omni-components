import { indentWithTab } from '@codemirror/commands';
import { Extension, EditorState } from '@codemirror/state';
import { keymap, ViewUpdate } from '@codemirror/view';
import { basicSetup, EditorView } from 'codemirror';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('omni-code-mirror')
export class CodeMirror extends LitElement {
    @property({ type: Object, reflect: false }) extensions: () => Extension | Promise<Extension> = () => [];
    @property({ type: Object, reflect: false }) transformSource: (source: string) => string | Promise<string> = (s) => s;
    @property({ type: String, reflect: true }) code: string | Promise<string>;
    @property({ type: Boolean, attribute: 'read-only', reflect: true }) readOnly: boolean;
    @property({ type: Boolean, attribute: 'no-tab', reflect: true }) noTab: boolean;

    @query('.code-parent') codeParent: HTMLDivElement;
    @query('slot') slotElement: HTMLSlotElement;

    private editor: EditorView;

    static override get styles() {
        return [
            css`
                ::slotted(*) {
                    display: none;
                }
            `
        ];
    }

    protected override render() {
        return html`
            <div class="code-parent"> </div>
            <slot></slot>
        `;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override async updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
        if (!this.editor && this.codeParent && (this.code || this.slotElement.assignedNodes().length > 0)) {
            let source = this.code ? await this.transformSource(await this.code) : await this.transformSource(this._readCode(this.slotElement)); 
            this._clearElements(this.codeParent);
            this.editor = new EditorView({
                doc: source,
                extensions: [
                    basicSetup,
                    await this.extensions(),
                    EditorState.readOnly.of(this.readOnly),
                    EditorView.editable.of(!this.readOnly),
                    keymap.of(this.noTab ? [] : [indentWithTab]),
                    EditorView.updateListener.of(async (update) => {
                        if (update.docChanged) {
                            const oldSource = source;
                            source = this.editor.state.doc.toString();
                            this.code = source;

                            this.requestUpdate();

                            await this.updateComplete;

                            this.dispatchEvent(
                                new CustomEvent('codemirror-update', {
                                    detail: {
                                        update,
                                        editor: this.editor,
                                        source: this.editor.state.doc.toString()
                                    } as CodeMirrorUpdateEvent
                                })
                            );
                            this.dispatchEvent(
                                new CustomEvent('codemirror-source-change', {
                                    detail: {
                                        update,
                                        editor: this.editor,
                                        oldSource: oldSource,
                                        source: source
                                    } as CodeMirrorSourceUpdateEvent
                                })
                            );
                        } else {
                            this.dispatchEvent(
                                new CustomEvent('codemirror-update', {
                                    detail: {
                                        update,
                                        editor: this.editor,
                                        source: this.editor.state.doc.toString()
                                    } as CodeMirrorUpdateEvent
                                })
                            );
                        }
                    })
                ],
                parent: this.codeParent
            });
            this.dispatchEvent(
                new CustomEvent('codemirror-loaded', {
                    detail: {
                        editor: this.editor,
                        source: this.editor.state.doc.toString()
                    } as CodeMirrorEditorEvent
                })
            );
        }
    }

    private _readCode(slotElement: HTMLSlotElement): string {
        const code = slotElement
            .assignedNodes()
            .map((n) => {
                if (n instanceof Element) {
                    const el = n as Element;
                    return el.outerHTML;
                }
                return n.textContent;
            })
            .join('\r\n');
        return code;
    }
    
    private _clearElements(el: Element | ShadowRoot = undefined) {
        if (!el) {
            el = this.renderRoot;
        }
        let child = el.lastElementChild;
        while (child) {
            const curChild = child;
            child = child.previousElementSibling;
            if (!curChild.hasAttribute('slot')) {
                el.removeChild(curChild);
            }
        }
    }
}

export type CodeMirrorEditorEvent = {
    editor: EditorView;
    source: string;
}

export type CodeMirrorUpdateEvent = CodeMirrorEditorEvent & {
    update: ViewUpdate;
}

export type CodeMirrorSourceUpdateEvent = CodeMirrorUpdateEvent & {
    oldSource: string;
}