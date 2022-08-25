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

| Property       | Attribute       | Modifiers | Type                                       | Default     | Description                             |
|----------------|-----------------|-----------|--------------------------------------------|-------------|-----------------------------------------|
| `disabled`     | `disabled`      |           | `boolean`                                  | false       | Indicator if the component is disabled. |
| `label`        | `label`         |           | `string`                                   |             | Text label.                             |
| `override`     |                 |           |                                            |             |                                         |
| `slotPosition` | `slot-position` |           | `"left"\|"top"\|"right"\|"bottom"`         | "left"      | Position of slotted content.            |
| `styles`       |                 | readonly  | `CSSResult[]`                              |             |                                         |
| `type`         | `type`          |           | `"primary"\|"secondary"\|"clear"\|"white"` | "secondary" | Display type.                           |

## Events

| Event   | Type          | Description                           |
|---------|---------------|---------------------------------------|
| `click` | `CustomEvent` | When the button component is clicked. |
