/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CompletionSource, Completion } from '@codemirror/autocomplete';
import { css as cssSupport, cssCompletionSource, cssLanguage } from '@codemirror/lang-css';
import { html as langHtml, TagSpec } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxTree, LanguageSupport } from '@codemirror/language';
import { githubDark as codeThemeDark } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { Octokit } from '@octokit/core';
import { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
export { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
import Fuse from 'fuse.js';
import { html, nothing, TemplateResult, svg } from 'lit';
import { render } from 'lit-html';
import { ref } from 'lit-html/directives/ref.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import pretty from 'pretty';
import { Modal } from '../modal/Modal.js';
import { RenderElement } from '../render-element/RenderElement.js';
import { SearchField } from '../search-field/SearchField.js';
import { Select } from '../select/Select.js';
import { CodeEditor, CodeMirrorEditorEvent, CodeMirrorSourceUpdateEvent } from './CodeEditor.js';
export * from './ComponentStoryFormat.js';
export { PlayFunction, PlayFunctionContext } from './PlayFunction.js';
import type { FrameworkOption } from './ComponentStoryFormat.js';
import { StoryRenderer } from './StoryRenderer.js';

import './CodeEditor.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const codeSnippet = '```';
const customThemeCssKey = 'omni-docs-custom-theme-css';
const themeStorageKey = 'omni-docs-theme-selection';
export const frameworkStorageKey = 'omni-docs-framework-selection';
const customThemeKey = 'custom';
const lightThemeKey = 'light';
const darkThemeKey = 'dark';

const versionsStorageKey = 'omni-docs-version-list';
const docsHostedBasePath = 'https://capitec.github.io/open-source/docs/omni-components/';
const latestVersionName = 'latest';

function loadCssProperties(
    element: string,
    customElements: Package,
    cssDeclarations: Record<
        string,
        {
            control: 'color' | 'text';
            description: string;
            category: string;
            subcategory: string;
            value: string;
        }
    > = undefined as any
) {
    if (!cssDeclarations) {
        cssDeclarations = {};
    }

    const elementModule = JSON.parse(
        JSON.stringify(customElements.modules.find((module) => module.exports?.find((e: { name: string }) => e.name === element)))
    );

    let superModule = elementModule;

    do {
        if (superModule.declarations.find((sd: any) => sd.superclass)) {
            superModule = customElements.modules.find((module) =>
                module.exports?.find(
                    (e) =>
                        e.name ===
                        (superModule.declarations?.find((sd: Declaration) => (sd as ClassDeclaration).superclass) as ClassDeclaration)?.superclass
                            ?.name
                )
            );
        } else {
            superModule = undefined;
        }
        if (superModule) {
            elementModule.declarations = [...superModule.declarations, ...elementModule.declarations];
        }
    } while (superModule);
    for (const key in elementModule.declarations) {
        const declaration = elementModule.declarations[key] as CustomElementDeclaration &
            CustomElement & {
                cssCategory: string;
            };
        const cssCategory = declaration.cssCategory;
        if (declaration.cssProperties && declaration.cssProperties.length > 0) {
            for (const cssKey in declaration.cssProperties) {
                const cssProperty = declaration.cssProperties[cssKey];
                if (!cssDeclarations[cssProperty.name.replace('--', '')]) {
                    cssDeclarations[cssProperty.name.replace('--', '')] = {
                        control:
                            cssProperty.name.endsWith('color') || cssProperty.name.endsWith('colour') || cssProperty.name.endsWith('fill')
                                ? 'color'
                                : 'text',
                        description: cssProperty.description as string,
                        category: 'CSS Variables',
                        subcategory: cssCategory ?? 'Component Variables',
                        value: ''
                    };
                } else {
                    cssDeclarations[cssProperty.name.replace('--', '')].subcategory = 'Component Variables';
                }
            }
        }
    }

    return cssDeclarations;
}

// function loadThemeVariablesRemote() {
//     const themeVariables = loadCssPropertiesRemote('OmniElement');
//     return themeVariables;
// }

// function loadCssPropertiesRemote(element: string, cssDeclarations: any = undefined): any {
//     if (!cssDeclarations) {
//         cssDeclarations = {};
//     }

//     let error = undefined;
//     let output = '';
//     const request = new XMLHttpRequest();
//     request.open('GET', 'custom-elements.json', false); // `false` makes the request synchronous
//     request.onload = () => {
//         output = request.responseText;
//     };
//     request.onerror = () => {
//         error = request.status;
//     };
//     request.send(null);

//     if (error) {
//         return cssDeclarations;
//     }

//     const customElements = JSON.parse(output);

//     cssDeclarations = loadCssProperties(element, customElements, cssDeclarations);

//     // console.log(element, cssDeclarations);
//     return cssDeclarations;
// }

// function loadCustomElementsRemote(): any {
//     let error = undefined;
//     let output = '';
//     const request = new XMLHttpRequest();
//     request.open('GET', 'custom-elements.json', false); // `false` makes the request synchronous
//     request.onload = () => {
//         output = request.responseText;
//     };
//     request.onerror = () => {
//         error = `${request.status} - ${request.statusText}`;
//     };
//     request.send(null);

//     if (error) {
//         throw new Error(error);
//     }

//     const customElements = JSON.parse(output);

//     return customElements;
// }

function loadCustomElementsModuleByFileFor(moduleName: string, customElements: Package) {
    return customElements.modules.find((module: any) => module.path.endsWith(`${moduleName}.ts`));
}

function loadCustomElementsModuleFor(elementName: string, customElements: Package) {
    return customElements.modules.find((module: any) =>
        module.declarations.find((d: any) => (d.tagName === elementName && d.customElement) || d.name === elementName)
    );
}

// function loadCustomElementsModuleForRemote(elementName: string) {
//     const customElements = loadCustomElementsRemote();
//     return loadCustomElementsModuleFor(elementName, customElements);
// }

function loadSlotFor(elementName: string, slotName: string, customElements: Package) {
    const module = loadCustomElementsModuleFor(elementName, customElements);
    return loadSlotForModule(module, slotName);
}

// function loadSlotForRemote(elementName: string, slotName: string) {
//     const module = loadCustomElementsModuleForRemote(elementName);
//     return loadSlotForModule(module, slotName);
// }

function loadSlotForModule(elementModule: any, slotName: string): { name: string; description: string } {
    const declaration = elementModule.declarations.find((d: any) => d.slots && d.slots.length > 0 && d.slots.find((s: any) => s.name === slotName));
    if (declaration) {
        const slot = declaration.slots.find((s: any) => s.name === slotName);
        if (slot) {
            return {
                name: slot.name,
                description: formatMarkdownCodeElements(filterJsDocLinks(slot.description))
            };
        }
    }
    return undefined as any;
}

function loadDefaultSlotFor(elementName: string, customElements: Package) {
    const module = loadCustomElementsModuleFor(elementName, customElements);
    return loadDefaultSlotForModule(module);
}

// function loadDefaultSlotForRemote(elementName: string) {
//     const module = loadCustomElementsModuleForRemote(elementName);
//     return loadDefaultSlotForModule(module);
// }

function loadDefaultSlotForModule(elementModule: any) {
    return loadSlotForModule(elementModule, '');
}

function assignToSlot(slotName: string, rawHtml: string) {
    if (!rawHtml || !slotName) return rawHtml;

    const parser = new DOMParser();

    const doc = parser.parseFromString(`<main>${rawHtml}</main>`, 'text/xml');
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
        // parsing failed
        return rawHtml;
    }

    // parsing succeeded
    const serializer = new XMLSerializer();
    let newHtml = '';

    for (let index = 0; index < doc.documentElement.childElementCount; index++) {
        const element = doc.documentElement.children[index];
        element.removeAttribute('slot');
        element.setAttribute('slot', slotName);
        if (newHtml) {
            newHtml += '\r\n';
        }
        newHtml += serializer.serializeToString(element);
    }

    rawHtml = newHtml;

    return rawHtml;
}

function markdownCode(code: string, lang: string = '') {
    const md = `

\`\`\`{lang}

{code}

\`\`\`

  `
        .replace('{lang}', lang)
        .replace('{code}', code);

    return md;
}

// function markdownCodeRemote(src: string, lang: string = '') {
//     let error = undefined;
//     let output = '';
//     const request = new XMLHttpRequest();
//     request.open('GET', src, false); // `false` makes the request synchronous
//     request.onload = () => {
//         output = request.responseText;
//     };
//     request.onerror = () => {
//         error = `${request.status} - ${request.statusText}`;
//     };
//     request.send(null);

//     if (error) {
//         throw new Error(error);
//     }

//     return markdownCode(output, lang);
// }

async function loadFileRemote(src: string) {
    const response = await fetch(src);
    const output = await response.text();

    return output;
}

function formatMarkdownCodeElements(str: string, lang: string = 'js') {
    if (!str) {
        return str;
    }
    return str.replaceAll(`${codeSnippet}`, `\r\n${codeSnippet}`).replaceAll(`${codeSnippet}${lang}`, `${codeSnippet}${lang}\r\n`);
}

function markdownCodeToHtml(str: string, lang: string = 'js') {
    if (!str) {
        return str;
    }
    return str.replaceAll(`${codeSnippet}${lang}`, `<pre><code data-language="${lang}">`).replaceAll(`${codeSnippet}`, `</code></pre>`);
}

function enhanceCodeBlocks(parent: Element) {
    if (!parent) {
        parent = document.body;
    }

    const codeBlocks = parent.querySelectorAll('code');
    codeBlocks.forEach((codeBlock) => {
        let codeLines = codeBlock.innerHTML.split('\n');
        let code = '';
        for (let index = 0; index < codeLines.length; index++) {
            const line = codeLines[index];
            if (code || (line && line !== '\n')) {
                if (!code) {
                    code = line;
                } else {
                    code += `\n${line}`;
                }
            }
        }
        codeLines = code.split('\n');
        code = '';
        for (let index = codeLines.length - 1; index >= 0; index--) {
            const line = codeLines[index];
            if (code || (line && line !== '\n')) {
                if (!code) {
                    code = line;
                } else {
                    code += `\n${line}`;
                }
            }
        }
        const language = codeBlock.attributes.getNamedItem('data-language');
        if (codeBlock.parentElement?.tagName === `pre`) {
            codeBlock = codeBlock.parentElement;
        }
        codeBlock.insertAdjacentHTML('beforebegin', '<div></div>');
        const codeContainer = codeBlock.previousSibling as HTMLElement;

        render(
            html` <code-editor
        .extensions="${() => [
            currentCodeTheme(),
            language && (language.value === 'js' || language.value === 'javascript') ? javascript() : langHtml()
        ]}"
        .code="${code}"
        read-only>
      </code-editor>`,
            codeContainer
        );
        codeBlock.parentElement?.removeChild(codeBlock);
    });
}

let _completions: {
    /**
    Add additional tags that can be completed.
    */
    extraTags?: Record<string, TagSpec>;
    /**
    Add additional completable attributes to all tags.
    */
    extraGlobalAttributes?: Record<string, null | readonly string[]>;
} = null as any;
function loadCustomElementsCodeMirrorCompletions(customElements: Package) {
    if (!_completions) {
        const extraTags: Record<string, TagSpec> = {};
        const extraGlobalAttributes: Record<string, null | string[]> = {};

        customElements.modules.forEach((module) => {
            const elementExport = module.exports?.find((e) => e.kind === 'custom-element-definition');
            if (elementExport) {
                module.declarations?.forEach((d) => {
                    const declaration = d as CustomElement;
                    if (declaration.slots) {
                        declaration.slots.forEach((slot) => {
                            if (slot.name && slot.name !== '[Default Slot]') {
                                if (!extraGlobalAttributes.slot) {
                                    extraGlobalAttributes.slot = [];
                                }
                                if (!extraGlobalAttributes.slot.includes(slot.name)) {
                                    extraGlobalAttributes.slot.push(slot.name);
                                }
                            }
                        });
                    }

                    if (declaration.tagName) {
                        const attrs: Record<string, string[]> = {};
                        if (declaration.attributes) {
                            declaration.attributes.forEach((attribute) => {
                                let attrValues: string[] = null as any;
                                if (
                                    attribute.type?.text !== 'string' &&
                                    attribute.type?.text !== 'boolean' &&
                                    !attribute.type?.text.includes('Promise')
                                ) {
                                    const types = attribute.type?.text.split(' | ');
                                    attrValues = [];
                                    for (const type in types) {
                                        const typeValue = types[type as any];
                                        attrValues.push(typeValue.substring(1, typeValue.length - 1));
                                    }
                                }
                                attrs[attribute.name] = attrValues;
                            });
                        }

                        if (!extraTags[declaration.tagName] && declaration.tagName.startsWith('omni-')) {
                            extraTags[declaration.tagName] = {
                                attrs: attrs
                            };
                        }
                    }
                });
            }
        });

        _completions = {
            extraTags: extraTags,
            extraGlobalAttributes: extraGlobalAttributes
        };
    }
    return _completions;
}

async function loadCustomElementsCodeMirrorCompletionsRemote(path = './custom-elements.json') {
    if (!_completions) {
        const customElements = await loadCustomElements(path);
        return loadCustomElementsCodeMirrorCompletions(customElements);
    }
    return _completions;
}

async function loadCustomElements(path = './custom-elements.json') {
    const response = await fetch(path);
    const customElements = await response.json();
    return customElements as Package;
}

function filterJsDocLinks(jsdoc: string) {
    if (!jsdoc) return jsdoc;

    const renderLink = (link: { tag: string; text: string; url: string; raw: string }) => {
        if (!link.url.includes(':')) {
            // Local markdown links are not valid
            return raw`<code class="language-javascript">'${link.text}'</code>`;
        }
        return raw`<a href="${link.url}" target="_blank" >${link.text}</a>`; //`[${link.text}](${link.url}`;
    };

    const matches = Array.from(jsdoc.matchAll(/(?:\[(.*?)\])?{@(link|tutorial) (.*?)(?:(?:\|| +)(.*?))?}/gm));

    if (!matches) return jsdoc;

    for (const match of matches) {
        const tag = match[2].trim();
        const url = match[3].trim();
        let text = url;

        if (match[4]) {
            text = match[4].trim();
        } else if (match[1]) {
            text = match[1].trim();
        }

        jsdoc = jsdoc.replace(match[0], renderLink({ tag, url, text, raw: match[0] }));
    }

    return jsdoc;
}

function transformFromJsdoc(jsdoc: string) {
    if (!jsdoc) return jsdoc;

    jsdoc = filterJsDocLinks(jsdoc);

    jsdoc = jsdoc.replace(new RegExp(/</, 'g'), raw`&lt;`);
    jsdoc = jsdoc.replace(new RegExp(/>/, 'g'), raw`&gt;`);

    jsdoc = jsdoc.replace(/(\r\n|\n|\r)/gm, raw`<br/>`);
    jsdoc = jsdoc.replace(new RegExp(/\*/, 'g'), '•');

    jsdoc = jsdoc.replace(/(`(.*?)`)/gi, raw`<code>$2</code>`);

    return jsdoc;
}

/**
 * Interprets a template literal as a raw HTML string.
 *
 * ```ts
 * const header = (title: string) => raw`<h1>${title}</h1>`;
 * ```
 *
 * The `raw` tag returns a string that can be used directly as ```innerHTML``` or as ```unsafeHTML``` via lit.
 */
const raw = (strings: TemplateStringsArray, ...values: unknown[]) => asRenderString(strings, values);

const asRenderString = (strings: TemplateStringsArray, values: unknown[]): string => {
    // eslint-disable-next-line no-useless-catch
    try {
        const v: any = [...values, ''].map((e) => {
            switch (typeof e) {
                case 'object': {
                    return asRenderString((e as any).strings || [], (e as any).values || []);
                }
                default:
                    return e;
            }
        });
        if (strings.length === 0 && values.length > 0) {
            if (typeof values[0] === 'object' && (values[0] as any).strings) {
                return asRenderString((values[0] as any).strings || [], (values[0] as any).values || []);
            }
            return values[0] as string;
        }
        return strings.reduce((acc, s, i) => {
            if (!v[i]) {
                return acc + s;
            }
            return acc + s + v[i].toString();
        }, '');
    } catch (error) {
        throw error;
    }
};

function querySelectorAsync(parent: Element | ShadowRoot | Document, selector: any, checkFrequencyMs: number = 500, timeoutMs: number = 3000) {
    return new Promise((resolve, reject) => {
        let element = parent.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const startTimeInMs = Date.now();
        (function loopSearch() {
            element = parent.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                setTimeout(function () {
                    if (timeoutMs && Date.now() - startTimeInMs > timeoutMs) {
                        try {
                            reject(
                                new Error(
                                    `Timed out waiting for query (${selector}) in ${timeoutMs} ms \n\n${parent.toString()} - ${parent.nodeName} - ${
                                        parent.nodeValue
                                    } \n${parent.parentElement ? parent.parentElement.innerHTML : parent.textContent} \n${
                                        (parent as Element).innerHTML
                                    }`
                                )
                            );
                        } catch (_: any) {
                            reject(new Error(`Timed out waiting for query (${selector}) in ${timeoutMs} ms \n${_.toString()}`));
                        }
                    } else {
                        loopSearch();
                    }
                }, checkFrequencyMs);
            }
        })();
    });
}

