import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import pretty from 'pretty';

import basicTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!../themes/default-theme.css'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';

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
		files: {
			'default': basicTheme
		}
	},
	options: {
		storySort: {
			order: ['Welcome', 'UI Components', [ [ 'Docs', '*' ] ]],
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
		}
	}
}