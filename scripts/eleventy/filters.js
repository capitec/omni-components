import { loadCustomElementsModuleByFileFor } from '../../dist/utils/StoryUtils.js';

export function getTagName(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const exp = component.exports.find(e => e.kind === 'custom-element-definition');
    return exp.name;
}

export function getDescription(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    const description = declaration.description;
    return description;
}

export function getImport(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    const imp = declaration.import.replace(/```/gi, '').replace('js ', '').replace(/(\r\n|\n|\r)/gm, '');
    return imp;
}