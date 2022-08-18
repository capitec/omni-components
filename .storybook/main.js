module.exports = {
  "framework": "@storybook/web-components",
  "stories": [
    "../stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../dist/**/*.stories.@(js|jsx|ts|tsx|mdx)",
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
	},
	staticDirs: [
		{ from: '../custom-elements.json', to: 'custom-elements.json' },
		{ from: '../theme-variables.json', to: 'theme-variables.json' },
		{ from: '../stories/assets', to: '/assets' }
	],
	webpackFinal: async (config, { configType }) => {

		config.watchOptions = {
			ignored: [
				'**/node_modules'
			],
		}

		return config;
	}
}