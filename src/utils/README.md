

## Global Functions
<table><thead><tr><th>Name</th><th>Description</th><th>Parameters</th><th>Return</th><th>Example</th></tr></thead><tbody>
<tr><td>

`getValue`

</td><td>Retrieves the value from the object in a nested fashion. Specify a path as e.g. "food.fruit.apple". Click [here](https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f) for more info.</td><td>

obj {`Object`} - Object to retrieve value from.

 path {`String`} - Path to nested value, e.g. "food.fruit.apple".

 separator {`String`} - Separator to the path split on.

</td><td>

{`*`} - Value of the resolved path.

</td><td>


```js

    import { getValue } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`setValue`

</td><td>Assigns the value to the object in a nested fashion.Specify a path as e.g. "food.fruit.apple".</td><td>

obj {`Object`} - Object to set value on.

 path {`String`} - Path to nested value, e.g. "food.fruit.apple".

 value {`*`} - Value to set for the path.

 separator {`String`} - Separator to the path split on.

</td><td>

{`void`} - 

</td><td>


```js

    import { setValue } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`hasValue`

</td><td>Check if the current value is non-null or non-undefined</td><td>

value {`Number`|`String`|`Object`} - Value to check

</td><td>

{`Boolean`} - - Boolean for if the value is non-null or non-undefined

</td><td>


```js

    import { hasValue } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`groupBy`

</td><td>Group by method for an array.</td><td>

arr {`Array`} - Array to group.

 target {`String`|`function`} - Grouping target: - 
```String
``` as property to group on, e.g. "userId" - 
```Function
``` as [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Syntax) callback function.

</td><td>

{`Object`} - Contains a property as key for each group.

</td><td>


```js

    import { groupBy } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isFunction`

</td><td>Determines if the given value is a [function](https://developer.mozilla.org/en-US/docs/Glossary/Function).</td><td>

value {`*`} - Value to inspect.

</td><td>

{`Boolean`} - True if the value is a valid function.

</td><td>


```js

    import { isFunction } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isObject`

</td><td>Determines if a given value is an Object.</td><td>

value {`*`} - Value to inspect.

</td><td>

{`Boolean`} - True if the value is an object.

</td><td>


```js

    import { isObject } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isEmptyObject`

</td><td></td><td>

obj {`*`} - Value to inspect

</td><td>

{`Boolean`} - True if the value is an empty.

</td><td>


```js

    import { isEmptyObject } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isString`

</td><td></td><td>

s {`*`} - Value to inspect

</td><td>

{`Boolean`} - True if the value is a string.

</td><td>


```js

    import { isString } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isPromise`

</td><td>Determines if a given value is a Promise.</td><td>

value {`*`} - Value to inspect.

</td><td>

{`Boolean`} - True if the value is a Promise.

</td><td>


```js

    import { isPromise } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`formatBytes`

</td><td>Returns a formatted string with easier to read values for file sizes</td><td>

bytes {`Number`} - Size passed in.

 decimals {`Number`} - Number of decimals to return. Default to 2

</td><td>

{`String`} - The value with size formatted

</td><td>


```js

    import { formatBytes } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`deepCopy`

</td><td>Creates and returns a deep copy of an Object or Array.</td><td>

inObject {`*`} - Object or Array to clone.

</td><td>

{`*`} - Copied object or Array.

</td><td>


```js

    import { deepCopy } from '@innofake/omni-components/utils';
    
```

</td></tr>
<tr><td>

`isURL`

</td><td>Determines if a given string is a Url.</td><td>

str {`string`} - Item to check

</td><td>

{`Boolean`} - True if the parameter is a Url.

</td><td>


```js

    import { isURL } from '@innofake/omni-components/utils';
    
```

</td></tr>
</tbody></table>


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

