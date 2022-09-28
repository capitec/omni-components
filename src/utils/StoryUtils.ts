/* eslint-disable @typescript-eslint/no-explicit-any */
const codeSnippet = '```';

function loadCssProperties(element: string, customElements: any, cssDeclarations: any = undefined): any {
    if (!cssDeclarations) {
        cssDeclarations = {};
    }

    const elementModule = customElements.modules.find((module: { exports: any[]; }) => module.exports.find((e: { name: string; }) => e.name === element));

    let superModule = elementModule;
    do {
        if (superModule.declarations.find((sd: any ) => sd.superclass)) {
            superModule = customElements.modules.find((module: { exports: any[]; }) => module.exports.find((e: { name: string; }) => e.name === superModule.declarations.find((sd: any ) => sd.superclass).superclass.name));
        } else {
            superModule = undefined;
        }
        if (superModule) {
            elementModule.declarations = [...elementModule.declarations, ...superModule.declarations];
        }
    } while (superModule);
    for (const key in elementModule.declarations) {
        const declaration = elementModule.declarations[key];
        if (declaration.cssProperties && declaration.cssProperties.length > 0) {
            for (const cssKey in declaration.cssProperties) {
                const cssProperty = declaration.cssProperties[cssKey];
                if (!cssDeclarations[cssProperty.name.replace('--', '')]) {
                    cssDeclarations[cssProperty.name.replace('--', '')] = {
                        control: cssProperty.name.includes('color') || cssProperty.name.includes('colour') || cssProperty.name.includes('fill') ? 'color' : 'text',
                        description: cssProperty.description,
                        category: 'CSS Variables',
                        subcategory: 'Component Variables',
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

function loadThemeVariablesRemote() {
    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', 'theme-variables.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = request.status;
    };
    request.send(null);

    if (error) {
        console.warn(error);
        return {};
    }

    const themeVariables = JSON.parse(output);
    return themeVariables;
}

function loadCssPropertiesRemote(element: string, cssDeclarations: any = undefined): any {
    if (!cssDeclarations) {
        const defaultVariables = loadThemeVariablesRemote();
        cssDeclarations = { ...defaultVariables };
    }

    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', 'custom-elements.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = request.status;
    };
    request.send(null);

    if (error) {
        return cssDeclarations;
    }

    const customElements = JSON.parse(output);

    cssDeclarations = loadCssProperties(element, customElements, cssDeclarations);

    // console.log(element, cssDeclarations);
    return cssDeclarations;
}

function loadCustomElementsRemote(): any {
    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', 'custom-elements.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = `${request.status} - ${request.statusText}`;
    };
    request.send(null);

    if (error) {
        throw new Error(error);
    }

    const customElements = JSON.parse(output);

    return customElements;
}

function loadCustomElementsModuleFor(elementName: string, customElements: any) {
    return customElements.modules.find((module: any) => module.declarations.find((d: any) => (d.tagName === elementName && d.customElement) || d.name === elementName));
}

function loadCustomElementsModuleForRemote(elementName: string) {
    const customElements = loadCustomElementsRemote();
    return loadCustomElementsModuleFor(elementName, customElements);
}

function loadSlotFor(elementName: string, slotName: string, customElements: any) {
    const module = loadCustomElementsModuleFor(elementName, customElements);
    return loadSlotForModule(module, slotName);
}

function loadSlotForRemote(elementName: string, slotName: string) {
    const module = loadCustomElementsModuleForRemote(elementName);
    return loadSlotForModule(module, slotName);
}

function loadSlotForModule(elementModule: any, slotName: string): { name: string; description: string } {
    const declaration = elementModule.declarations.find((d: any) => d.slots && d.slots.length > 0 && d.slots.find((s: any) => s.name === ''));
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

function loadDefaultSlotFor(elementName: string, customElements: any) {
    const module = loadCustomElementsModuleFor(elementName, customElements);
    return loadDefaultSlotForModule(module);
}

function loadDefaultSlotForRemote(elementName: string) {
    const module = loadCustomElementsModuleForRemote(elementName);
    return loadDefaultSlotForModule(module);
}

function loadDefaultSlotForModule(elementModule: any) {
    return loadSlotForModule(elementModule, '');
}

function assignToSlot(slotName: string, rawHtml: string) {
    if (!rawHtml || !slotName) return rawHtml;

    const parser = new DOMParser();

    const doc = parser.parseFromString(rawHtml, 'text/xml');
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
        // parsing failed
        return rawHtml;
    }

    // parsing succeeded
    const element = doc.documentElement;
    element.removeAttribute('slot');
    element.setAttribute('slot', slotName);

    const serializer = new XMLSerializer();
    rawHtml = serializer.serializeToString(doc);

    return rawHtml;

}

function markdownCode(code: string, lang: string = '') {
    const md = `

\`\`\`{lang}

{code}

\`\`\`

  `.replace('{lang}', lang).replace('{code}', code);

    return md;
}

function markdownCodeRemote(src: string, lang: string = '') {
    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', src, false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = `${request.status} - ${request.statusText}`;
    };
    request.send(null);

    if (error) {
        throw new Error(error);
    }

    return markdownCode(output, lang);
}

function loadFileRemote(src: string) {
    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', src, false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = `${request.status} - ${request.statusText}`;
    };
    request.send(null);

    if (error) {
        throw new Error(error);
    }
    return output;
}

function loadThemesListRemote() {
    let error = undefined;
    let output = '';
    const request = new XMLHttpRequest();
    request.open('GET', 'themes-list.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = `${request.status} - ${request.statusText}`;
    };
    request.send(null);

    if (error) {
        throw new Error(error);
    }

    const list = JSON.parse(output);

    return list.themes;
}

function formatMarkdownCodeElements(str: string, lang: string = 'js') {
    if (!str) {
        return str;
    }
    return str.replaceAll(`${codeSnippet}`, `\r\n${codeSnippet}`)
        .replaceAll(`${codeSnippet}${lang}`, `${codeSnippet}${lang}\r\n`);
}


function filterJsDocLinks(jsdoc: string) {
    if (!jsdoc) return jsdoc;

    const renderLink = ((link: { tag: string; text: string; url: string; raw: string; }) => {
        if (!link.url.includes(':')) {
            // Local markdown links are not valid in the properties section of storybook
            return `**${link.text}**`;
        }
        return `[${link.text}](${link.url}`;
    });

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
const raw = (strings: TemplateStringsArray) => strings.join('\r\n');


export {
    loadCustomElementsRemote,
    loadCustomElementsModuleFor,
    loadCustomElementsModuleForRemote,
    loadSlotFor,
    loadSlotForModule,
    loadSlotForRemote,
    loadDefaultSlotFor,
    loadDefaultSlotForRemote,
    loadDefaultSlotForModule,
    loadCssPropertiesRemote,
    loadCssProperties,
    loadThemeVariablesRemote,
    loadFileRemote,
    markdownCode,
    markdownCodeRemote,
    loadThemesListRemote,
    filterJsDocLinks,
    formatMarkdownCodeElements,
    assignToSlot,
    raw
};