import { expect as expectPatched, type Expect } from '@playwright/test';
export * from '@playwright/test';
import * as matchers from '@testing-library/jest-dom/matchers.js';

const playwrightMatchers = [
    'toBeAttached',
    'toBeChecked',
    'toBeDisabled',
    'toBeEditable',
    'toBeEmpty',
    'toBeEnabled',
    'toBeFocused',
    'toBeHidden',
    'toBeInViewport',
    'toBeOK',
    'toBeVisible',
    'toContainText',
    'toHaveAttribute',
    'toHaveClass',
    'toHaveCount',
    'toHaveCSS',
    'toHaveId',
    'toHaveJSProperty',
    'toHaveText',
    'toHaveTitle',
    'toHaveURL',
    'toHaveValue',
    'toHaveValues',
    'toHaveScreenshot',
    'toPass'
];

function extendExpect<T, U = jest.Expect>(initialExpect: T): U {
    const expect = ((initialExpect as any).default || initialExpect) as T & jest.Expect;

    // @TODO: This should be reverted once https://github.com/testing-library/jest-dom/pull/438 is merged
    // Some bundlers include an undefined `default` in the namespace import,
    // or __esmodule (a boolean) which cause expect.extend to throw.
    const validMatchers: any = { ...(matchers.default || matchers) };
    Object.keys(validMatchers).forEach((matcherName) => {
        const matcher = validMatchers[matcherName];
        if (
            typeof matcher === 'undefined' ||
            typeof matcher === 'boolean' ||
            playwrightMatchers.includes(matcherName) ||
            playwrightMatchers.includes(matcher)
        ) {
            delete validMatchers[matcherName];
        }
    });

    expect.extend(validMatchers);

    return expect as any as U;
}

const expect = extendExpect<Expect, Expect>(expectPatched);
const expectJest = expect as any as jest.Expect;

export { expect, expectJest };
