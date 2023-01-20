import { CompletionSource, Completion } from '@codemirror/autocomplete';
import { css as cssSupport, cssCompletionSource, cssLanguage } from '@codemirror/lang-css';
import { html as langHtml, TagSpec } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { syntaxTree, LanguageSupport } from '@codemirror/language';
import { githubDark as codeThemeDark } from '@ddietr/codemirror-themes/github-dark.js';
import { githubLight as codeTheme } from '@ddietr/codemirror-themes/github-light.js';
import { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
export { Package, ClassDeclaration, CustomElementDeclaration, Declaration, CustomElement } from 'custom-elements-manifest/schema';
import { html } from 'lit';
import { render } from 'lit-html';
import { SearchField } from '../search-field/SearchField.js';
import { Select } from '../select/Select.js';
import { CodeEditor, CodeMirrorEditorEvent, CodeMirrorSourceUpdateEvent } from './CodeEditor.js';
export { ComponentStoryFormat, CSFIdentifier } from './ComponentStoryFormat.js';
export { PlayFunction, PlayFunctionContext } from './PlayFunction.js';
import { StoryRenderer } from './StoryRenderer.js';

import './CodeEditor.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const codeSnippet = '```';
const customThemeCssKey = 'omni-docs-custom-theme-css';
const themeStorageKey = 'omni-docs-theme-selection';
const customThemeKey = 'custom';
const lightThemeKey = 'light';
const darkThemeKey = 'dark';

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
    > = undefined
) {
    if (!cssDeclarations) {
        cssDeclarations = {};
    }

    const elementModule = JSON.parse(
        JSON.stringify(customElements.modules.find((module) => module.exports.find((e: { name: string }) => e.name === element)))
    );

    let superModule = elementModule;
    do {
        if (superModule.declarations.find((sd: any) => sd.superclass)) {
            superModule = customElements.modules.find((module) =>
                module.exports.find(
                    (e) =>
                        e.name ===
                        (superModule.declarations.find((sd: Declaration) => (sd as ClassDeclaration).superclass) as ClassDeclaration).superclass.name
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
                        description: cssProperty.description,
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
    return undefined;
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
        if (codeBlock.parentElement.tagName === `pre`) {
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
        codeBlock.parentElement.removeChild(codeBlock);
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
} = null;
function loadCustomElementsCodeMirrorCompletions(customElements: Package) {
    if (!_completions) {
        const extraTags: Record<string, TagSpec> = {};
        const extraGlobalAttributes: Record<string, null | string[]> = {};

        customElements.modules.forEach((module) => {
            const elementExport = module.exports.find((e) => e.kind === 'custom-element-definition');
            if (elementExport) {
                module.declarations.forEach((d) => {
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
                                let attrValues: string[] = null;
                                if (
                                    attribute.type.text !== 'string' &&
                                    attribute.type.text !== 'boolean' &&
                                    !attribute.type.text.includes('Promise')
                                ) {
                                    const types = attribute.type.text.split(' | ');
                                    attrValues = [];
                                    for (const type in types) {
                                        const typeValue = types[type];
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
            return raw`<strong>${link.text}</strong>`;
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

function querySelectorAsync(parent: Element | ShadowRoot, selector: any, checkFrequencyMs: number = 500, timeoutMs: number = 3000) {
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
                                    } \n${parent.parentElement ? parent.parentElement.innerHTML : parent.textContent} \n${parent.innerHTML}`
                                )
                            );
                        } catch (_) {
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
        document.getElementById('cssValue').click();
    }

    const themeEdit = document.getElementById('header-theme-edit-btn') as HTMLSpanElement;
    if (themeEdit) {
        themeEdit.style.display = 'none';
        themeEdit.addEventListener('click', () => showCustomCssSource());
    }
    const themeSelect = document.getElementById('header-theme-select') as Select;
    const themeNativeSelect = document.getElementById('header-theme-native-select') as HTMLSelectElement;
    const themeStyle = document.getElementById('theme-styles') as HTMLStyleElement;
    let darkThemePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            darkThemePreferred = event.matches;
            const storedTheme = window.sessionStorage.getItem(themeStorageKey);
            if (darkThemePreferred && storedTheme === lightThemeKey) {
                themeSelect.value = {
                    value: darkThemeKey,
                    label: `${titleCase(darkThemeKey)} Theme`
                };
                themeNativeSelect.value = darkThemeKey;
                window.sessionStorage.setItem(themeStorageKey, darkThemeKey);
                changeTheme(event, darkThemeKey);
            } else if (!darkThemePreferred && storedTheme === darkThemeKey) {
                themeSelect.value = {
                    value: lightThemeKey,
                    label: `${titleCase(lightThemeKey)} Theme`
                };
                themeNativeSelect.value = lightThemeKey;
                window.sessionStorage.setItem(themeStorageKey, lightThemeKey);
                changeTheme(event, lightThemeKey);
            }
        });
    }

    const themeOptions: { value: string; label: string }[] = [];

    function addOption(key: string) {
        const option = {
            value: key,
            label: `${titleCase(key)} Theme`
        };
        const nativeOption = document.createElement('option');
        nativeOption.label = option.label;
        nativeOption.value = option.value;

        const storedTheme = window.sessionStorage.getItem(themeStorageKey);
        if (
            storedTheme === key ||
            (!storedTheme && ((!darkThemePreferred && key === lightThemeKey) || (darkThemePreferred && key?.toLowerCase() === darkThemeKey)))
        ) {
            window.sessionStorage.setItem(themeStorageKey, key);
            themeSelect.value = option;
            nativeOption.selected = true;
            changeTheme(null, key);
        }
        themeOptions.push(option);
        themeNativeSelect.add(nativeOption);
        return option;
    }

    function _checkCloseModal(e: Event) {
        const containerElement = themeModal.querySelector(`div.modal-container`);
        if (!e.composedPath().includes(containerElement)) {
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
        if (themeEdit) {
            themeEdit.style.display = 'none';
        }

        if (theme === lightThemeKey) {
            themeStyle.innerHTML = '';
            document.documentElement.removeAttribute('theme');
        } else if (theme === customThemeKey) {
            document.documentElement.setAttribute('theme', theme);

            if (themeEdit) {
                themeEdit.style.display = 'flex';
            }
            let customCss = window.sessionStorage.getItem(customThemeCssKey);
            if (!customCss) {
                const link = document.getElementById('theme-styles-link') as HTMLLinkElement;
                for (const key in link.sheet.cssRules) {
                    const rule = link.sheet.cssRules[key] as CSSStyleRule;
                    if (rule.selectorText?.toLowerCase() === ':root') {
                        customCss = rule.cssText;
                        const windowAny = window as any;
                        if (windowAny.cssbeautify) {
                            customCss = windowAny.cssbeautify(customCss);
                        }
                        customCss = customCss.replace(':root', `:root[theme="${customThemeKey}"]`);
                        window.sessionStorage.setItem(customThemeCssKey, customCss);
                        break;
                    }
                }
            }
            themeStyle.innerHTML = customCss;
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

    addOption(lightThemeKey);
    addOption(darkThemeKey);
    addOption(customThemeKey);

    themeSelect.items = themeOptions;
    themeSelect.displayField = 'label';
    themeSelect.idField = 'value';
    // themeSelect.style.display = 'flex';
    themeSelect.addEventListener('change', (e) => {
        const value = (e.target as Select).value as any;
        window.sessionStorage.setItem(themeStorageKey, value.value);
        themeNativeSelect.value = value.value;
        changeTheme(e, value.value);
    });
    themeNativeSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value as any;
        window.sessionStorage.setItem(themeStorageKey, value);
        themeSelect.value = value;
        changeTheme(e, value);
    });
}

