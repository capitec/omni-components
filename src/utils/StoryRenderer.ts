import { indentWithTab } from '@codemirror/commands';
import { html as langHtml } from '@codemirror/lang-html';
import { keymap } from '@codemirror/view';
import { githubDark } from '@ddietr/codemirror-themes/github-dark.js';
import { basicSetup, EditorView } from 'codemirror';
import { html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import pretty from 'pretty';
import { asRenderString } from '../utils/StoryUtils';
import { StoryController } from './StoryController';
// import "prismjs";
// import Prism from "prismjs";

// import 'prismjs/components/prism-javascript.js' // Language
// import 'prismjs/themes/prism-twilight.css' // Theme

@customElement('story-renderer')
export class StoryRenderer extends LitElement {
  @property({ type: String, attribute: 'story-path', reflect: true })
      storyPath: string;

  @query('.interactive-code')
      interactiveCode: HTMLDivElement;
  @query('.interactive-story')
      interactiveStory: HTMLDivElement;

  editor: EditorView;
  interactiveSrc: string;
  overrideInteractive: boolean;

  controller: StoryController;

  override connectedCallback() {
      super.connectedCallback();
      this.controller = new StoryController(this, this.storyPath);
  }

  protected override render() {
      if (!this.controller.story) {
          return html`<div>Loading...</div>`;
      }

      const res = this.controller.story.Interactive.render(
          this.controller.story.Interactive.args
      );
      if (!this.interactiveSrc) {
          this.interactiveSrc = this._transformSource(asRenderString(res.strings || [], res.values || []));
      }
      const srcP = this.interactiveSrc;  
      //   Prism.highlight(
      //       this.interactiveSrc,
      //       Prism.languages.html,
      //       'html'
      //   );

      // console.log(src);
      // console.log(srcP);

      return html`
      <div class="interactive-story Interactive" .data=${this.controller.story.Interactive}>
        ${this.overrideInteractive
          ? unsafeHTML(this.interactiveSrc)
          : this.renderInteractiveStory()}
      </div>
      <button  @click="${() => this._play(this.controller.story.Interactive, '.Interactive')}" >Play</button>
      <div class="Interactive-result"></div>
      <div class="interactive-code">
        <pre class="language-html"><code>${unsafeHTML(srcP)}</code></pre>
      </div>
      ${this.renderOtherStories()}
    `;
  }
  private async _play(story: any, canvasElementQuery: string) {
      try {
          if (!story.play) {
              return;
          }
          const context = this._createStoryContext(story, canvasElementQuery);
          await story.play(context);
          this.querySelector<HTMLDivElement>(canvasElementQuery + '-result').innerText = 'Passed';
      } catch (error) {
          this.querySelector<HTMLDivElement>(canvasElementQuery + '-result').innerText = error.toString();
      }
  }

  private _createStoryContext(story: any, canvasElementQuery: string): any {
      return {
          story: story,
          args: story.args,
          canvasElement: this.querySelector(canvasElementQuery)
      };
  }

  renderInteractiveStory() {
      return this.controller.story.Interactive.render(
          this.controller.story.Interactive.args
      );
  }

  renderOtherStories() {
      const exports = Object.keys(this.controller.story).filter((item) => {
          if (item === 'default' || item === 'Interactive') {
              return false;
          }
          return true;
      });

      return html`
      ${exports.map((key) => {
        const res = this.controller.story[key].render(
          this.controller.story[key].args
        );
        const src = this._transformSource( asRenderString(res.strings || [], res.values || []));
        const srcP = src; // Prism.highlight(src, Prism.languages.html, 'html');

        return html`
          <div class="${key}" .data=${this.controller.story[key]}>
            ${this.controller.story[key].render(
              this.controller.story[key].args
            )}
          </div>
          <button  @click="${() => this._play(this.controller.story[key], `.${key}`)}" >Play</button>
          <div class="${key+'-result'}"></div>
          <div>
            <pre class="language-html"><code>${unsafeHTML(srcP)}</code></pre>
          </div>
        `;
      })}
    `;
  }

  protected override updated(
      _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
      if (!this.editor && this.interactiveCode && this.interactiveStory) {
      // const source = (this.interactiveCode.firstElementChild as HTMLDivElement).innerText;
      // const source = this.interactiveSrc;
          const source = this._transformSource(this.interactiveStory.innerHTML);//this.interactiveSrc;
          this._clearElements(this.interactiveCode);
          this.editor = new EditorView({
              doc: source,
              extensions: [
                  basicSetup,
                  langHtml(),
                  githubDark,
                  keymap.of([indentWithTab]),
                  EditorView.updateListener.of(update => {
                      if (update.docChanged) {
                          this.interactiveSrc = this.editor.state.doc.toString();
                          this.overrideInteractive = true;

                          this.requestUpdate();
                      }
                  })
              ],
              parent: this.interactiveCode,
          });
      }
  }

  protected override createRenderRoot(): Element | ShadowRoot {
      return this;
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

  private _transformSource(input: string) {
      // Remove test ids from displayed source
      input = input
          .replace(/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g, '')
          .replace(new RegExp('data-testid=("([^"]|"")*")'), '')
      // Update any object references to curly braces for easier reading
          .replaceAll('[object Object]', '{}')
      // Remove empty string assignments to fix boolean attributes
          .replaceAll('=""', '');
      // Remove any properties with empty string assignments at the end of the html tag
      // 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")>"), " >")
      // Remove any properties with empty string assignments within the tag
      // 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")"), " ");
      return pretty(input);
  }
}
