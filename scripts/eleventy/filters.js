import { loadCustomElementsModuleByFileFor } from '../../dist/utils/StoryUtils.js';

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
    const imp = declaration.import ? declaration.import.replace(/```/gi, '').replace('js ', '').replace(/(\r\n|\n|\r)/gm, '') : null;
    return imp;
}

export function getAttributes(value, componentName) {
    const declaration = getComponentDeclaration(value, componentName);
    return declaration.attributes;
}

export function getComponentDeclaration(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    return declaration;
}