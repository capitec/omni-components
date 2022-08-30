/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const codeSnippet = '```';

if (!fs.existsSync('custom-elements.json')) {
    console.warn('No \'custom-elements.json\' available. Attempting to generate');
    execSync('npm run docs:custom-elements');
}

function fixCodeElements(str) {
    if (!str) {
        return '';
    }
    return str.replaceAll(`${codeSnippet}`, `\r\n${codeSnippet}`)
       .replaceAll(`${codeSnippet}js`,`${codeSnippet}js\r\n`);
}

function filterLinks(jsdoc) {
    if (!jsdoc) return jsdoc;
  
    // const renderLink = ((link) => `<a href="${link.url}">${link.text}</a>`);
    const renderLink = ((link) => `[${link.text}](${(link.url.includes(':') ? '' : '#')}${(link.url.includes(':') ? `${link.url}` : `${link.url.toLowerCase()}`)})`);
  
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


const manifestRaw = fs.readFileSync('custom-elements.json', 'utf-8');
const manifest = JSON.parse(manifestRaw);

let markdown = '';
markdown += '# UI Components';

markdown += '\r\n';
markdown += '<table>';
markdown += '<thead>';
markdown += '<tr>';
markdown += '<th>Tag Name</th>';
markdown += '<th>Class</th>';
markdown += '<th>Description</th>';
markdown += '</tr>';
markdown += '</thead>';
markdown += '<tbody>';
manifest.modules.forEach(module => {
    if (module.path.endsWith('.ts') &&
        !module.path.endsWith('index.ts') &&
        !module.path.includes('stories') &&
        !module.path.toLowerCase().includes('story') &&
        // !module.path.toLowerCase().includes('icons') &&
        !module.path.toLowerCase().includes('internal') &&
        !module.path.includes('test') &&
        (module.exports.find(ex => ex.kind === 'custom-element-definition') || module.declarations.find(d => d.tagName && d.customElement))
    ) {
        const dir = path.dirname(module.path);
        const tagDeclaration = module.declarations.find(d => d.tagName && d.customElement);
        markdown += '<tr>';
        markdown += '<td>';
        markdown += '\r\n';
        markdown += '\r\n';
        markdown += `[${tagDeclaration.tagName}](${dir}/README.md)`;
        markdown += '\r\n';
        markdown += '\r\n';
        markdown += '</td>';
        markdown += '<td>';
        markdown += tagDeclaration.name;
        markdown += '</td>';
        markdown += '<td>';
        markdown += '\r\n';
        markdown += '\r\n';
        markdown += fixCodeElements(filterLinks(tagDeclaration.description));
        markdown += '\r\n';
        markdown += '\r\n';
        markdown += '</td>';
        markdown += '</tr>';
    }
});
markdown += '</tbody>';
markdown += '</table>';
markdown += '\r\n';
markdown += '\r\n';

fs.writeFileSync('LIST.md', markdown);