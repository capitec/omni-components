/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsdoc = require(`@innofake/jsdoc-api-debuggable`);
const jsdocParse = require('jsdoc-parse');
const fs = require(`fs`);

try {
    const docsRaw = jsdoc.explainSync({ files: 'dist/styles/ComponentStyles.js' });
    const docs = jsdocParse(docsRaw);
    const defaultExport = docs.find(d => d.id === 'module.exports');
    var cssVars = defaultExport.customTags.filter(ct => ct.tag === 'cssprop');

    let themeVariables = {};
    cssVars.forEach(cssProp => {
        let parts = cssProp.value.split(` - `);
        let propName = parts[0];
        let description = parts[parts.length - 1];
        let cssProperty = {
            control: propName.includes('color') || propName.includes('colour') || propName.includes('fill') ? 'color' : 'text',
            description: parts.length > 1 ? description : '',
            category: 'CSS Variables',
            subcategory: 'Theme Variables',
            value: ''
        };

        themeVariables[propName.replace(`--`, ``)] = cssProperty;

    });

    fs.writeFileSync('theme-variables.json', JSON.stringify(themeVariables, null, 2));
} catch (error) {
    console.error(error);
}