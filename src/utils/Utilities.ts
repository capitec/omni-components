

/**
 * Retrieves the value from the object in a nested fashion. Specify a path as e.g. "food.fruit.apple". Click [here](https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f) for more info.
 *
 * @export function    
 * @param {Object} obj Object to retrieve value from.
 * @param {String} path Path to nested value, e.g. "food.fruit.apple".
 * @param {String} [separator="."] Separator to the path split on.
 * 
 * @returns {*} Value of the resolved path.
 */
export function getValue(obj: any, path: string, separator = `.`) {

    try {

        separator = separator || `.`;

        return path.
            replace(`[`, separator).replace(`]`, ``).
            split(separator).
            reduce((accumulator, currentValue) => accumulator[currentValue], obj);

    } catch (err) {
        return undefined;
    }
}

/**
 * Assigns the value to the object in a nested fashion.
 * Specify a path as e.g. "food.fruit.apple".
 *
 * @static
 * @param {Object} obj Object to set value on.
 * @param {String} path Path to nested value, e.g. "food.fruit.apple".
 * @param {*} value Value to set for the path.
 * @param {String} [separator="."] Separator to the path split on.
 *
 * @returns {void}
 */
export function setValue(obj: any, path: string, value: any, separator = '.') {

    separator = separator || `.`;

    const list = path.split(separator);
    const key = list.pop();
    const pointer = list.reduce((accumulator, currentValue) => accumulator[currentValue], obj);

    pointer[key] = value;

    return obj;
}

/**
 * Check if the current value is non-null or non-undefined
 * @param {Number|String|Object} value - Value to check 
 * @returns {Boolean} - Boolean for if the value is non-null or non-undefined
 */
export function hasValue(value: number | string | object) {
    return !(value === null || value === undefined);
}

/**
 * Group by method for an array.
 *
 * @static
 * @param {Array} arr Array to group.
 * @param {String|Function} target Grouping target:
 *  - ```String``` as property to group on, e.g. "userId"
 *  - ```Function``` as [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Syntax) callback function.
 * @returns {Object} Contains a property as key for each group.
 */
export function groupBy(arr: Array<any>, target: string | Function) {

    let result = [];

    if (typeof target === `string`) {
        result = arr.reduce((accumulator, currentValue) => {
            accumulator[getValue(currentValue, target)] = [...accumulator[getValue(currentValue, target)] || [], currentValue];
            return accumulator;
        }, {});
    }

    if (typeof target === `function`) {
        result = arr.reduce(target as any, {});
    }

    return result;
}

/**
 * Determines if the given value is a [function](https://developer.mozilla.org/en-US/docs/Glossary/Function).
 *
 * @static
 * @param {*} value Value to inspect.
 * @returns {Boolean} True if the value is a valid function.
 */
export function isFunction(value: any) {
    return value && typeof value === `function`;
}

/**
 * Determines if a given value is an Object.
 *
 * @static
 * @param {*} value Value to inspect.
 * @returns {Boolean} True if the value is an object.
 */
export function isObject(value: any) {
    return value && Object.getPrototypeOf(value).isPrototypeOf(Object);
}

/**
 * 
 * @param {*} obj Value to inspect
 * @returns {Boolean} True if the value is an empty.
 */
export function isEmptyObject(obj: any) {
    return obj &&
        Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * 
 * @param {*} s Value to inspect
 * @returns {Boolean} True if the value is a string.
 */
export function isString(s: any) {
    return typeof s === `string` || s instanceof String;
}

/**
 * Determines if a given value is a Promise.
 *
 * @static
 * @param {*} value Value to inspect.
 * @returns {Boolean} True if the value is a Promise.
 */
export function isPromise(value: any) {
    return value && Object.prototype.toString.call(value) === `[object Promise]`;
}

/**
 * Returns a formatted string with easier to read values for file sizes
 *
 * @static
 * @param {Number} bytes Size passed in.
 * @param {Number} decimals Number of decimals to return. Default to 2
 * @returns {String} The value with size formatted
 */
export function formatBytes(bytes: number, decimals = 2) {

    if (!bytes || typeof bytes !== `number` || !(bytes > 0)) {
        return `0 Bytes`;
    }

    const k = 1024;
    const dm = decimals > 0 ? decimals : 0;
    const sizes = [`Bytes`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Creates and returns a deep copy of an Object or Array.
 *
 * @static
 * @param {*} inObject Object or Array to clone.
 * 
 * @returns {*} Copied object or Array.
 */
export function deepCopy(inObject: any) {

    let outObject = null;
    let value = null;
    let key = null;

    if (typeof inObject !== `object` || inObject === null) {
        return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = (Array.isArray(inObject) ? [] : {}) as any;

    for (key in inObject) {
        if (Object.prototype.hasOwnProperty.call(inObject, key)) {
            value = inObject[key];

            // Recursively (deep) copy for nested objects, including arrays
            outObject[key] = deepCopy(value);
        }
    }

    return outObject;
}

/**
 * Determines if a given string is a Url.
 *
 * @static
 * @param {string} str Item to check
 * @returns {Boolean} True if the parameter is a Url.
 */
export function isURL(str: string) {
    const pattern = new RegExp(`^((ft|htt)ps?:\\/\\/)?` + // protocol
        `((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|` + // domain name and extension
        `((\\d{1,3}\\.){3}\\d{1,3}))` + // OR ip (v4) address
        `(\\:\\d+)?` + // port
        `(\\/[-a-z\\d%@_.~+&:]*)*` + // path
        `(\\?[;&a-z\\d%@_.,~+&:=-]*)?` + // query string
        `(\\#[-a-z\\d_]*)?$`, `i`); // fragment locator
    return pattern.test(str);
}