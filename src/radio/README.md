# omni-radio

A control that allows a user to select a single value from a small group of values.

```js 
import '@innofake/omni-components/radio'; 
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

| Event          | Type                                           | Description                                      |
|----------------|------------------------------------------------|--------------------------------------------------|
| `value-change` | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the control value is changed to either on or off. |

## CSS Custom Properties

| Property                                 | Description                |
|------------------------------------------|----------------------------|
| `--omni-input-error-label-font-color`    | Error Font Color.          |
| `--omni-input-error-label-font-family`   | Error Font Family.         |
| `--omni-input-error-label-font-size`     | Error Font Size.           |
| `--omni-input-error-label-font-weight`   | Error Font Weight.         |
| `--omni-input-hint-label-font-color`     | Hint Font Color.           |
| `--omni-input-hint-label-font-family`    | Hint Font Family.          |
| `--omni-input-hint-label-font-size`      | Hint Font Size.            |
| `--omni-input-hint-label-font-weight`    | Hint Font Weight.          |
| `--omni-label-font-color`                | Label Font Color.          |
| `--omni-label-font-family`               | Label Font Family.         |
| `--omni-label-font-size`                 | Label Font Size.           |
| `--omni-radio-background-color`          | Background Color.          |
| `--omni-radio-border-color`              | Border Color.              |
| `--omni-radio-border-radius`             | Border Radius.             |
| `--omni-radio-border-style`              | Border Style.              |
| `--omni-radio-border-width`              | Border Width.              |
| `--omni-radio-checked-background-color`  | Checked Background color.  |
| `--omni-radio-disabled-background-color` | Disabled Background Color. |
| `--omni-radio-disabled-border-color`     | Disabled Border Color.     |
| `--omni-radio-height`                    | Height.                    |
| `--omni-radio-hover-background-color`    | Hover Background Color.    |
| `--omni-radio-hover-box-shadow`          | Hover Box Shadow.          |
| `--omni-radio-indicator-border-color`    | Indicator Border Color.    |
| `--omni-radio-indicator-border-width`    | Indicator Border Width.    |
| `--omni-radio-indicator-color`           | Indicator Color.           |
| `--omni-radio-label-font-weight`         | Label Font Weight.         |
| `--omni-radio-label-line-height`         | Label Line Height.         |
| `--omni-radio-label-spacing`             | Label Spacing.             |
| `--omni-radio-padding`                   | Padding.                   |
| `--omni-radio-width`                     | Width.                     |
