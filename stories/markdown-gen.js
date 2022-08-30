/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const jsdoc = require('@innofake/jsdoc-api-debuggable');
const jsdocParse = require('jsdoc-parse');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

if (!fs.existsSync('custom-elements.json')) {
    console.warn('No \'custom-elements.json\' available. Attempting to generate');
    execSync('npm run docs:custom-elements');
}

if (!fs.existsSync('dist')) {
    console.warn('No \'dist\' available. Attempting Typescript compile');
    execSync('npm run compile');
}

const manifestRaw = fs.readFileSync('custom-elements.json', 'utf-8');
const manifest = JSON.parse(manifestRaw);
const codeSnippet = '```';

const groupedManifests = [];
manifest.modules.forEach(module => {
    if (module.path.endsWith('.ts') &&
        !module.path.endsWith('index.ts') &&
        !module.path.includes('stories') &&
        !module.path.toLowerCase().includes('story') &&
        !module.path.toLowerCase().includes('style') &&
        !module.path.toLowerCase().includes('icon') &&
        !module.path.toLowerCase().includes('internal') &&
        !module.path.includes('test') &&
        !module.exports.find(ex => ex.kind === 'custom-element-definition') &&
        module.exports.find(ex => ex.kind === 'js')
    ) {
        const dir = path.dirname(module.path);
        if (!groupedManifests[dir]) {
            groupedManifests[dir] = [];
        }
        
        groupedManifests[dir].push(module.path);
    }
});

for (const dir in groupedManifests) {
    if (Object.hasOwnProperty.call(groupedManifests, dir)) {
        const manifests = groupedManifests[dir].map(f => f.replace('src', 'dist').replace('.ts', '.js'));
        let sections = [];
        manifests.forEach(file => {
            const docsRaw = jsdoc.explainSync({ files: file });
            const docs = jsdocParse(docsRaw);

            sections.push(generateMarkdownSection(file, docs));
        });

        const markdown = generateMarkdown(sections);
        fs.writeFileSync(`${dir}/README.md`, markdown);
    }
}

function generateMarkdown(sections) {
    return sections.join('\r\n\r\n');
}

