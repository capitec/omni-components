var webpack = require('webpack');

module.exports = {
	framework: "@storybook/web-components",
	core: {
	  builder: 'webpack5',
	},
	stories: [
		"../stories/*.stories.@(mdx)",
		"../dist/**/*.stories.@(js)",
		"../src/**/*.stories.@(mdx)",

	],
	addons: [
		'@etchteam/storybook-addon-css-variables-theme',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-interactions',
		'@storybook/addon-links',
		'@storybook/addon-coverage',
		{
			name: '@storybook/addon-storysource',
			options: {
				loaderOptions: {
					injectStoryParameters: false,
				},
			},
		},
		{
			name: '@storybook/addon-docs',
			options: {
				sourceLoaderOptions: {
					injectStoryParameters: false,
				},
			},
		},
		"@innofake/storybook-addon-cssprops"
	],
	features: {
		postcss: false,
		interactionsDebugger: true,
		previewCsfV3: true,
	},
	staticDirs: [
		{ from: '../custom-elements.json', to: 'custom-elements.json' },
		{ from: '../themes-list.json', to: 'themes-list.json' },
		{ from: '../themes', to: '/themes' },
		{ from: '../stories/assets', to: '/assets' }
	],
	webpackFinal: async (config, { configType }) => {

		config.devtool = false,
		config.plugins.push(new webpack.SourceMapDevToolPlugin({
			exclude: ['node_modules', 'vendors'],
			moduleFilenameTemplate: info => {
				if (info.resourcePath && info.resourcePath.includes('../../')) {
					// Fix relative source-maps to src as path is relative to dist directory and needs to be relative to web root instead
					return `webpack:///${info.resourcePath.replace('../../', "./")}?${info.loaders}`;
				}
				return `webpack:///${info.resourcePath}?${info.loaders}`;
			  } 
		}))
		config.watchOptions = {
			ignored: [
				'**/node_modules'
			],
		}

		return config;
	}
}