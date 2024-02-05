/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { indentWithTab } from '@codemirror/commands';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { Extension, EditorState, Compartment } from '@codemirror/state';
import {
    highlightActiveLineGutter,
    highlightSpecialChars,
    dropCursor,
    rectangularSelection,
    highlightActiveLine,
    keymap,
    ViewUpdate
} from '@codemirror/view';
import { EditorView } from 'codemirror';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import '../icon/Icon.js';

/**
 * @ignore
 */
@customElement('code-editor')
export class CodeEditor extends LitElement {
    @property({ type: Object, reflect: false }) extensions: () => Extension | Promise<Extension> = () => [];
    @property({ type: Object, reflect: false }) transformSource: (source: string) => string | Promise<string> = (s) => s;
    @property({ type: String, reflect: true }) code?: string | Promise<string>;
    @property({ type: Boolean, attribute: 'read-only', reflect: true }) readOnly!: boolean;
    @property({ type: Boolean, reflect: true }) disabled!: boolean;
    @property({ type: Boolean, attribute: 'no-tab', reflect: true }) noTab!: boolean;

    @query('.code-parent') codeParent?: HTMLDivElement;
    @query('slot') slotElement?: HTMLSlotElement;

    private editor?: EditorView;
    private readonlyOrDisabled = new Compartment();
    private userExtensions = new Compartment();

    static override get styles() {
        return [
            css`
        ::slotted(*) {
          display: none;
        }

        :host[disabled] {
          pointer-events: none;
        }

       .cm-editor {
          background: var(--code-editor-background-color);
          /*font-size: 16px;
          padding: 12px;
          max-height: var(--code-editor-max-height);
          max-width: var(--code-editor-max-width);
          min-height: var(--code-editor-min-height);
          min-width: var(--code-editor-min-width);*/
        }

        .cm-content {
          white-space: pre-wrap !important;
        }

        .cm-activeLine {
            
        }

        .copy-code-wrap {
          position: absolute;
          bottom: 5px;
          right: 5px;
          z-index: 10;
          cursor: pointer;
        }

        .copy-code {
          height: 16px;
          width: 16px;
          position: relative;
          bottom: 0px;
          right: 0px;
          opacity: 50%;
          border-radius: 50%;
          z-index: 10;
          transition: all 0.2s ease 0s;
          color: white;
          font-size: xx-small;
        }

        .copy-icon {
            font-size: 16px; 
            cursor: pointer; 
            margin-left: 12px;
            opacity: 50%;
        }

        .copy-icon:hover,
        .copy-code:hover {
          opacity: 100%;
        }

        .copy-code-wrap:active .copy-icon,
        .copy-code-wrap:active .copy-code {
          transform: translate(0, 0) scale(0.9);
        }
        
        /*.cm-scroller::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }
        
        .cm-scroller::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: lightgrey;
        }
        
        .cm-scroller::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color:  darkgrey;
        
            border-top: 1px solid transparent;
            border-bottom: 1px solid transparent;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
        
            background-clip: padding-box;
        }*/
      `
        ];
    }

