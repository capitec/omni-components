import { readFile } from 'fs/promises';
import { globbySync } from 'globby';
import { loadCustomElementsModuleByFileFor } from '../../dist/utils/StoryUtils.js';

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