function titleCase(str: string) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

async function setupThemes() {
    let themeModal = document.createElement('div');
    document.body.appendChild(themeModal);

    function uploadThemeClick() {
        document.getElementById('cssValue')?.click();
    }

    // const themeEdit = document.getElementById('header-theme-edit-btn') as HTMLSpanElement;
    // if (themeEdit) {
    //     themeEdit.style.display = 'none';
    //     themeEdit.addEventListener('click', () => showCustomCssSource());
    // }
    const themeSelect = document.getElementById('header-theme-select') as Select;
    const themeStyle = document.getElementById('theme-styles') as HTMLStyleElement;
    let darkThemePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeOptions: { value: string; label: string }[] = [];

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            darkThemePreferred = event.matches;
            const storedTheme = window.sessionStorage.getItem(themeStorageKey);
            if (darkThemePreferred && storedTheme === lightThemeKey) {
                const option = themeOptions?.find((t) => t.value === darkThemeKey) || {
                    value: darkThemeKey,
                    label: `${titleCase(darkThemeKey)} Theme`
                };
                themeSelect.value = option;
                window.sessionStorage.setItem(themeStorageKey, darkThemeKey);
                changeTheme(event, darkThemeKey);
            } else if (!darkThemePreferred && storedTheme === darkThemeKey) {
                const option = themeOptions?.find((t) => t.value === lightThemeKey) || {
                    value: lightThemeKey,
                    label: `${titleCase(lightThemeKey)} Theme`
                };
                themeSelect.value = option;
                window.sessionStorage.setItem(themeStorageKey, lightThemeKey);
                changeTheme(event, lightThemeKey);
            }
        });
    }

    function addOption(key: string, icon: any) {
        const option = {
            value: key,
            label: titleCase(key),
            icon: icon
        };

        const nativeOption = document.createElement('option');
        nativeOption.label = option.label;
        nativeOption.value = option.value;
        nativeOption.innerText = option.label;

        const storedTheme = window.sessionStorage.getItem(themeStorageKey);
        if (
            storedTheme === key ||
            (!storedTheme && ((!darkThemePreferred && key === lightThemeKey) || (darkThemePreferred && key?.toLowerCase() === darkThemeKey)))
        ) {
            window.sessionStorage.setItem(themeStorageKey, key);
            themeSelect.value = option;
            nativeOption.selected = true;
            changeTheme(null as any, key);
        }
        themeOptions.push(option);
        return option;
    }

    function _checkCloseModal(e: Event) {
        const containerElement = themeModal.querySelector(`div.modal-container`);
        if (!e.composedPath().includes(containerElement as HTMLElement)) {
            document.body.removeChild(themeModal);
            themeModal = document.createElement('div');
            document.body.appendChild(themeModal);
        }
    }

    function showCustomCssSource() {
        const customThemeSourceParent = document.getElementById('custom-theme-source');
        if (!customThemeSourceParent) {
            // Theme change is triggered by user if the event (e) is defined and this is not the theme support page if there is no customThemeSourceParent already
            // Show custom theme code editor modal
            render(
                html` 
                        <div class="modal" role="dialog" aria-modal="true"
                        @click="${(e0: Event) => _checkCloseModal(e0)}" @touch="${(e1: Event) => _checkCloseModal(e1)}">
                            <div class="modal-container">
                                <div class="modal-body">
                                    <div class="code-modal">
                                        <span class="flex-row">
                                            <h3 id="custom-theme" style="margin-left: 0px;">Custom Theme</h3>
                                            <input class="hidden" id="cssValue" type="file" accept=".css" @input="${(e2: Event) =>
                                                uploadTheme(e2)}" />
                                            <omni-button class="docs-omni-component" label="Upload" type="secondary" @click="${() =>
                                                uploadThemeClick()}" ></omni-button>
                                        </span>
                                        <div style="padding-top: 12px;">
                                            <div id="custom-theme-source" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                themeModal
            );

            setupCustomTheming();
        } else {
            (customThemeSourceParent?.parentElement?.previousElementSibling ?? customThemeSourceParent).scrollIntoView();
        }
    }

    function changeTheme(e: Event, theme: string) {
        // if (themeEdit) {
        //     themeEdit.style.display = 'none';
        // }

        if (theme === lightThemeKey) {
            themeStyle.innerHTML = '';
            document.documentElement.removeAttribute('theme');
        } else if (theme === customThemeKey) {
            document.documentElement.setAttribute('theme', theme);

            // if (themeEdit) {
            //     themeEdit.style.display = 'flex';
            // }
            let customCss = window.sessionStorage.getItem(customThemeCssKey);
            if (!customCss) {
                const link = document.getElementById('theme-styles-link') as HTMLLinkElement;
                for (const key in link.sheet?.cssRules) {
                    const rule = link.sheet?.cssRules[key as any] as CSSStyleRule;
                    if (rule.selectorText?.toLowerCase() === ':root') {
                        customCss = rule.cssText;
                        const windowAny = window as any;
                        if (windowAny.cssbeautify) {
                            customCss = windowAny.cssbeautify(customCss);
                        }
                        customCss = customCss?.replace(':root', `:root[theme="${customThemeKey}"]`) as string;
                        window.sessionStorage.setItem(customThemeCssKey, customCss);
                        break;
                    }
                }
            }
            themeStyle.innerHTML = customCss as string;
            if (e) {
                showCustomCssSource();
            }
        } else {
            themeStyle.innerHTML = '';
            document.documentElement.setAttribute('theme', theme);
        }
        document.dispatchEvent(
            new CustomEvent<string>('omni-docs-theme-change', {
                detail: theme
            })
        );
        const codeEditors = document.querySelectorAll<CodeEditor>('code-editor');
        if (codeEditors) {
            codeEditors.forEach((ce) => {
                ce.updateExtensions();
            });
        }
    }

    addOption(
        lightThemeKey,
        raw`
            <omni-icon symmetrical>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                    <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
                </svg>
            </omni-icon>
        `
    );
    addOption(
        darkThemeKey,
        raw`
            <omni-icon symmetrical>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                    <path d="M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
            </omni-icon>
        `
    );
    addOption(
        customThemeKey,
        raw`
            <omni-icon symmetrical>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                    <path d="M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 0 0 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5zM2 20h20v4H2v-4z"/>
                </svg>
            </omni-icon>
        `
    );

    themeSelect.items = themeOptions;
    themeSelect.renderItem = (item: any) => html`
        <style>
            .theme-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
            .theme-item > * {
                margin-right: 6px;
            }
        </style>
        <div class="theme-item"> 
            ${unsafeHTML(item.icon)} ${item.label}
        </div>
    `;
    themeSelect.renderSelection = (item: any) => html`${unsafeHTML(item.icon || 'none')}`;
    themeSelect.displayField = 'label';
    themeSelect.idField = 'value';
    themeSelect.addEventListener('change', (e) => {
        const value = (e.target as Select).value as any;
        window.sessionStorage.setItem(themeStorageKey, value.value);
        changeTheme(e, value.value);
    });
}

async function setupEleventy() {
    // Add functions for DOM access
    const windowAny = window as any;
    windowAny.copyToClipboard = copyToClipboard;
    windowAny.openTab = openTab;

    //Framework toggles
    await setupFrameworks();

    // Versions
    setupVersions();

    // Links
    setupLinks();

    // Open / Close the menu
    setupMenu();

    // Scroll highlight
    setupScroll();

    // Open tab from query string.
    setupTabs();

    // Toggle loading indicator off on page load.
    setupLoadingIndicator();

    // Setup search for component members
    setupComponentSearch();

    setupSearch();

    await setupThemes();
}

async function setupFrameworks() {
    const htmlImports = document.getElementById('html-imports') as HTMLDivElement;
    const reactImports = document.getElementById('react-imports') as HTMLDivElement;
    const htmlPackage = document.getElementById('html-package') as HTMLLinkElement;
    const reactPackage = document.getElementById('react-package') as HTMLLinkElement;

    document.addEventListener('story-renderer-interactive-update', () => {
        changeFramework((window.localStorage.getItem(frameworkStorageKey) as any) ?? 'HTML');
    });

    const frameworkSelect = document.getElementById('header-framework-select') as Select;
    const frameworkOptions: { value: FrameworkOption; label: string; icon: string }[] = [];

    function addOption(key: FrameworkOption, icon: string) {
        const option = {
            value: key,
            label: key,
            icon: icon
        };
        frameworkOptions.push(option);

        const nativeOption = document.createElement('option');
        nativeOption.label = option.label;
        nativeOption.value = option.value;
        nativeOption.innerText = option.label;

        const storedFramework = (window.localStorage.getItem(frameworkStorageKey) as any) ?? 'HTML';
        if (storedFramework === key) {
            window.localStorage.setItem(frameworkStorageKey, key);
            frameworkSelect.value = option;
            nativeOption.selected = true;
            changeFramework(key);
        }
        return option;
    }

    function changeFramework(framework: FrameworkOption) {
        const currentSelection = window.localStorage.getItem(frameworkStorageKey);
        window.localStorage.setItem(frameworkStorageKey, framework);
        const option = frameworkOptions.find((t) => t.value === framework) || {
            value: framework,
            label: framework,
            icon: ''
        };
        frameworkSelect.value = option;
        switch (framework) {
            case 'Lit':
            case 'Vue':
            case 'HTML':
                htmlImports?.classList?.remove('no-display');
                htmlPackage?.classList?.remove('no-display');

                reactImports?.classList?.add('no-display');
                reactPackage?.classList?.add('no-display');
                break;
            case 'React':
                reactImports?.classList?.remove('no-display');
                reactPackage?.classList?.remove('no-display');

                htmlImports?.classList?.add('no-display');
                htmlPackage?.classList?.add('no-display');
                break;
        }

        if (currentSelection !== framework) {
            document.dispatchEvent(
                new CustomEvent('omni-docs-framework-change', {
                    bubbles: true,
                    composed: true
                })
            );
        }
        const codeEditors = document.querySelectorAll<CodeEditor>('code-editor');
        if (codeEditors) {
            codeEditors.forEach((ce) => {
                ce.updateExtensions();
            });
        }
    }

    addOption('HTML', raw`<omni-icon symmetrical icon="./assets/images/html5.svg"></omni-icon>`);
    addOption('Lit', raw`<omni-icon symmetrical icon="./assets/images/lit-logo.svg#flame"></omni-icon>`);
    addOption('React', raw`<omni-icon symmetrical icon="./assets/images/react.svg"></omni-icon>`);
    addOption('Vue', raw`<omni-icon symmetrical icon="./assets/images/vue.svg"></omni-icon>`);

    frameworkSelect.items = frameworkOptions;
    frameworkSelect.renderItem = (item: any) => html`
    <style>
        .framework-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .framework-item > * {
            margin-right: 6px;
        }
    </style>
    <div class="framework-item"> 
        ${unsafeHTML(item.icon)} ${item.label}
    </div>`;
    frameworkSelect.renderSelection = (item: any) => html`${unsafeHTML(item.icon)}`;
    frameworkSelect.displayField = 'label';
    frameworkSelect.idField = 'value';
    frameworkSelect.addEventListener('change', (e) => {
        const value = (e.target as Select).value as any;
        changeFramework(value.value);
    });
}

async function setupVersions() {
    const versionSelect = document.getElementById('header-version-native-select') as HTMLSelectElement;
    const versionIndicator = document.getElementById('header-version-indicator') as HTMLDivElement;
    const basePath = (window as any).ELEVENTY_BASE_PATH ?? '/';
    const currentVersion = versionIndicator?.textContent?.trim() ?? 'LOCAL';
    const storedVersionsString = window.sessionStorage.getItem(versionsStorageKey);
    let storedVersions: string[] = storedVersionsString ? JSON.parse(storedVersionsString) : undefined;
    if (!storedVersions) {
        try {
            const octokit = new Octokit({});
            const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
                owner: 'capitec',
                repo: 'open-source',
                path: 'docs/omni-components/versions'
            });
            storedVersions = response.data.map((d: any) => d.name);
            window.sessionStorage.setItem(versionsStorageKey, JSON.stringify(storedVersions));
            window.localStorage.setItem(versionsStorageKey, JSON.stringify(storedVersions));
        } catch (error) {
            const storedVersionsString = window.localStorage.getItem(versionsStorageKey);
            storedVersions = storedVersionsString ? JSON.parse(storedVersionsString) : ['next', 'beta', 'alpha'];
        }
    }

    storedVersions.unshift(latestVersionName);
    if (!storedVersions.includes(currentVersion)) {
        storedVersions.splice(1, 0, currentVersion);
    }
    storedVersions.forEach((v) => {
        const nativeOption = document.createElement('option');
        nativeOption.label = v;
        nativeOption.value = v;
        nativeOption.innerText = v;
        if (v === currentVersion) {
            nativeOption.selected = true;
        }
        versionSelect.add(nativeOption);
    });

    versionSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        let path = window.location.href;

        path = path.replace(
            `${window.origin}${basePath}`,
            value === latestVersionName ? docsHostedBasePath : `${docsHostedBasePath}versions/${value}/`
        );
        if (path !== window.location.href) {
            window.location.href = path;
        }
    });
}

function setupLinks() {
    const logo = document.getElementById('header-container');
    logo?.addEventListener('click', () => {
        document.location = document.baseURI;
    });
}

function openTab(target: Element, tabId: string) {
    let i;

    // Get all elements with class="tabcontent" and hide them
    const tabContent = document.getElementsByClassName('component-tab') as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    const tabLinks = document.getElementsByClassName('component-tab-button');
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId)!.style!.display = 'block';
    target.classList.add('active');

    // Set nav state of tab.
    if (tabId.toLowerCase() === 'examples') {
        window.history.replaceState({}, '', document.location.pathname);
    } else {
        window.history.replaceState({}, '', `${document.location.pathname}?tab=${tabId}`);
    }
}

function copyToClipboard(id: string) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id) as HTMLElement);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand('copy');
    window.getSelection()?.removeAllRanges();
}

function setupMenu() {
    const menuButton = document.querySelector<HTMLElement>('.header-menu-button .material-icons');
    menuButton?.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        if (nav?.classList.contains('mobile')) {
            nav?.classList.remove('mobile');
            menuButton.innerText = 'menu';
        } else {
            nav?.classList.add('mobile');
            menuButton.innerText = 'close';
        }
    });
}

function setupScroll() {
    const storyRendererContainers = document.querySelectorAll<HTMLElement>('div.name');
    const storyRenderers = document.querySelectorAll<StoryRenderer>('story-renderer');
    const tocAnchors = document.querySelectorAll<HTMLAnchorElement>('.component-toc a');

    window.srCount = storyRenderers.length + 1;
    window.srCompleteCount = 0;

    window.addEventListener('component-render-complete', () => {
        window.srCompleteCount++;

        if (window.srCount === window.srCompleteCount && document.location.hash) {
            setTimeout(() => {
                document.querySelector(document.location.hash)?.scrollIntoView({
                    behavior: 'auto'
                });
            }, 200);
        }
    });

    window.addEventListener('scroll', () => {
        storyRendererContainers.forEach((sr, key) => {
            const top = window.scrollY;
            const offset = sr.offsetTop + 290;
            const height = sr.offsetHeight;
            const id = sr.getAttribute('id');

            // console.log(top, offset, height, id);

            if ((top > offset && top < offset + height) || (key === 0 && top <= 290)) {
                tocAnchors.forEach((a) => {
                    a.classList.remove('active');
                });
                const active = document.querySelector(`.component-toc a[href*='${id}']`);
                active?.classList.add('active');

                // Only apply for the examples tab
                if (!document.location.search) {
                    window.history.replaceState({}, '', `${document.location.pathname}#${id}`);
                }
            }

            // if (key === 0 && top <= 290) {
            //     document.querySelector(`.component-toc a[href*='${id}']`).classList.add('active');
            // }

            // if (top === 0) {
            //     console.log('top');

            // }

            // else if (id === hash) {
            //     tocAnchors.forEach((a) => {
            //         a.classList.remove('active');
            //         document.querySelector(`.component-toc a[href*='${hash}']`).classList.add('active');
            //     });
            // }
        });
    });

    tocAnchors.forEach((a) => {
        a.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();

            // Getting element by anchor id (without the -a at the end)
            const id = a.id.substring(0, a.id.length - 2);
            const element = document.getElementById(id);

            element?.scrollIntoView({
                behavior: 'smooth'
            });

            // Needs improvements.First scroll sometimes doesn't go all the way
            setTimeout(() => {
                element?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100);

            // Too soon to do the below, at some point determine when scrolling is complete and then apply correct highlighting
            // tocAnchors.forEach((a2) => {
            //     a2.classList.remove('active');
            // });
            // a.classList.add('active');

            return false;
        });
    });
}

