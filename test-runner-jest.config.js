/* eslint-disable @typescript-eslint/no-var-requires */
const { getJestConfig } = require('@storybook/test-runner');

// The default configuration comes from @storybook/test-runner
const defaultConfig = getJestConfig();
module.exports = {
    ...defaultConfig,
    /** Add your own overrides below
     * @see https://jestjs.io/docs/configuration
     */
    testEnvironmentOptions: {
        ...defaultConfig.testEnvironmentOptions,
        'jest-playwright': {
            ...defaultConfig?.testEnvironmentOptions['jest-playwright'],
            contextOptions: {
                ...defaultConfig?.testEnvironmentOptions['jest-playwright']?.contextOptions,
                userAgent: 'Storybook Test Runner',
            }
        }
    },
    reporters: [
        'jest-github-actions-reporter'
    ],
    testLocationInResults: true
};