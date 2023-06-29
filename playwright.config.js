// @ts-check
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
    globalSetup: './.tooling/playwright/globalSetup.js',
    globalTeardown: './.tooling/playwright/globalTeardown.js',
    snapshotDir: './.tooling/tests/screenshots',
    snapshotPathTemplate: '{snapshotDir}/{testName}/{platform}/{projectName}/{arg}{ext}',
    /* Maximum time one test can run for. */
    timeout: 60 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.3,
            scale: 'css',
        },
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.3
        }
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI && !process.env.PW_NO_RETRIES ? 2 : 0,
    /* Limit parallel tests on CI. */
    workers: process.env.CI ? 4 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            'html',
            { open: process.env.PWTEST_SKIP_TEST_OUTPUT ? 'never' : 'on-failure' }
        ]
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        userAgent: 'Test Runner',
        baseURL: `http://${process.env.PLAYWRIGHT_HOST_ORIGIN ?? 'localhost'}:6006`,

        colorScheme: 'light',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                userAgent: 'Test Runner'
            },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                userAgent: 'Test Runner'
            },
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                userAgent: 'Test Runner'
            },
        },

        /* Test against mobile viewports. */
        {
            name: 'Mobile Chrome',
            use: {
                ...devices['Pixel 5'],
                userAgent: 'Test Runner'
            },
        },
        
        {
          name: 'Mobile Safari',
          use: {
            ...devices['iPhone 12'],
                userAgent: 'Test Runner'
          },
        },
        
        {
          name: 'iPhone 13 Pro Max',
          use: {
            ...devices['iPhone 13 Pro Max'],
                userAgent: 'Test Runner'
          },
        },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //         userAgent: 'Test Runner'
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //         userAgent: 'Test Runner'
        //   },
        // },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //     command: 'npm run serve',
    //     port: 6006,
    // },
};

export default config;
