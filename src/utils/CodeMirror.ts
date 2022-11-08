import { indentWithTab } from '@codemirror/commands';
import { Extension, EditorState, Compartment } from '@codemirror/state';
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
    @property({ type: Boolean, reflect: true }) disabled: boolean;
    @property({ type: Boolean, attribute: 'no-tab', reflect: true }) noTab: boolean;

    @query('.code-parent') codeParent: HTMLDivElement;
    @query('slot') slotElement: HTMLSlotElement;

    private editor: EditorView;
    private readonlyOrDisabled = new Compartment();

    static override get styles() {
        return [
            css`
                ::slotted(*) {
                    display: none;
                }

                :host[disabled] {
                    pointer-events: none;
                }
            `
        ];
    }

    public async refresh(getCode: () => string | Promise<string> = undefined) {
        if (getCode) {
            this.code = await getCode();
        }
        if (!this.disabled && this.editor && (this.code || this.slotElement.assignedNodes().length > 0)) {
            const source = this.code
                ? await this.transformSource(await this.code)
                : await this.transformSource(this._readCode(this.slotElement));
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: source
                }
            });
        }
    }

    protected override render() {
        return html`
            <div class="code-parent"> </div>
            <slot @slotchange="${() => this._slotChanged()}"></slot>
        `;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override async updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): Promise<void> {
        if (!this.editor && this.codeParent && (this.code || this.slotElement.assignedNodes().length > 0)) {
            let source = this.code
                ? await this.transformSource(await this.code)
                : await this.transformSource(this._readCode(this.slotElement));
            this._clearElements(this.codeParent);
            this.editor = new EditorView({
                doc: source,
                extensions: [
                    basicSetup,
                    await this.extensions(),
                    this.readonlyOrDisabled.of([
                        EditorState.readOnly.of(this.readOnly || this.disabled),
                        EditorView.editable.of(!this.readOnly && !this.disabled)
                    ]),
                    keymap.of(this.noTab ? [] : [indentWithTab]),
                    EditorView.updateListener.of(async (update) => {
                        if (update.docChanged) {
                            const oldSource = source;
                            source = this.editor.state.doc.toString();
                            this.code = source;

                            this.requestUpdate();

                            await this.updateComplete;

                            if (!this.disabled) {
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
                            }
                        } else if (!this.disabled) {
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

            if (!this.disabled) {
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
        // else if (
        //     !this.disabled &&
        //     _changedProperties.get('code') &&
        //     this.editor &&
        //     (this.code || this.slotElement.assignedNodes().length > 0)
        // ) {
        //     const source = this.code
        //         ? await this.transformSource(await this.code)
        //         : await this.transformSource(this._readCode(this.slotElement));
        //     if (
        //         source.replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '') !==
        //         this.editor.state.doc.toString().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
        //     ) {
        //         this.editor.dispatch({
        //             changes: {
        //                 from: 0,
        //                 to: this.editor.state.doc.length,
        //                 insert: source
        //             }
        //         });
        //     }
        // }
        //  else if (_changedProperties.has('disabled') && this.editor) {
        //     this.editor.dispatch({
        //         effects: [
        //             this.readonlyOrDisabled.reconfigure([
        //                 EditorState.readOnly.of(this.readOnly || this.disabled),
        //                 EditorView.editable.of(!this.readOnly && !this.disabled)
        //             ])
        //         ]
        //     });
        // }
    }

    private async _slotChanged() {
        if (!this.editor) {
            return;
        }

        const source = this.code
            ? await this.transformSource(await this.code)
            : await this.transformSource(this._readCode(this.slotElement));
        if (!this.disabled && source !== this.editor.state.doc.toString()) {
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: source
                }
            });
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
};

export type CodeMirrorUpdateEvent = CodeMirrorEditorEvent & {
    update: ViewUpdate;
};

export type CodeMirrorSourceUpdateEvent = CodeMirrorUpdateEvent & {
    oldSource: string;
};