function setupTabs() {
    if (document.location.search) {
        const searchParams = new URLSearchParams(document.location.search);

        for (const param of searchParams) {
            switch (param[0]) {
                case 'tab': {
                    const id = param[1];
                    const target = document.querySelector(`[data-name="${id}"]`);
                    openTab(target as Element, id);
                    break;
                }
                default:
                    break;
            }
        }
    }
}

function setupLoadingIndicator() {
    const overlay = document.querySelector<HTMLElement>('.component-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    const component = document.querySelector<HTMLElement>('.component');
    if (component) {
        component.style.display = 'block';
    }
}

function setupComponentSearch() {
    //Attribute search
    const attributeSearch = document.querySelector<SearchField>('#attribute-search');
    const attributeRows = document.querySelector<HTMLTableSectionElement>('#component-attributes')?.children;
    if (attributeSearch && attributeRows) {
        attributeSearch.addEventListener('input', handleAttributes);
        attributeSearch.addEventListener('change', handleAttributes);
    }

    function handleAttributes() {
        const filterValue = attributeSearch?.value ?? '';
        for (let index = 0; index < attributeRows!.length; index++) {
            const element = attributeRows![index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    //Global Attribute search
    const globalAttributeSearch = document.querySelector<SearchField>('#global-attribute-search');
    const globalAttributeRows = document.querySelector<HTMLTableSectionElement>('#component-global-attributes')?.children;
    if (globalAttributeSearch && globalAttributeRows) {
        globalAttributeSearch.addEventListener('input', handleGlobalAttributes);
        globalAttributeSearch.addEventListener('change', handleGlobalAttributes);
    }

    function handleGlobalAttributes() {
        const filterValue = globalAttributeSearch?.value ?? '';
        for (let index = 0; index < globalAttributeRows!.length; index++) {
            const element = globalAttributeRows![index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    //Event search
    const eventSearch = document.querySelector<SearchField>('#event-search');
    const eventRows = document.querySelector<HTMLTableSectionElement>('#component-events')?.children;
    if (eventSearch && eventRows) {
        eventSearch.addEventListener('input', handleEvents);
        eventSearch.addEventListener('change', handleEvents);
    }

    function handleEvents() {
        const filterValue = eventSearch?.value ?? '';
        for (let index = 0; index < eventRows!.length; index++) {
            const element = eventRows![index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    //Type search
    const typeSearch = document.querySelector<SearchField>('#type-search');
    const typeRows = document.querySelector<HTMLTableSectionElement>('#component-types')?.children;
    if (typeSearch && typeRows) {
        typeSearch.addEventListener('input', handleTypes);
        typeSearch.addEventListener('change', handleTypes);
    }

    function handleTypes() {
        const filterValue = typeSearch?.value ?? '';
        for (let index = 0; index < typeRows!.length; index++) {
            const element = typeRows![index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    //Slot search
    const slotSearch = document.querySelector<SearchField>('#slot-search');
    const slotRows = document.querySelector<HTMLTableSectionElement>('#component-slots')?.children;
    if (slotSearch && slotRows) {
        slotSearch.addEventListener('input', handleSlots);
        slotSearch.addEventListener('change', handleSlots);
    }

    function handleSlots() {
        const filterValue = slotSearch?.value ?? '';
        for (let index = 0; index < slotRows!.length; index++) {
            const element = slotRows![index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }

    //CSS Properties search
    const categories = document.querySelectorAll('.css-category');
    const tables = document.querySelectorAll<HTMLTableSectionElement>('.component-css-props');
    for (let index = 0; index < categories.length; index++) {
        const categorySearchElement = categories[index] as SearchField;
        const category = categorySearchElement.getAttribute('data-category');
        for (let index = 0; index < tables.length; index++) {
            const tableSection = tables[index];
            if (tableSection.getAttribute('data-category') === category) {
                const cssPropRows = tableSection?.children;
                if (categorySearchElement && cssPropRows) {
                    categorySearchElement.addEventListener('input', () => handleCSSPropertySearch(categorySearchElement, cssPropRows));
                    categorySearchElement.addEventListener('change', () => handleCSSPropertySearch(categorySearchElement, cssPropRows));
                }
            }
        }
    }

    function handleCSSPropertySearch(categorySearchElement: SearchField, cssPropRows: HTMLCollection) {
        const filterValue = categorySearchElement.value ?? '';
        for (let index = 0; index < cssPropRows.length; index++) {
            const element = cssPropRows[index] as HTMLElement;
            if (element.innerText && element.innerText.toLowerCase().includes((<string>filterValue).toLowerCase())) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    }
}

function setupSearch() {
    let modal: Modal;
    let searchField: SearchField;
    let renderResults: RenderElement;
    let data: [];
    let fuse: Fuse<any>;

    document.getElementById('header-search-button')?.addEventListener('click', async () => {
        if (!data) {
            const search = await fetch('search.json');
            data = await search.json();
        }

        if (!fuse) {
            fuse = new Fuse(data, {
                keys: ['data', 'title'],
                includeMatches: true,
                ignoreLocation: true,
                minMatchCharLength: 3,
                threshold: 0.3,
                includeScore: true,
                findAllMatches: false,
                shouldSort: true
            });
        }

        if (!modal) {
            modal = Modal.show({
                noFooter: true,
                noFullscreen: true,
                header: () => html`
                    <omni-search-field 
                        tabindex="1"
                        ${ref((e) => {
                            searchField = e as SearchField;
                            searchField.focus();
                        })}
                        clearable 
                        @input="${() => (renderResults.data = searchField.value as any)}"
                        @change="${() => (renderResults.data = searchField.value as any)}">
                    </omni-search-field>
                `,
                body: () => html`
                    <omni-render-element 
                        ${ref((e) => (renderResults = e as RenderElement))} 
                        .renderer="${(searchValue: string) => {
                            if (!searchValue) {
                                modal.style.setProperty('--omni-modal-header-border-radius', '4px');
                                return nothing;
                            }

                            // Do the search via fuse library.
                            const results = fuse.search(searchValue ?? '') as [];
                            const order: any = {
                                component: 1,
                                story: 2,
                                md: 3
                            };

                            results.sort((a: any, b: any) => {
                                return order[a.item.type] - order[b.item.type];
                            });

                            modal.style.setProperty('--omni-modal-header-border-radius', results.length > 0 ? 'unset' : '4px');

                            // console.log(results);

                            return html`
                                <style>

                                    omni-hyperlink {
                                        --omni-hyperlink-text-decorator-hover: none;
                                    }

                                    .search-item {
                                        display: flex;
                                        text-decoration: none;
                                        padding: 3px;
                                        cursor: pointer;
                                    }

                                    omni-label {
                                        cursor: pointer;
                                    }

                                    .search-item:hover {
                                        background-color: #209cee;
                                        text-decoration: none;
                                        /* text-decoration: underline; */
                                    }

                                    .search-item-icon {
                                        display: flex;
                                        align-items: center;
                                        padding-left: 6px;
                                        padding-right: 6px;
                                    }

                                    .search-item-title {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: left;
                                        padding-left: 6px;
                                        padding-right: 6px;
                                    }
                                </style>
                                ${results.map((r: any) => {
                                    return html`
                                        <omni-hyperlink href="${r.item.path}">
                                            <div class="search-item">
                                                <div class="search-item-icon">
                                                    <omni-icon size="medium">
                                                        ${getIcon(r.item.type)}
                                                    </omni-icon>
                                                </div>
                                                <div class="search-item-title">
                                                    <omni-label type="subtitle">${r.item.title}</omni-label>
                                                    <omni-label type="default">${getSubText(r.item)}</omni-label>
                                                </div>
                                            </div>
                                        </omni-hyperlink>
                                    `;
                                })}
                            `;
                        }}"></omni-render-element>
                `
            }) as Modal;
            modal?.addEventListener('click-outside', () => {
                modal.hide = true;
                searchField.value = '';
                renderResults.data = '' as any;
            });
            modal.classList.add('search-modal');
        } else {
            modal.hide = false;
        }

        // The below needs to be revisited to accurately hook into the lifecycle to focus the search field.

        // await modal?.updateComplete;
        // await Promise.all(Array.from(modal.querySelectorAll('omni-render-element')).map((re) => re.updateComplete));
        // searchField?.focus();
        setTimeout(() => {
            searchField?.focus();
        }, 10);
    });

    function getIcon(type: string) {
        switch (type) {
            case 'component':
                return svg`
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                `;
                break;
            case 'story':
                return svg`
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                `;
                break;
            case 'md':
                return svg`
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                        <g>
                            <rect fill="none" height="24" width="24"/>
                            <g>
                                <path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/>
                            </g>
                            <path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/>
                        </g>
                    </svg>
                `;
            default:
                break;
        }
        return html``;
    }

    function getSubText(item: any) {
        switch (item.type) {
            case 'component':
                return 'Component';
            case 'md':
                return 'Documentation';
            case 'story': {
                const story = item.data[0];
                // return `Story - ${story}`;
                return story;
            }
            default:
                return '';
        }
    }
}

async function setupTheming() {
    const themeSources = document.getElementById('themes-sources');
    if (themeSources) {
        const link = document.getElementById('theme-styles-link') as HTMLLinkElement;
        const themes: string[] = [];
        for (const key in link.sheet?.cssRules) {
            const rule = link.sheet?.cssRules[key as any] as CSSStyleRule;
            const matches = [...(rule.selectorText?.toLowerCase()?.matchAll(/theme="(.*?)"/g) ?? [])];
            for (const index in matches) {
                const match = matches[index];
                const theme = match[1];
                if (!themes.includes(theme)) {
                    themes.push(theme);
                }
            }
        }

        const themesSourcesHtml = themes
            .sort((t) => (t === darkThemeKey ? -1 : 0))
            .map((theme: string) => {
                const themeName = theme;
                theme = '';
                for (const key in link.sheet?.cssRules) {
                    const rule = link.sheet?.cssRules[key as any] as CSSStyleRule;
                    if (rule.selectorText /* && rule.selectorText.startsWith(':root') */ && rule.selectorText.includes(`theme="${themeName}"`)) {
                        theme += `${rule.cssText} \n`;
                    }
                }

                const windowAny = window as any;
                if (windowAny.cssbeautify) {
                    theme = windowAny.cssbeautify(theme);
                }
                return html` <div>
        <h3 style="padding-top: 12px;">${titleCase(themeName)} Theme</h3>
        <code-editor .extensions="${() => [currentCodeTheme(), cssSupport()]}" .code="${theme}" read-only> </code-editor>
    </div>`;
            });
        render(themesSourcesHtml, themeSources);
    }
}

async function setupCustomTheming() {
    const customThemeSourceParent = document.getElementById('custom-theme-source');
    const themeStyle = document.getElementById('theme-styles') as HTMLStyleElement;
    let cssSource = window.sessionStorage.getItem(customThemeCssKey);
    if (!cssSource) {
        const link = document.getElementById('theme-styles-link') as HTMLLinkElement;
        for (const key in link.sheet?.cssRules) {
            const rule = link.sheet?.cssRules[key as any] as CSSStyleRule;
            if (rule.selectorText?.toLowerCase() === ':root') {
                cssSource = rule.cssText;
                const windowAny = window as any;
                if (windowAny.cssbeautify) {
                    cssSource = windowAny.cssbeautify(cssSource);
                }
                cssSource = cssSource?.replace(':root', `:root[theme="${customThemeKey}"]`) as string;
                window.sessionStorage.setItem(customThemeCssKey, cssSource);
                break;
            }
        }
    }

    const windowAny = window as any;
    if (windowAny.cssbeautify) {
        cssSource = windowAny.cssbeautify(cssSource);
        window.sessionStorage.setItem(customThemeCssKey, cssSource as string);
    }
    const omniCompletions = cssLanguage.data.of({ autocomplete: await omniCssVariablesCompletionSource() });
    const cssLang = new LanguageSupport(cssLanguage, [cssLanguage.data.of({ autocomplete: cssCompletionSource }), omniCompletions]); //css();
    render(
        html`
      <code-editor
        data-identifier="custom-theme-source-code"
        class="source-code"
        .extensions="${async () => [currentCodeTheme(), cssLang]}"
        code="${cssSource as string}"
        @codemirror-loaded="${(e: CustomEvent<CodeMirrorEditorEvent>) => {
            const newSource = e.detail.source;
            cssSource = newSource;
            window.sessionStorage.setItem(customThemeCssKey, cssSource);
            if (window.sessionStorage.getItem(themeStorageKey) === customThemeKey) {
                themeStyle.innerHTML = cssSource;
                const codeEditors = document.querySelectorAll<CodeEditor>('code-editor');
                if (codeEditors) {
                    codeEditors.forEach((ce) => {
                        ce.updateExtensions();
                    });
                }
                document.dispatchEvent(
                    new CustomEvent<string>('omni-docs-theme-change', {
                        detail: customThemeKey
                    })
                );
            }
        }}"
        @codemirror-source-change="${(e: CustomEvent<CodeMirrorSourceUpdateEvent>) => {
            const newSource = e.detail.source;
            cssSource = newSource;
            window.sessionStorage.setItem(customThemeCssKey, cssSource);
            if (window.sessionStorage.getItem(themeStorageKey) === customThemeKey) {
                themeStyle.innerHTML = cssSource;
                const codeEditors = document.querySelectorAll<CodeEditor>('code-editor');
                if (codeEditors) {
                    codeEditors.forEach((ce) => {
                        ce.updateExtensions();
                    });
                }
                document.dispatchEvent(
                    new CustomEvent<string>('omni-docs-theme-change', {
                        detail: customThemeKey
                    })
                );
            }
        }}">
      </code-editor>
    `,
        customThemeSourceParent as HTMLElement
    );
}

const omniCssVariablesCompletionSource: () => Promise<CompletionSource> = async () => {
    const properties: Completion[] = [];

    const customElements = await loadCustomElements();
    customElements.modules.forEach((m) => {
        m.declarations?.forEach((d) => {
            const declaration = d as CustomElementDeclaration &
                CustomElement & {
                    cssCategory: string;
                };
            if (declaration.cssProperties) {
                declaration.cssProperties.forEach((c) => {
                    if (!properties.find((p) => p.label === c.name)) {
                        properties.push({
                            label: c.name,
                            type: 'property',
                            detail: declaration.cssCategory ?? undefined,
                            boost: declaration.cssCategory ? (declaration.cssCategory.toLowerCase().includes('theme') ? 90 : 80) : undefined,
                            info: c.description
                        });
                    }
                });
            }
        });
    });

    return (context) => {
        const identifier = /^[\w-]*/;
        const values: Completion[] = [];
        const tags: Completion[] = [];
        const pseudoClasses: Completion[] = [];

        const { state, pos } = context,
            node = syntaxTree(state).resolveInner(pos, -1);
        if (node.name === 'PropertyName') return { from: node.from, options: properties, validFor: identifier };
        if (node.name === 'ValueName') return { from: node.from, options: values, validFor: identifier };
        if (node.name === 'PseudoClassName') return { from: node.from, options: pseudoClasses, validFor: identifier };
        if (node.name === 'TagName') {
            for (let { parent } = node; parent; parent = parent.parent)
                if (parent.name === 'Block') return { from: node.from, options: properties, validFor: identifier };
            return { from: node.from, options: tags, validFor: identifier };
        }
        if (!context.explicit) return null;
        const above = node.resolve(pos),
            before = above.childBefore(pos);
        if (before && before.name === ':' && above.name === 'PseudoClassSelector') return { from: pos, options: pseudoClasses, validFor: identifier };
        if ((before && before.name === ':' && above.name === 'Declaration') || above.name === 'ArgList')
            return { from: pos, options: values, validFor: identifier };
        if (above.name === 'Block') return { from: pos, options: properties, validFor: identifier };
        return null;
    };
};

async function uploadTheme(e: Event) {
    const uploadInput = e.target as HTMLInputElement;
    const themeStyle = document.getElementById('theme-styles') as HTMLStyleElement;
    if (uploadInput.files!.length > 0) {
        const inputField = uploadInput;
        const file = uploadInput.files![0];

        await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const cssRaw = evt.target?.result as string;

                inputField.value = '';

                const themeCode = document.querySelector<CodeEditor>('[data-identifier=custom-theme-source-code');
                if (themeCode) {
                    themeCode.refresh(() => cssRaw);
                } else {
                    window.sessionStorage.setItem(customThemeCssKey, cssRaw);
                    if (window.sessionStorage.getItem(themeStorageKey) === customThemeKey) {
                        themeStyle.innerHTML = cssRaw;
                    }
                }

                resolve();
            };
            reader.onerror = (event) => {
                reject(event.target?.error);
            };
            reader.onabort = (event) => {
                reject(event.target?.error);
            };
            reader.readAsText(file);
        });
    }
}

function currentCodeTheme() {
    const storedTheme = getComputedStyle(document.documentElement).getPropertyValue('--code-editor-theme')?.trim();
    if (storedTheme?.toLowerCase() === darkThemeKey) {
        return codeThemeDark;
    }
    return codeTheme;
}

function getSourceFromLit(
    res: TemplateResult,
    transformElement?: (container: HTMLDivElement) => void,
    transformSourceContent?: (source: string) => string
): string {
    let tempContainer = document.createElement('div');
    render(res, tempContainer);
    if (transformElement) {
        transformElement(tempContainer);
    }
    let source = tempContainer.innerHTML;
    if (transformSourceContent) {
        source = transformSourceContent(source);
    }
    source = transformSource(source);

    //Cleanup
    tempContainer.innerHTML = '';
    tempContainer = null as any;

    return source;
}

function transformSource(input: string) {
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
    return pretty(input, {
        ocd: true
    });
}

declare global {
    interface Window {
        srCount: number;
        srCompleteCount: number;
    }
}

export {
    loadCustomElements,
    loadCustomElementsModuleByFileFor,
    loadCustomElementsModuleFor,
    loadCustomElementsCodeMirrorCompletions,
    loadCustomElementsCodeMirrorCompletionsRemote,
    loadSlotFor,
    loadSlotForModule,
    loadDefaultSlotFor,
    loadDefaultSlotForModule,
    loadCssProperties,
    loadFileRemote,
    markdownCode,
    asRenderString,
    filterJsDocLinks,
    transformFromJsdoc,
    formatMarkdownCodeElements,
    markdownCodeToHtml,
    assignToSlot,
    enhanceCodeBlocks,
    raw,
    querySelectorAsync,
    setupThemes,
    setupEleventy,
    setupTheming,
    uploadTheme,
    transformSource,
    getSourceFromLit
};
