import { loadCustomElementsModuleByFileFor, markdownCodeToHtml } from '../../dist/utils/StoryUtils.js';

export function getTagName(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const exp = component.exports.find(e => e.kind === 'custom-element-definition');
    return exp.name;
}

export function getDescription(value, componentName) {
    const component = loadCustomElementsModuleByFileFor(componentName, value);
    const declaration = component.declarations.find(d => d.name === componentName);
    return markdownCodeToHtml(declaration.description);
}