async function setupEleventy() {
    // Add functions for DOM access
    const windowAny = window as any;
    windowAny.copyToClipboard = copyToClipboard;
    windowAny.openTab = openTab;

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
    setupSearch();

    await setupThemes();
}

function setupLinks() {
    const logo = document.getElementById('header-container');
    logo.addEventListener('click', () => {
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
    document.getElementById(tabId).style.display = 'block';
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
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function setupMenu() {
    const menuButton = document.querySelector<HTMLElement>('.header-menu-button .material-icons');
    menuButton.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        if (nav.classList.contains('mobile')) {
            nav.classList.remove('mobile');
            menuButton.innerText = 'menu';
        } else {
            nav.classList.add('mobile');
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
                document.querySelector(document.location.hash).scrollIntoView({
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
                active.classList.add('active');

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

            element.scrollIntoView({
                behavior: 'smooth'
            });

            // Needs improvements.First scroll sometimes doesn't go all the way
            setTimeout(() => {
                element.scrollIntoView({
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
                    openTab(target, id);
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

function setupSearch() {
    //Attribute search
    const attributeSearch = document.querySelector<SearchField>('#attribute-search');
    const attributeRows = document.querySelector<HTMLTableSectionElement>('#component-attributes')?.children;
    if (attributeSearch && attributeRows) {
        attributeSearch.addEventListener('input', handleAttributes);
        attributeSearch.addEventListener('change', handleAttributes);
    }

    function handleAttributes() {
        const filterValue = attributeSearch.value ?? '';
        for (let index = 0; index < attributeRows.length; index++) {
            const element = attributeRows[index] as HTMLElement;
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
        const filterValue = eventSearch.value ?? '';
        for (let index = 0; index < eventRows.length; index++) {
            const element = eventRows[index] as HTMLElement;
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
        const filterValue = slotSearch.value ?? '';
        for (let index = 0; index < slotRows.length; index++) {
            const element = slotRows[index] as HTMLElement;
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

async function setupTheming() {
    const themeSources = document.getElementById('themes-sources');
    if (themeSources) {
        const link = document.getElementById('theme-styles-link') as HTMLLinkElement;
        const themes: string[] = [];
        for (const key in link.sheet.cssRules) {
            const rule = link.sheet.cssRules[key] as CSSStyleRule;
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
                for (const key in link.sheet.cssRules) {
                    const rule = link.sheet.cssRules[key] as CSSStyleRule;
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
        for (const key in link.sheet.cssRules) {
            const rule = link.sheet.cssRules[key] as CSSStyleRule;
            if (rule.selectorText?.toLowerCase() === ':root') {
                cssSource = rule.cssText;
                const windowAny = window as any;
                if (windowAny.cssbeautify) {
                    cssSource = windowAny.cssbeautify(cssSource);
                }
                cssSource = cssSource.replace(':root', `:root[theme="${customThemeKey}"]`);
                window.sessionStorage.setItem(customThemeCssKey, cssSource);
                break;
            }
        }
    }

    const windowAny = window as any;
    if (windowAny.cssbeautify) {
        cssSource = windowAny.cssbeautify(cssSource);
        window.sessionStorage.setItem(customThemeCssKey, cssSource);
    }
    const omniCompletions = cssLanguage.data.of({ autocomplete: await omniCssVariablesCompletionSource() });
    const cssLang = new LanguageSupport(cssLanguage, [cssLanguage.data.of({ autocomplete: cssCompletionSource }), omniCompletions]); //css();
    render(
        html`
      <code-editor
        data-identifier="custom-theme-source-code"
        class="source-code"
        .extensions="${async () => [currentCodeTheme(), cssLang]}"
        code="${cssSource}"
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
        customThemeSourceParent
    );
}

const omniCssVariablesCompletionSource: () => Promise<CompletionSource> = async () => {
    const properties: Completion[] = [];

    const customElements = await loadCustomElements();
    customElements.modules.forEach((m) => {
        m.declarations.forEach((d) => {
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
    if (uploadInput.files.length > 0) {
        const inputField = uploadInput;
        const file = uploadInput.files[0];

        await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const cssRaw = evt.target.result as string;

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
                reject(event.target.error);
            };
            reader.onabort = (event) => {
                reject(event.target.error);
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
    formatMarkdownCodeElements,
    markdownCodeToHtml,
    assignToSlot,
    enhanceCodeBlocks,
    raw,
    querySelectorAsync,
    setupThemes,
    setupEleventy,
    setupTheming,
    uploadTheme
};
