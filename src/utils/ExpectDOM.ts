import * as matchers from '@testing-library/jest-dom/matchers.js';
import { default as expectPatched } from 'expect';

function extendExpect<T, U = jest.Expect>(initialExpect: T, additionalMatchers?: any): U {
    const expect = ((initialExpect as any).default || initialExpect) as T & jest.Expect;

    // @TODO: This should be reverted once https://github.com/testing-library/jest-dom/pull/438 is merged
    // Some bundlers include an undefined `default` in the namespace import,
    // or __esmodule (a boolean) which cause expect.extend to throw.
    const validMatchers: any = { ...(matchers.default || matchers), ...(additionalMatchers ?? {}) };
    Object.keys(validMatchers).forEach((matcherName) => {
        const matcher = validMatchers[matcherName];
        if (typeof matcher === 'undefined' || typeof matcher === 'boolean') {
            delete validMatchers[matcherName];
        }
    });

    expect.extend(validMatchers);

    return expect as any as U;
}

const expect = extendExpect(expectPatched);

export { extendExpect, expect as default };
