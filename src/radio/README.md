# omni-radio

A control that allows a user to select a single value from a group of values.

```js

import '@capitec/omni-components/radio';
```

## Example

```html
<omni-radio  label="My Toggle Value"  data="{'id': 12345, 'name': 'Test'}"  hint="Required"  error="Field level error message"  checked  disabled></omni-radio>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Description                                      |
|------------|------------|-----------|--------------------|--------------------------------------------------|
| `checked`  | `checked`  |           | `boolean`          | Indicator if the component is checked or not.    |
| `data`     | `data`     |           | `object`           | Data associated with the component.              |
| `dir`      |            |           | `string`           |                                                  |
| `disabled` | `disabled` |           | `boolean`          | Indicator if the component is disabled.          |
| `error`    | `error`    |           | `string`           | An error message to guide users to correct a mistake. |
| `hint`     | `hint`     |           | `string`           | A hint message to assist the user.               |
| `label`    | `label`    |           | `string`           | Text label.                                      |
| `lang`     |            |           | `string`           |                                                  |
| `override` | `override` |           |                    | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event          | Type                                           | Description                                      |
|----------------|------------------------------------------------|--------------------------------------------------|
| `value-change` | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the control value is changed to either on or off. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                 | Description                      |
|------------------------------------------|----------------------------------|
| `--omni-input-error-label-font-color`    | Error Font Color.                |
| `--omni-input-error-label-font-family`   | Error Font Family.               |
| `--omni-input-error-label-font-size`     | Error Font Size.                 |
| `--omni-input-error-label-font-weight`   | Error Font Weight.               |
| `--omni-input-hint-label-font-color`     | Hint Font Color.                 |
| `--omni-input-hint-label-font-family`    | Hint Font Family.                |
| `--omni-input-hint-label-font-size`      | Hint Font Size.                  |
| `--omni-input-hint-label-font-weight`    | Hint Font Weight.                |
| `--omni-label-font-color`                | Label Font Color.                |
| `--omni-label-font-family`               | Label Font Family.               |
| `--omni-label-font-size`                 | Label Font Size.                 |
| `--omni-radio-background-color`          | Background Color.                |
| `--omni-radio-border-color`              | Border Color.                    |
| `--omni-radio-border-radius`             | Border Radius.                   |
| `--omni-radio-border-style`              | Border Style.                    |
| `--omni-radio-border-width`              | Border Width.                    |
| `--omni-radio-checked-background-color`  | Checked Background color.        |
| `--omni-radio-disabled-background-color` | Disabled Background Color.       |
| `--omni-radio-disabled-border-color`     | Disabled Border Color.           |
| `--omni-radio-height`                    | Height.                          |
| `--omni-radio-hover-background-color`    | Hover Background Color.          |
| `--omni-radio-hover-box-shadow`          | Hover Box Shadow.                |
| `--omni-radio-indicator-border-color`    | Indicator Border Color.          |
| `--omni-radio-indicator-border-width`    | Indicator Border Width.          |
| `--omni-radio-indicator-color`           | Indicator Color.                 |
| `--omni-radio-label-font-weight`         | Label Font Weight.               |
| `--omni-radio-label-line-height`         | Label Line Height.               |
| `--omni-radio-label-spacing`             | Label Spacing.                   |
| `--omni-radio-padding`                   | Padding.                         |
| `--omni-radio-width`                     | Width.                           |
| `--omni-theme-accent-active-color`       | Theme accent active color.       |
| `--omni-theme-accent-color`              | Theme accent color.              |
| `--omni-theme-accent-hover-color`        | Theme accent hover color.        |
| `--omni-theme-background-active-color`   | Theme background active color.   |
| `--omni-theme-background-color`          | Theme background color.          |
| `--omni-theme-background-hover-color`    | Theme background hover color.    |
| `--omni-theme-border-radius`             | Theme border radius.             |
| `--omni-theme-border-width`              | Theme border width.              |
| `--omni-theme-box-shadow`                | Theme box shadow.                |
| `--omni-theme-box-shadow-color`          | Theme inactive color.            |
| `--omni-theme-disabled-background-color` | Theme disabled background color. |
| `--omni-theme-disabled-border-color`     | Theme disabled border color.     |
| `--omni-theme-error-border-color`        | Theme error border color.        |
| `--omni-theme-error-font-color`          | Theme disabled background color. |
| `--omni-theme-font-color`                | Theme font color.                |
| `--omni-theme-font-family`               | Theme font family.               |
| `--omni-theme-font-size`                 | Theme font size.                 |
| `--omni-theme-font-weight`               | Theme font weight.               |
| `--omni-theme-hint-font-color`           | Theme hint font color.           |
| `--omni-theme-inactive-color`            | Theme inactive color.            |
| `--omni-theme-primary-active-color`      | Theme primary active color.      |
| `--omni-theme-primary-color`             | Theme primary color.             |
| `--omni-theme-primary-hover-color`       | Theme primary hover color.       |
