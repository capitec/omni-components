# omni-check

A control that allows a user to check a value on or off.

```js 
import '@innofake/omni-components/check'; 
```

## Example

```html
<omni-check  label="My Toggle Value"  .data="{'id': 12345, 'name': 'Test'}"  hint="Required"  error="Field level error message"  checked  disabled></omni-check>
```

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `checked`       | `checked`       |           | `Boolean`     | false   | Indicator if the component is checked or not.    |
| `data`          | `data`          |           | `Object`      |         | Data associated with the component.              |
| `disabled`      | `disabled`      |           | `Boolean`     | false   | Indicator if the component is disabled.          |
| `error`         | `error`         |           | `String`      |         | An error message to guide users to correct a mistake. |
| `hint`          | `hint`          |           | `String`      |         | A hint message to assist the user.               |
| `indeterminate` | `indeterminate` |           | `Boolean`     | false   | Indicator if the component is in and indeterminate state. |
| `label`         | `label`         |           | `String`      |         | The label text.                                  |
| `override`      |                 |           |               |         | The element style template.                      |
| `styles`        |                 | readonly  | `CSSResult[]` |         |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event           | Type                                           | Description                                      |
|-----------------|------------------------------------------------|--------------------------------------------------|
| `value-change`  | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the control value is changed to either on or off. |
| `value-changed` | `CustomEvent<{ old: Boolean; new: Boolean; }>` |                                                  |

## Slots

| Name                 | Description                                   |
|----------------------|-----------------------------------------------|
| `check_icon`         | Replaces the icon for the checked state       |
| `indeterminate_icon` | Replaces the icon for the indeterminate state |

## CSS Custom Properties

| Property                                      | Description                     |
|-----------------------------------------------|---------------------------------|
| `--omni-check-background-color`               | Background color.               |
| `--omni-check-border-color`                   | Border color.                   |
| `--omni-check-border-radius`                  | Border radius.                  |
| `--omni-check-border-width`                   | Border width.                   |
| `--omni-check-checked-background-color`       | Checked Background color.       |
| `--omni-check-disabled-background-color`      | Disabled Background color.      |
| `--omni-check-disabled-border-color`          | Disabled border color.          |
| `--omni-check-height`                         | Height.                         |
| `--omni-check-hover-background-color`         | Hover background color.         |
| `--omni-check-hover-box-shadow`               | Hover box shadow.               |
| `--omni-check-indeterminate-background-color` | Indeterminate Background color. |
| `--omni-check-indicator-border-color`         | Indicator Border color.         |
| `--omni-check-indicator-border-width`         | Indicator Border width.         |
| `--omni-check-indicator-color`                | Indicator color.                |
| `--omni-check-input-error-label-font-color`   | Error font color.               |
| `--omni-check-input-error-label-font-family`  | Error font family.              |
| `--omni-check-input-error-label-font-size`    | Error font size.                |
| `--omni-check-input-error-label-font-weight`  | Error font weight.              |
| `--omni-check-input-hint-label-font-color`    | Hint font color.                |
| `--omni-check-input-hint-label-font-family`   | Hint font family.               |
| `--omni-check-input-hint-label-font-size`     | Hint font size.                 |
| `--omni-check-input-hint-label-font-weight`   | Hint font weight.               |
| `--omni-check-label-font-color`               | Label font color.               |
| `--omni-check-label-font-family`              | Label font family.              |
| `--omni-check-label-font-size`                | Label font size.                |
| `--omni-check-label-font-weight`              | Label font weight.              |
| `--omni-check-label-spacing`                  | Label spacing.                  |
| `--omni-check-width`                          | Width.                          |
