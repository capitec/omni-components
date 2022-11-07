import { readFile } from 'fs/promises';
import { globby } from 'globby';
import { loadCustomElementsModuleByFileFor } from '../../dist/utils/StoryUtils.js';

export async function components() {
    const stories = await globby('./dist/**/*.stories.js');
    const customElementDefinitions = await customElements();
    const response = [];

    for (const story of stories) {
        const name = story.match(/([A-Z])\w+/g)[0];
        const module = loadCustomElementsModuleByFileFor(`${name}.stories`,customElementDefinitions);
        const moduleStories = ['Interactive',...module.exports.map(e => e.name).filter(s => s !== 'default' && s !== 'Interactive') ];
        response.push({
            path: story.replace('./', '/'),
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