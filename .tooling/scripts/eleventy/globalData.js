import { readFile } from 'fs/promises';
import { globbySync } from 'globby';
import { loadCustomElementsModuleByFileFor } from '../../../dist/utils/StoryUtils.js';
import markdownIt from 'markdown-it';
import { slug } from 'github-slugger';

export async function components() {
    const stories = globbySync('./dist/**/*.stories.js');
    const customElementDefinitions = await customElements();
    const response = [];

    for (const story of stories) {
        const name = story.match(/([A-Z])\w+/g)[0];
        const module = loadCustomElementsModuleByFileFor(`${name}.stories`,customElementDefinitions);
        const moduleStories = module.exports.map(e => e.name).filter(s => s !== 'default' && s !== 'Interactive');
        
        if (module.exports.map(e => e.name).find(s => s === 'Interactive')) {
            moduleStories.unshift('Interactive');
        }

        // console.log(name);

        response.push({
            path: story,
            srcPath: story.replace('.stories', '').replace('./dist', 'src').replace('js', 'ts'),
            name: name,
            stories: moduleStories
        });
    }

    return response;
}

export async function customElements() {
    const ce = await readFile('./custom-elements.json', 'utf-8');
    return JSON.parse(ce);
}

export async function search() {

    async function createMarkdownIndex(fileName, prefix, title) {

        // Read and parse the file.
        const text = await readFile(fileName, 'utf-8');
        const instance = new markdownIt();
        const md = instance.parse(text, {});

        // Create and return MD index.
        const result = [];
        let matches = [];

        md.forEach((token, index, arr) => {
            if (token.type === 'heading_open') {
                const link = slug(arr[index + 1].content);
                matches = [];
                result.push({
                    path: prefix + link,
                    data: matches,
                    type: 'md',
                    title: title
                })
            } else if (token.type === 'inline') {
                matches.push(token.content);
            }
        });

        return result;
    }

    async function createComponentIndex() {

        const components = globbySync('./dist/**/*.stories.js');
        const customElementDefinitions = await customElements();
        const result = [];

        for (const component of components) {
            const name = component.match(/([A-Z])\w+/g)[0];
            const moduleForStories = loadCustomElementsModuleByFileFor(`${name}.stories`, customElementDefinitions);
            const moduleForComponent = loadCustomElementsModuleByFileFor(`${name}`, customElementDefinitions);
            const moduleDescription = moduleForComponent.declarations.find(d => d.name === name).description;
            const moduleStories = moduleForStories.declarations.filter(s => s.name !== 'Interactive');

            // Add component itself to the index.
            result.push({
                path: `./components/${name.toLowerCase()}/`,
                data: [name.toLowerCase(), moduleDescription],
                type: 'component',
                title: name
            });

            // Add component stories to the index.
            for (const story of moduleStories) {
                result.push({
                    path: `./components/${name.toLowerCase()}/#story-${story.name.toLowerCase().replace('_', '-')}`,
                    data: [story.name.toLowerCase(), story.description ?? ''],
                    type: 'story',
                    title: name
                });
            }
        }

        return result;
    }

    const response = [
        ... await createComponentIndex(),
        ... await createMarkdownIndex('./INSTALLATION.md', './getting-started/#', 'Getting Started'),
        ... await createMarkdownIndex('./CONTRIBUTING.md', './contributing/#', 'Contributing')
    ];

    return response;
}