# omni-check

Control that allows a selection to be made.

## Example

```html
<omni-check
  label="My Toggle Value"
  .data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  checked
  disabled>
</omni-check>
```

## Properties

| Property        | Attribute       | Modifiers | Type               | Description                                      |
|-----------------|-----------------|-----------|--------------------|--------------------------------------------------|
| `checked`       | `checked`       |           | `boolean`          | Indicator if the component is checked or not.    |
| `data`          | `data`          |           | `object`           | Data associated with the component.              |
| `dir`           |                 |           | `string`           |                                                  |
| `disabled`      | `disabled`      |           | `boolean`          | Indicator if the component is disabled.          |
| `error`         | `error`         |           | `string`           | An error message to guide users to correct a mistake. |
| `hint`          | `hint`          |           | `string`           | Hint message to assist the user.                 |
| `indeterminate` | `indeterminate` |           | `boolean`          | Indicator if the component is in and indeterminate state. |
| `label`         | `label`         |           | `string`           | Text label.                                      |
| `lang`          |                 |           | `string`           |                                                  |
| `override`      | `override`      |           |                    | Used to set the base direction of text for display |
| `styles`        |                 | readonly  | `CSSResultGroup[]` |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event          | Type                                           | Description                                      |
|----------------|------------------------------------------------|--------------------------------------------------|
| `value-change` | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the control value is changed to either on or off. |

## Slots

| Name                 | Description                                      |
|----------------------|--------------------------------------------------|
| `check_icon`         | Replaces the icon for the checked state          |
| `indeterminate_icon` | Replaces the icon for the indeterminate state    |
| `loading_indicator`  | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                      | Description                      |
|-----------------------------------------------|----------------------------------|
| `--omni-check-background-color`               | Background color.                |
| `--omni-check-border-color`                   | Border color.                    |
| `--omni-check-border-radius`                  | Border radius.                   |
| `--omni-check-border-width`                   | Border width.                    |
| `--omni-check-checked-background-color`       | Checked Background color.        |
| `--omni-check-disabled-background-color`      | Disabled Background color.       |
| `--omni-check-disabled-border-color`          | Disabled border color.           |
| `--omni-check-error-label-font-color`         | Error font color.                |
| `--omni-check-error-label-font-family`        | Error font family.               |
| `--omni-check-error-label-font-size`          | Error font size.                 |
| `--omni-check-error-label-font-weight`        | Error font weight.               |
| `--omni-check-error-label-padding-top`        | Error top padding.               |
| `--omni-check-height`                         | Height.                          |
| `--omni-check-hint-label-font-color`          | Hint font color.                 |
| `--omni-check-hint-label-font-family`         | Hint font family.                |
| `--omni-check-hint-label-font-size`           | Hint font size.                  |
| `--omni-check-hint-label-font-weight`         | Hint font weight.                |
| `--omni-check-hint-label-padding-top`         | Hint top padding.                |
| `--omni-check-hover-background-color`         | Hover background color.          |
| `--omni-check-hover-box-shadow`               | Hover box shadow.                |
| `--omni-check-indeterminate-background-color` | Indeterminate Background color.  |
| `--omni-check-indicator-border-color`         | Indicator Border color.          |
| `--omni-check-indicator-border-width`         | Indicator Border width.          |
| `--omni-check-indicator-color`                | Indicator color.                 |
| `--omni-check-label-font-color`               | Label font color.                |
| `--omni-check-label-font-family`              | Label font family.               |
| `--omni-check-label-font-size`                | Label font size.                 |
| `--omni-check-label-font-weight`              | Label font weight.               |
| `--omni-check-label-spacing`                  | Label spacing.                   |
| `--omni-check-width`                          | Width.                           |
| `--omni-theme-accent-active-color`            | Theme accent active color.       |
| `--omni-theme-accent-color`                   | Theme accent color.              |
| `--omni-theme-accent-hover-color`             | Theme accent hover color.        |
| `--omni-theme-background-active-color`        | Theme background active color.   |
| `--omni-theme-background-color`               | Theme background color.          |
| `--omni-theme-background-hover-color`         | Theme background hover color.    |
| `--omni-theme-border-radius`                  | Theme border radius.             |
| `--omni-theme-border-width`                   | Theme border width.              |
| `--omni-theme-box-shadow`                     | Theme box shadow.                |
| `--omni-theme-box-shadow-color`               | Theme inactive color.            |
| `--omni-theme-disabled-background-color`      | Theme disabled background color. |
| `--omni-theme-disabled-border-color`          | Theme disabled border color.     |
| `--omni-theme-error-border-color`             | Theme error border color.        |
| `--omni-theme-error-font-color`               | Theme disabled background color. |
| `--omni-theme-font-color`                     | Theme font color.                |
| `--omni-theme-font-family`                    | Theme font family.               |
| `--omni-theme-font-size`                      | Theme font size.                 |
| `--omni-theme-font-weight`                    | Theme font weight.               |
| `--omni-theme-hint-font-color`                | Theme hint font color.           |
| `--omni-theme-inactive-color`                 | Theme inactive color.            |
| `--omni-theme-primary-active-color`           | Theme primary active color.      |
| `--omni-theme-primary-color`                  | Theme primary color.             |
| `--omni-theme-primary-hover-color`            | Theme primary hover color.       |
