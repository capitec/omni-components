import { loadCustomElementsModuleByFileFor, loadCssProperties, filterJsDocLinks } from '../../dist/utils/StoryUtils.js';

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

export function getImport(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    const imp = declaration.import ? declaration.import.replace(/```/gi, '').replace('js', '').replace(/(\r\n|\n|\r)/gm, '') : null;
    return imp;
}

export function getAttributes(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.attributes.map(a => {
        return {
            ...a,
            description: filterJsDocLinks(a.description)
        };
    });
}

export function getEvents(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.events.map(e => {
        return {
            ...e,
            description: filterJsDocLinks(e.description)
        };
    });
}

export function getSlots(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.slots.map(s => {
        return {
            ...s,
            description: filterJsDocLinks(s.description)
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

    return keys.map(name => {
        const prop = cssProperties[name];
        return {
            name: `--${name}`,
            description: filterJsDocLinks(prop.description),
            category: prop.subcategory
        };
    });
}