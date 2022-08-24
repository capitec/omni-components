import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import pretty from 'pretty';
import { loadThemesListRemote } from '../src/utils/StoryUtils';

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import CustomDocsPage from '../stories/DocsPage.mdx';

async function importCss(file) {
	return await import(`!!style-loader?injectType=lazyStyleTag!css-loader!../themes/${file}`);
}

function lazyCssPromise(cssPromise) {
	return {
		use: async () => {
			(await cssPromise).use();
		},
		unuse: async () => {
			(await cssPromise).unuse();
		}
	}
}

let cssFiles = {};
loadThemesListRemote().forEach(f => {
	const theme = importCss(f);
	cssFiles[f] = lazyCssPromise(theme);
});

// Auto generate properties in the docs view from the custom elements manifest.
setCustomElementsManifest(customElements);

// Activate the theme switcher addon.
export const decorators = [
	cssVariablesTheme
];

// Configure global settings for all stories.
export const parameters = {
	controls: {
		expanded: true,
		matchers: {
			color: /(background|color|fill)$/i,
			date: /Date$/,
			boolean: /.*/,
		},
		exclude: /(^_.*|^#.*|^\-\-.*)$/ // hide private properties
	},
	backgrounds: {
		default: 'light',
		values: [
			{ name: 'white', value: '#ffffff' },
			{ name: 'light', value: '#f0f0f0' },
			{ name: 'dark', value: '#202124' },
		],
	},
	cssVariables: {
		files: cssFiles
	},
	options: {
		storySort: {
			order: ['Welcome', 'UI Components', '*'],
		}
	},
	viewMode: 'docs',
	docs: {
		source: {
			state: 'open',
			format: false
		},
		transformSource: (input, story) => {
						 // Remove test ids from displayed source
			input = input.replace(new RegExp("data-testid=(\"([^\"]|\"\")*\")"), "")
						 // Update any object references to curly braces for easier reading
						 .replace("[object Object]", "{}");
						 // Remove any properties with empty string assignments at the end of the html tag
			// 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")>"), " >")
						 // Remove any properties with empty string assignments within the tag
			// 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")"), " ");
			return pretty(input)
		},
		page: CustomDocsPage
	}
}