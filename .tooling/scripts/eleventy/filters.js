import { loadCustomElementsModuleByFileFor, loadCssProperties, transformFromJsdoc } from '../../../dist/utils/StoryUtils.js';
import path from 'path';

export function getTagName(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const exp = component.exports.find(e => e.kind === 'custom-element-definition');
    return exp.name;
}

export function getDescription(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    const description = declaration.description;
    return description;
}

export function getStatus(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    const status = declaration.status;
    return status;
}

export function getImport(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    const imp = declaration.import ? declaration.import.replace(/```/gi, '').replace('js', '').replace(/(\r\n|\n|\r)/gm, '') : null;
    return imp;
}

export function getReactImport(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    const ComponentName = declaration.name;
    const componentPath = path.basename(path.dirname(component.path));
    return `import { Omni${ComponentName} } from "@capitec/omni-components-react/${componentPath}";`;
}

export function getProperties(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.members?.filter(m => m.kind === 'field' && m.privacy !== 'private')?.map(a => {
        return {
            ...a,
            description: transformFromJsdoc(a.description)
        };
    });
}

function convertToParameterString(parametersList) {
    let parameters = '';

    if (!parametersList || parametersList.length === 0) {
        return parameters;
    }

    parametersList.forEach(p => {
        if (parameters) {
            parameters += ',\r\n';
        }
        if (!p.type) {
            console.log(p);
        }

        parameters += `${p.name} - ${p.type.text}`
    });

    return parameters;
}

export function getInstanceFunctions(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.members?.filter(m => m.kind === 'method' &&
        m.privacy !== 'private' &&
        m.privacy !== 'protected' &&
        m.description &&
        m.static?.toString() !== 'true' &&
        !m.name.startsWith('_'))?.map(a => {
            return {
                ...a,
                parameters: convertToParameterString(a.parameters),
                description: transformFromJsdoc(a.description),
                returnType: a.return?.type?.text ?? ''
            };
        });
}

export function getStaticFunctions(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.members?.filter(m => m.kind === 'method' &&
        m.privacy !== 'private' &&
        m.privacy !== 'protected' &&
        m.description &&
        m.static?.toString() === 'true' &&
        !m.name.startsWith('_'))?.map(a => {
            return {
                ...a,
                parameters: convertToParameterString(a.parameters),
                description: transformFromJsdoc(a.description),
                returnType: a.return?.type?.text ?? ''
            };
        });
}

export function getGlobalAttributes(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.globalAttributes?.map(a => {
        return {
            ...a,
            description: transformFromJsdoc(a.description)
        };
    });
}

export function getEvents(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.events?.map(e => {
        return {
            ...e,
            description: transformFromJsdoc(e.description)
        };
    });
}

export function getTypes(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    return component.typeAliases;
}

export function getSlots(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.slots?.map(s => {
        return {
            ...s,
            description: transformFromJsdoc(s.description)
        };
    });
}

export function getComponentDeclaration(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    return declaration;
}

export function getCSSProperties(value, componentName) {
    const tagName = getTagName(value, componentName);
    const cssProperties = loadCssProperties(tagName, value);
    const keys = Object.keys(cssProperties);

    const properties = keys?.map(name => {
        const prop = cssProperties[name];
        return {
            name: `--${name}`,
            description: transformFromJsdoc(prop.description),
            category: prop.subcategory
        };
    });

    const categories = properties.map(p => p.category).filter(distinct);

    return categories.map(c => {
        return {
            category: c,
            properties: properties.filter(p => p.category === c)
        }
    })
}

export function splitPascalCase(word) {
    var wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
    return word.match(wordRe).join(' ');
}

function distinct(value, index, self) {
    return self.indexOf(value) === index;
}