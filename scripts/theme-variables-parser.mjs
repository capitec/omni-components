import { explainSync } from '@innofake/jsdoc-api-debuggable';
import jsdocParse from 'jsdoc-parse';
import { writeFileSync } from 'fs';

try {
    const docsRaw = explainSync({ files: 'dist/styles/ComponentStyles.js' });
    const docs = jsdocParse(docsRaw);
    const defaultExport = docs.find(d => d.id === 'module.exports');
    var cssVars = defaultExport.customTags.filter(ct => ct.tag === 'cssprop');

    let themeVariables = {};
    cssVars.forEach(cssProp => {
        let parts = cssProp.value.split(' - ');
        let propName = parts[0];
        let description = parts[parts.length - 1];
        let cssProperty = {
            control: propName.includes('color') || propName.includes('colour') || propName.includes('fill') ? 'color' : 'text',
            description: parts.length > 1 ? description : '',
            category: 'CSS Variables',
            subcategory: 'Theme Variables',
            value: ''
        };

        themeVariables[propName.replace('--', '')] = cssProperty;

    });

    writeFileSync('theme-variables.json', JSON.stringify(themeVariables, null, 2));
} catch (error) {
    console.error(error);
}