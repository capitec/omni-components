# omni-radio

A control that allows a user to select a single value from a small group of values.

```js 
import '@innofake/web-components/inputs/radio'; 
```

## Example

```html
<omni-radio  label="My Toggle Value"  data="{'id': 12345, 'name': 'Test'}"  hint="Required"  error="Field level error message"  checked  disabled></omni-radio>
```

## Properties

| Property   | Attribute  | Modifiers | Type          | Default | Description                                      |
|------------|------------|-----------|---------------|---------|--------------------------------------------------|
| `checked`  | `checked`  |           | `boolean`     | false   | Indicator if the component is checked or not.    |
| `data`     | `data`     |           | `Object`      |         | Data associated with the component.              |
| `disabled` | `disabled` |           | `boolean`     | false   | Indicator if the component is disabled.          |
| `error`    | `error`    |           | `string`      |         | An error message to guide users to correct a mistake. |
| `hint`     | `hint`     |           | `string`      |         | A hint message to assist the user.               |
| `label`    | `label`    |           | `string`      |         | The radio label text.                            |
| `override` |            |           |               |         | The element style template.                      |
| `styles`   |            | readonly  | `CSSResult[]` |         |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event           | Type                                           | Description                                      |
|-----------------|------------------------------------------------|--------------------------------------------------|
| `value-change`  | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the control value is changed to either on or off. |
| `value-changed` | `CustomEvent<{ old: Boolean; new: Boolean; }>` |                                                  |

## CSS Custom Properties

| Property                                         | Description                |
|--------------------------------------------------|----------------------------|
| `--innofake-omni-input-error-label-font-color`   | Error Font Color.          |
| `--innofake-omni-input-error-label-font-family`  | Error Font Family.         |
| `--innofake-omni-input-error-label-font-size`    | Error Font Size.           |
| `--innofake-omni-input-error-label-font-weight`  | Error Font Weight.         |
| `--innofake-omni-input-hint-label-font-color`    | Hint Font Color.           |
| `--innofake-omni-input-hint-label-font-family`   | Hint Font Family.          |
| `--innofake-omni-input-hint-label-font-size`     | Hint Font Size.            |
| `--innofake-omni-input-hint-label-font-weight`   | Hint Font Weight.          |
| `--innofake-omni-label-font-color`               | Label Font Color.          |
| `--innofake-omni-label-font-family`              | Label Font Family.         |
| `--innofake-omni-label-font-size`                | Label Font Size.           |
| `--innofake-omni-radio-background-color`         | Background Color.          |
| `--innofake-omni-radio-border-color`             | Border Color.              |
| `--innofake-omni-radio-border-radius`            | Border Radius.             |
| `--innofake-omni-radio-border-style`             | Border Style.              |
| `--innofake-omni-radio-border-width`             | Border Width.              |
| `--innofake-omni-radio-checked-background-color` | Checked Background color.  |
| `--innofake-omni-radio-disabled-background-color` | Disabled Background Color. |
| `--innofake-omni-radio-disabled-border-color`    | Disabled Border Color.     |
| `--innofake-omni-radio-height`                   | Height.                    |
| `--innofake-omni-radio-hover-background-color`   | Hover Background Color.    |
| `--innofake-omni-radio-hover-box-shadow`         | Hover Box Shadow.          |
| `--innofake-omni-radio-indicator-border-color`   | Indicator Border Color.    |
| `--innofake-omni-radio-indicator-border-width`   | Indicator Border Width.    |
| `--innofake-omni-radio-indicator-color`          | Indicator Color.           |
| `--innofake-omni-radio-label-font-weight`        | Label Font Weight.         |
| `--innofake-omni-radio-label-line-height`        | Label Line Height.         |
| `--innofake-omni-radio-label-spacing`            | Label Spacing.             |
| `--innofake-omni-radio-padding`                  | Padding.                   |
| `--innofake-omni-radio-width`                    | Width.                     |
