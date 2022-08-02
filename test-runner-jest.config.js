const { getJestConfig } = require('@storybook/test-runner');

module.exports = {
  // The default configuration comes from @storybook/test-runner
  ...getJestConfig(),
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
    reporters: [
      'jest-standard-reporter',
      'jest-github-actions-reporter'
    ],
    testLocationInResults: true
}