
import * as matchers from '@testing-library/jest-dom/matchers';
import { default as expectPatched } from 'expect';

const expect = expectPatched as typeof expectPatched & jest.Expect;

// @TODO: This should be reverted once https://github.com/testing-library/jest-dom/pull/438 is merged
// Some bundlers include an undefined `default` in the namespace import,
// or __esmodule (a boolean) which cause expect.extend to throw.
const validMatchers: any = { ...matchers };
Object.keys(validMatchers).forEach((matcherName) => {
    const matcher = validMatchers[matcherName];
    if (typeof matcher === 'undefined' || typeof matcher === 'boolean') {
        delete validMatchers[matcherName];
    }
});

expect.extend(validMatchers);

export default expect as jest.Expect;