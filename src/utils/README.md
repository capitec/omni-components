# `src/utils/Utilities.ts`:

## Functions

| Name            | Description                                                                                                                                                                                                                              | Parameters                                               | Return    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------- |
| `getValue`      | Retrieves the value from the object in a nested fashion. &#xD;&#xA;Specify a path as e.g. "food.fruit.apple".&#xD;&#xA;&#xD;&#xA;Click [here](https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f) for more info. | `obj: Object, path: String, separator: String`           | `*`       |
| `setValue`      | Assigns the value to the object in a nested fashion.&#xD;&#xA;Specify a path as e.g. "food.fruit.apple".                                                                                                                                 | `obj: Object, path: String, value: *, separator: String` | `void`    |
| `hasValue`      | Check if the current value is non-null or non-undefined                                                                                                                                                                                  | `value: Number\|String\|Object`                          | `Boolean` |
| `groupBy`       | Group by method for an array.                                                                                                                                                                                                            | `arr: Array, target: String\|Function`                   | `Object`  |
| `isFunction`    | Determines if the given value is a [function](https://developer.mozilla.org/en-US/docs/Glossary/Function).                                                                                                                               | `value: *`                                               | `Boolean` |
| `isObject`      | Determines if a given value is an Object.                                                                                                                                                                                                | `value: *`                                               | `Boolean` |
| `isEmptyObject` |                                                                                                                                                                                                                                          | `obj: *`                                                 | `Boolean` |
| `isString`      |                                                                                                                                                                                                                                          | `s: *`                                                   | `Boolean` |
| `isPromise`     | Determines if a given value is a Promise.                                                                                                                                                                                                | `value: *`                                               | `Boolean` |
| `formatBytes`   | Returns a formatted string with easier to read values for file sizes                                                                                                                                                                     | `bytes: Number, decimals: Number`                        | `String`  |
| `deepCopy`      | Creates and returns a deep copy of an Object or Array.                                                                                                                                                                                   | `inObject: *`                                            | `*`       |
| `isURL`         | Determines if a given string is a Url.                                                                                                                                                                                                   | `str: string`                                            | `Boolean` |

<hr/>

## Exports

| Kind | Name            | Declaration   | Module                 | Package |
| ---- | --------------- | ------------- | ---------------------- | ------- |
| `js` | `getValue`      | getValue      | src/utils/Utilities.ts |         |
| `js` | `setValue`      | setValue      | src/utils/Utilities.ts |         |
| `js` | `hasValue`      | hasValue      | src/utils/Utilities.ts |         |
| `js` | `groupBy`       | groupBy       | src/utils/Utilities.ts |         |
| `js` | `isFunction`    | isFunction    | src/utils/Utilities.ts |         |
| `js` | `isObject`      | isObject      | src/utils/Utilities.ts |         |
| `js` | `isEmptyObject` | isEmptyObject | src/utils/Utilities.ts |         |
| `js` | `isString`      | isString      | src/utils/Utilities.ts |         |
| `js` | `isPromise`     | isPromise     | src/utils/Utilities.ts |         |
| `js` | `formatBytes`   | formatBytes   | src/utils/Utilities.ts |         |
| `js` | `deepCopy`      | deepCopy      | src/utils/Utilities.ts |         |
| `js` | `isURL`         | isURL         | src/utils/Utilities.ts |         |
