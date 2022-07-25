import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

addons.setConfig({
	enableShortcuts: false,
	theme: create({
		base: 'dark',
		brandTitle: '<small style="font-weight: normal">Omni</small> <br> Components',
		brandUrl: 'https://www.npmjs.com/org/innofake'
	})
});