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

var head = document.head || document.getElementsByTagName('head')[0];
export const customTheme = {
	counter: 0,
	style: document.createElement('style')
};

customTheme.style.appendChild(document.createTextNode(':root {\r\n\t\r\n}'));

function clearElements(el) {
	el.innerHTML = '';
	var child = el.lastElementChild;
	while (child) {
		el.removeChild(child);
		child = el.lastElementChild;
	}
}

export function updateTheme(cssRaw) {
				
	clearElements(customTheme.style);
	customTheme.style.appendChild(document.createTextNode(cssRaw));
}

export async function uploadTheme (e) {
	if (e.target.files.length > 0) {
		const inputField = e.target;
		const file = e.target.files[0];

		await new Promise((resolve,reject) => {
		
			let reader = new FileReader();
			reader.onload = (evt) => {
				let cssRaw = evt.target.result;
				updateTheme(cssRaw);
				inputField.value = "";

				resolve();	
			};
			reader.onerror = (event) => {
				reject(event.target.error)
			}
			reader.onabort = (event) => {
				reject(event.target.error)
			}
			reader.readAsText(file);
		});
	}
}

cssFiles['Custom Theme'] = {
	use: () => {
	  customTheme.counter++;
	  head.appendChild(customTheme.style);
	},
	unuse: () => {
	  customTheme.counter--;
	  if (customTheme.counter < 1) {
		  customTheme.counter = 0;
		  if (customTheme.style && customTheme.style.parentElement) {
			customTheme.style.parentElement.removeChild(customTheme.style);
		  }
	  }
	}
};

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
			order: ['Welcome', '*', 'Contributing', 'UI Components' ],
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
						 .replaceAll("[object Object]", "{}")
						 // Remove empty string assignments to fix boolean attributes
						 .replaceAll("=\"\"", "");
						 // Remove any properties with empty string assignments at the end of the html tag
			// 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")>"), " >")
						 // Remove any properties with empty string assignments within the tag
			// 			 .replace(new RegExp("(([\\r\\n]+| )([^ \\r\\n])*)=(\"([^\"]|\"\"){0}\")"), " ");
			return pretty(input)
		},
		page: CustomDocsPage
	}
}