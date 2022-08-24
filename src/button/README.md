# omni-button

A control that allows an action to be executed.

```js 
import '@innofake/omni-components/button'; 
```

## Example

```html
<omni-button 
  label="Some Action"
  type="primary">
</omni-button>
```

## Properties

| Property   | Attribute  | Modifiers | Type                   | Default     |
|------------|------------|-----------|------------------------|-------------|
| `disabled` | `disabled` |           | `boolean \| undefined` |             |
| `label`    | `label`    |           | `string \| undefined`  |             |
| `override` |            |           |                        |             |
| `styles`   |            | readonly  | `CSSResult[]`          |             |
| `type`     | `type`     |           | `string \| undefined`  | "secondary" |
