import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const codeSnippet = '```';
const componentTemplate = `
import { {Component} } from '@capitec/omni-components/{component}';
export { {Component} } from '@capitec/omni-components/{component}';
import { createComponent } from '@lit-labs/react';
import React from 'react';

import '@capitec/omni-components/{component}';

/**
 * {description}
 */
export const Omni{Component} = createComponent({
  tagName: '{tag-name}',
  elementClass: {Component},
  react: React,
  events: {
    {events}
  }
});
`;

const typingsTemplate = `
import type { ReactWebComponent, EventName } from '@lit-labs/react';
import type { {Component} } from '@capitec/omni-components/{component}';
export type { {Component} } from '@capitec/omni-components/{component}';

/**
 * {description}
 */
export const Omni{Component}: ReactWebComponent<{Component}, {
    {event-types}
  }>;
`;

/**
 * Convert kebab-case event names to all lowercase oneventnames
 */
function reactEventName(name) {
    return `on${name.replace(new RegExp('-', 'g'), '')}`.toLowerCase();
}

/**
 * Apply jsdoc using event description
 */
function jsdocEvent(event) {
    return `
    /**
     * ${event.description}
     */
    `;
}

// Ensure a custom elements manifest is available
if (!fs.existsSync('../../custom-elements.json')) {
    console.warn('No \'custom-elements.json\' available. Attempting to generate');
    execSync('cd ../../ && npm run docs:custom-elements');
}

// Prepare generated working directory
const outDir = 'dist';
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, {
        force: true,
        recursive: true
    })
}
fs.mkdirSync(outDir);

const manifestRaw = fs.readFileSync('../../custom-elements.json', 'utf-8');
const manifest = JSON.parse(manifestRaw);

const packageFile = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const components = [];


// Generate markdown table to populate with component information
let markdown = '';
markdown += `

[](#Components)

## Components

`;
markdown += '<table style="max-width: 1500px;">';
markdown += '<thead>';
markdown += '<tr>';
markdown += '<th style="width: 100px;">React Component</th>';
markdown += '<th style="width: 400px;">Omni Component</th>';
markdown += '<th style="min-width: 800px;">Usage</th>';
markdown += '</tr>';
markdown += '</thead>';
markdown += '<tbody>';

manifest.modules.forEach(module => {
    if (module.path.endsWith('.ts') &&
        !module.path.endsWith('index.ts') &&
        !module.path.includes('stories') &&
        !module.path.toLowerCase().includes('story') &&
        !module.path.toLowerCase().includes('internal') &&
        !module.path.toLowerCase().includes('utils') &&
        !module.path.includes('test') &&
        (module.exports.find(ex => ex.kind === 'custom-element-definition') || module.declarations.find(d => d.tagName && d.customElement))
    ) {
        try {
            const tagDeclaration = module.declarations.find(d => d.tagName && d.customElement);
            if (tagDeclaration.ignore) {
                return;
            }
            const tagName = tagDeclaration.tagName;
            const Component = tagDeclaration.name;
            const component = path.basename(path.dirname(module.path));
            const description = tagDeclaration.description;

            const componentPath = `${outDir}/${component}`;
            
            components.push(component);

            let events = `${tagDeclaration.events?.map(e => `${jsdocEvent(e)}${reactEventName(e.name)}: '${e.name}'`)?.join(',\r\n') ?? ''}`;
            let eventTypes = `${tagDeclaration.events?.map(e => `${jsdocEvent(e)}${reactEventName(e.name)}: ${e.type?.text ? `EventName<${e.type.text}>`:  `'${e.name}'`}`)?.join(',\r\n') ?? ''}`;
            
    
            // Generate code and typings for the component from templates
            let componentCode = componentTemplate.replace(new RegExp('{component}', 'g'), component)
                                            .replace(new RegExp('{Component}', 'g'), Component)
                                            .replace(new RegExp('{tag-name}', 'g'), tagName)
                                            .replace(new RegExp('{tag-name}', 'g'), tagName)
                                            .replace(new RegExp('{description}', 'g'), description)
                                            .replace(new RegExp('{events}', 'g'), events);
    
            let componentTypings = typingsTemplate.replace(new RegExp('{component}', 'g'), component)
                                            .replace(new RegExp('{Component}', 'g'), Component)
                                            .replace(new RegExp('{tag-name}', 'g'), tagName)
                                            .replace(new RegExp('{description}', 'g'), description)
                                            .replace(new RegExp('{event-types}', 'g'), eventTypes);
    
             
            if (!fs.existsSync(componentPath)) {
                fs.mkdirSync(componentPath);
            }
            fs.writeFileSync(`${componentPath}/Omni${Component}.jsx`, componentCode, 'utf-8');
            fs.writeFileSync(`${componentPath}/Omni${Component}.d.ts`, componentTypings, 'utf-8');

            // Add component to exports of index
            const index = `${componentPath}/index.jsx`;
            if (!fs.existsSync(index)) {
                fs.writeFileSync(index, '', 'utf-8');
            }
            let indexCode = fs.readFileSync(index, 'utf-8');
            const newExport = `export { ${Component}, Omni${Component} } from './Omni${Component}';`;
            if (!indexCode.includes(newExport)) {
                indexCode = `${indexCode}\r\n${newExport}`;
            }
            fs.writeFileSync(index, indexCode, 'utf-8');
            fs.writeFileSync(`${componentPath}/index.d.ts`, indexCode, 'utf-8');
            
            // Ensure package.json has a files list
            if (!packageFile.files) {
                packageFile.files = [];
            }
    
            // Update package files for every component if not already there
            if (!packageFile.files.find(line => line === component)) {
                packageFile.files.push(component);
            }

            // Add component row into markdown table
            markdown += '<tr>';
            markdown += '<td>';
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += `Omni${Component}`;
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += '</td>';
            markdown += '<td>';
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += `***${tagName}***`;
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += '</td>';
            markdown += '<td >';
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += `${codeSnippet}js

import { Omni${Component} } from '@capitec/omni-components-react/${component}';

${codeSnippet}
`;
            markdown += '\r\n';
            markdown += '\r\n';
            markdown += '</td>';
            markdown += '</tr>';
            
            
        } catch (error) {
            console.error(error);
        }
    }
});

markdown += '</tbody>';
markdown += '</table>';
markdown += '\r\n';
markdown += '\r\n';

// Clean up package files for non-existent components
packageFile.files = packageFile.files.filter(file => file.startsWith('!') || components.includes(file));

// Set package version and dependency to match Omni Components version
const localOmniComponentsPackage = JSON.parse(fs.readFileSync('../../package.json', 'utf-8'));
packageFile.version = localOmniComponentsPackage.version;
packageFile.dependencies['@capitec/omni-components'] = `^${localOmniComponentsPackage.version}`;

delete packageFile.private;
delete packageFile.scripts;
delete packageFile.devDependencies;

// Write out package file to dist
fs.writeFileSync(`${outDir}/package.json`,JSON.stringify(packageFile, null, 4), 'utf-8');

// Generate README for dist
let readme = fs.readFileSync('README.md', 'utf-8');
readme += markdown;
fs.writeFileSync(`${outDir}/README.md`, readme, 'utf-8')