function generateMarkdownSection(file, docs) {

    let section = '\r\n';

    const constructor = docs.find(d => d.kind === 'constructor');
    const classDef = docs.find(d => d.kind === 'class');

    if (!classDef) {
        const anyMember = docs.find(d => d.memberof);
        if (anyMember) {
            section += `# \`${anyMember.memberof}\``;
        }
    } else {
        section += `# \`${classDef.name}\``;
        section += '\r\n';
        section += fixCodeElements(filterLinks(classDef.description));
        section += '\r\n';

        section += getExamples(classDef);
    }

    if (constructor) {
        if (constructor.description) {
            section += '\r\n';
            section += fixCodeElements(filterLinks(constructor.description));
            section += '\r\n';
        }

        section += getExamples(constructor);
    }

    const instanceMembers = docs.filter(d => d.kind === 'member' && d.scope === 'instance');
    
    if (instanceMembers && instanceMembers.length > 0) {
        section += '\r\n';
        section += '## Instance Members';

        section += '\r\n';
        section += '<table>';
        section += '<thead>';
        section += '<tr>';
        section += '<th>Name</th>';
        section += '<th>Type</th>';
        section += '<th>Description</th>';
        section += '<th>Example</th>';
        section += '</tr>';
        section += '</thead>';
        section += '<tbody>';

        instanceMembers.forEach(member => {
            section += '\r\n';
            section += '<tr><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${member.name}\``;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${getType(member)}\``;
            section += '\r\n';
            section += '\r\n';
            section += `</td><td>${fixCodeElements(filterLinks(member.description))}</td><td>`;
            section += '\r\n';
            section += '\r\n';
            section += `${getExamples(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td></tr>';
        });
        section += '\r\n';
        section += '</tbody>';
        section += '</table>';
        section += '\r\n';
    }

    const globalMembers = docs.filter(d => d.kind === 'member' && d.scope === 'global');
    
    if (globalMembers && globalMembers.length > 0) {
        section += '\r\n';
        section += '## Global Members';

        section += '\r\n';
        section += '<table>';
        section += '<thead>';
        section += '<tr>';
        section += '<th>Name</th>';
        section += '<th>Type</th>';
        section += '<th>Description</th>';
        section += '<th>Example</th>';
        section += '</tr>';
        section += '</thead>';
        section += '<tbody>';

        globalMembers.forEach(member => {
            section += '\r\n';
            section += '<tr><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${member.name}\``;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${getType(member)}\``;
            section += '\r\n';
            section += '\r\n';
            section += `</td><td>${fixCodeElements(filterLinks(member.description))}</td><td>`;
            section += '\r\n';
            section += '\r\n';
            section += `${getImport(file,member)}`;
            section += `${getExamples(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td></tr>';
        });
        section += '\r\n';
        section += '</tbody>';
        section += '</table>';
        section += '\r\n';
    }

    const instanceFunctions = docs.filter(d => d.kind === 'function' && d.scope === 'instance');
    
    if (instanceFunctions && instanceFunctions.length > 0) {
        section += '\r\n';
        section += '## Instance Functions';

        section += '\r\n';
        section += '<table>';
        section += '<thead>';
        section += '<tr>';
        section += '<th>Name</th>';
        section += '<th>Description</th>';
        section += '<th>Parameters</th>';
        section += '<th>Return</th>';
        section += '<th>Example</th>';
        section += '</tr>';
        section += '</thead>';
        section += '<tbody>';

        instanceFunctions.forEach(member => {
            section += '\r\n';
            section += '<tr><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${member.name}\``;
            section += '\r\n';
            section += '\r\n';
            section += `</td><td>${fixCodeElements(filterLinks(member.description))}</td><td>`;
            section += '\r\n';
            section += '\r\n';
            section += `${getParameters(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `${getReturns(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `${getExamples(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td></tr>';
        });
        section += '\r\n';
        section += '</tbody>';
        section += '</table>';
        section += '\r\n';
    }

    const globalFunctions = docs.filter(d => d.kind === 'function' && d.scope === 'global');
    
    if (globalFunctions && globalFunctions.length > 0) {
        section += '\r\n';
        section += '## Global Functions';

        section += '\r\n';
        section += '<table>';
        section += '<thead>';
        section += '<tr>';
        section += '<th>Name</th>';
        section += '<th>Description</th>';
        section += '<th>Parameters</th>';
        section += '<th>Return</th>';
        section += '<th>Example</th>';
        section += '</tr>';
        section += '</thead>';
        section += '<tbody>';

        globalFunctions.forEach(member => {
            section += '\r\n';
            section += '<tr><td>';
            section += '\r\n';
            section += '\r\n';
            section += `\`${member.name}\``;
            section += '\r\n';
            section += '\r\n';
            section += `</td><td>${fixCodeElements(filterLinks(member.description))}</td><td>`;
            section += '\r\n';
            section += '\r\n';
            section += `${getParameters(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `${getReturns(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td><td>';
            section += '\r\n';
            section += '\r\n';
            section += `${getImport(file,member)}`;
            section += `${getExamples(member)}`;
            section += '\r\n';
            section += '\r\n';
            section += '</td></tr>';
        });
        section += '\r\n';
        section += '</tbody>';
        section += '</table>';
        section += '\r\n';
    }

    section += '\r\n\r\n![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)\r\n\r\n';
    return section;
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

function getType(member) {
    if (member && member.type && member.type.names) {
        return `${member.type.names.map(n => `\`${n}\``).join('|')}`;
    }
    return '';
}

function getParameters(member) {
    if (member && member.params) {
        return member.params.map(p => `${p.name} {${getType(p)}} - ${fixCodeElements(filterLinks(p.description))}`).join('\r\n\r\n ');
    }
    return '';
}

function getReturns(member) {
    if (member && member.returns) {
        return member.returns.map(r => `{${getType(r)}} - ${fixCodeElements(filterLinks(r.description))}`).join('\r\n\r\n ');
    }
    return '';
}

function getImport(file, member) {
    return fixCodeElements(`${codeSnippet}js
    import { ${member.name} } from '${path.dirname(file).replace('dist/', '@capitec/omni-components/')}';
    ${codeSnippet}`);
}

function getExamples(member) {
    let str = '';
    if (member && member.examples) {
        member.examples.forEach(ex => {
            str += '\r\n';
            str += `${codeSnippet}js
${ex}
${codeSnippet}
            `;
            str += '\r\n';
        });
    }
    return fixCodeElements(str);
}