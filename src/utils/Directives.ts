/* eslint-disable @typescript-eslint/no-explicit-any */
import { nothing } from 'lit';

/**
 * Lit directive that only applies when provided value is not falsy(undefined, null, or empty string)
 * @param value 
 * @returns value or nothing
 */
export function ifNotEmpty(value: string) {
    return (null!=value && value ?
            value:
            nothing) as any;
}