    public async refresh(getCode: () => string | Promise<string> = undefined as never) {
        if (getCode) {
            this.code = await getCode();
        }
        if (!this.disabled && this.editor && (this.code || this.slotElement!.assignedNodes().length > 0)) {
            const source = this.code
                ? await this.transformSource(await this.code)
                : await this.transformSource(this._readCode(this.slotElement as HTMLSlotElement));
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: source
                }
            });
        }
    }

    public async updateExtensions() {
        if (!this.editor) {
            return;
        }

        this.editor.dispatch({
            effects: this.userExtensions.reconfigure([
                // basicSetup from CodeMirror without some unwanted extensions
                this.readOnly || this.disabled
                    ? []
                    : [
                          highlightActiveLineGutter(),
                          highlightSpecialChars(),
                          history(),
                          dropCursor(),
                          indentOnInput(),
                          bracketMatching(),
                          closeBrackets(),
                          autocompletion(),
                          highlightActiveLine(),
                          keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...completionKeymap])
                      ],
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                rectangularSelection(),
                highlightSelectionMatches(),
                await this.extensions()
            ])
        });
    }

    protected override render() {
        return html`
      <div style="position: relative">
        <!-- button to copy the editor -->
        <div class="copy-code-wrap" @click="${() => this._copyCode()}">
          <omni-icon class="copy-icon" icon="@material/content_copy" size="${'custom'}"></omni-icon>
        </div>
        <!-- CodeMirror Editor parent element -->
        <div class="code-parent"> </div>
      </div>
      <slot @slotchange="${() => this._slotChanged()}"></slot>
    `;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override async updated(): Promise<void> {
        if (!this.editor && this.codeParent && (this.code || this.slotElement!.assignedNodes().length > 0)) {
            let source = this.code
                ? await this.transformSource(await this.code)
                : await this.transformSource(this._readCode(this.slotElement as HTMLSlotElement));
            this._clearElements(this.codeParent);
            this.editor = new EditorView({
                doc: source,
                extensions: [
                    this.userExtensions.of([
                        // basicSetup from CodeMirror without some unwanted extensions
                        this.readOnly || this.disabled
                            ? []
                            : [
                                  highlightActiveLineGutter(),
                                  highlightSpecialChars(),
                                  history(),
                                  dropCursor(),
                                  indentOnInput(),
                                  bracketMatching(),
                                  closeBrackets(),
                                  autocompletion(),
                                  highlightActiveLine(),
                                  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...completionKeymap])
                              ],
                        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                        rectangularSelection(),
                        highlightSelectionMatches(),
                        await this.extensions()
                    ]),
                    this.readonlyOrDisabled.of([
                        EditorState.readOnly.of(this.readOnly || this.disabled),
                        EditorView.editable.of(!this.readOnly && !this.disabled)
                    ]),
                    keymap.of(this.noTab ? [] : [indentWithTab]),
                    EditorView.updateListener.of(async (update) => {
                        if (update.docChanged) {
                            const oldSource = source;
                            source = this.editor!.state.doc.toString();
                            this.code = source;

                            this.requestUpdate();

                            await this.updateComplete;

                            if (!this.disabled) {
                                this.dispatchEvent(
                                    new CustomEvent('codemirror-update', {
                                        detail: {
                                            update,
                                            editor: this.editor,
                                            source: this.editor!.state.doc.toString()
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
                                        source: this.editor!.state.doc.toString()
                                    } as CodeMirrorUpdateEvent
                                })
                            );
                        }
                    })
                ],
                parent: this.codeParent
            });

            this._clearOtherElements(this.codeParent, this.editor.dom);
            this.editor.dom?.part?.add('editor');
            this.editor.scrollDOM?.part?.add('editor-scroller');
            this.editor.contentDOM?.part?.add('editor-content');

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
    }

    private async _copyCode() {
        this._copyTextToClipboard(await this.code!);
    }

    private _fallbackCopyTextToClipboard(text: string) {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error(err);
        }

        document.body.removeChild(textArea);
    }

    private _copyTextToClipboard(text: string) {
        if (!navigator.clipboard) {
            this._fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(undefined, (err) => {
            console.error('Attempting fallback, could not copy text: ', err);
            this._fallbackCopyTextToClipboard(text);
        });
    }

    private async _slotChanged() {
        if (!this.editor) {
            return;
        }

        const source = this.code
            ? await this.transformSource(await this.code)
            : await this.transformSource(this._readCode(this.slotElement as HTMLSlotElement));
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

    private _clearElements(el: Element | DocumentFragment = undefined as never) {
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

    private _clearOtherElements(el: Element | DocumentFragment = undefined as never, onlyChild: Element) {
        if (!el) {
            el = this.renderRoot;
        }

        if (!onlyChild || !el.contains(onlyChild)) {
            this._clearElements(el);
            return;
        }

        const childCount = el.children.length;
        if (childCount > 1) {
            for (let index = childCount - 1; index >= 0; index--) {
                const child = el.children[index];
                if (!child.hasAttribute('slot') && child !== onlyChild) {
                    el.removeChild(child);
                }
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

declare global {
    interface HTMLElementTagNameMap {
        'code-editor': CodeEditor;
    }
}
