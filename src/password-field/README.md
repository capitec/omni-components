# omni-password-field

A password input control.

```js

import '@capitec/omni-components/password-field';
```

## Example

```html
<omni-password-field  label="Enter a value"  value="Hello World"  data="{'id': 12345, 'name': 'Test'}"  hint="Required"  error="Field level error message"  disabled></omni-password-field>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Default | Description                                      |
|------------|------------|-----------|--------------------|---------|--------------------------------------------------|
| `data`     | `data`     |           | `object`           |         | Data associated with the component.              |
| `dir`      |            |           | `string`           |         |                                                  |
| `disabled` | `disabled` |           | `boolean`          | false   | Indicator if the component should be disabled.   |
| `error`    | `error`    |           | `string`           |         | A error message guiding a user to correct a mistake. |
| `hint`     | `hint`     |           | `string`           |         | A hint message to assist the user.               |
| `label`    | `label`    |           | `string`           |         | Text label.                                      |
| `lang`     |            |           | `string`           |         |                                                  |
| `override` | `override` |           |                    |         | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |         |                                                  |
| `value`    | `value`    |           | `string \| number` | null    | The value entered into the input.                |

## Methods

| Method          | Type                    |
|-----------------|-------------------------|
| `renderControl` | `(): TemplateResult<1>` |
| `renderInput`   | `(): TemplateResult<1>` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `hide`              | Replaces the icon for the password value hidden state. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `prefix`            | Replaces the icon for the prefix slot.           |
| `show`              | Replaces the icon for the checked value visible state. |
| `suffix`            | Replaces the icon for the suffix slot.           |

## CSS Custom Properties

| Property                                 | Description                      |
|------------------------------------------|----------------------------------|
| `--omni-input-background-color`          | Input background color.          |
| `--omni-input-border-bottom`             | Input border bottom.             |
| `--omni-input-border-color`              | Input border color.              |
| `--omni-input-border-left`               | Input border left.               |
| `--omni-input-border-radius`             | Input border radius.             |
| `--omni-input-border-right`              | Input border right.              |
| `--omni-input-border-top`                | Input border top.                |
| `--omni-input-border-width`              | Input border width.              |
| `--omni-input-container-font-family`     | Input container font family.     |
| `--omni-input-container-width`           | Input container width.           |
| `--omni-input-disabled-background-color` | Input disabled background color. |
| `--omni-input-disabled-border-color`     | Input disabled border color.     |
| `--omni-input-disabled-hover-color`      | Input disabled hover color.      |
| `--omni-input-error-border-color`        | Input error border color.        |
| `--omni-input-error-hover-color`         | Input error hover color.         |
| `--omni-input-error-label-border-width`  |                                  |
| `--omni-input-error-label-color`         | Input error label color.         |
| `--omni-input-error-label-font-color`    | Input error label font color.    |
| `--omni-input-error-label-font-family`   | Input error label font family.   |
| `--omni-input-error-label-font-size`     | Input error label font size.     |
| `--omni-input-error-label-font-weight`   | Input error label font weight.   |
| `--omni-input-error-label-padding-left`  | Input error label left padding.  |
| `--omni-input-error-label-padding-top`   | Input error label top padding.   |
| `--omni-input-focussed-border-color`     | Input focussed border color.     |
| `--omni-input-focussed-border-width`     | Input focussed border width.     |
| `--omni-input-hint-label-border`         | width -                          |
| `--omni-input-hint-label-font-color`     | Input hint label font color.     |
| `--omni-input-hint-label-font-family`    | Input hint label font family.    |
| `--omni-input-hint-label-font-size`      | Input hint label font size.      |
| `--omni-input-hint-label-font-weight`    | Input hint label font weight.    |
| `--omni-input-hint-label-padding-left`   | Input hint label left padding.   |
| `--omni-input-hint-label-padding-top`    | Input hint label top padding.    |
| `--omni-input-hover-color`               | Input hover color.               |
| `--omni-input-label-color`               | Input label color.               |
| `--omni-input-label-disabled-color`      | Input label disabled color.      |
| `--omni-input-label-font-size`           | Input label font size.           |
| `--omni-input-label-font-weight`         | Input label font weight.         |
| `--omni-input-label-left`                | Input label left margin.         |
| `--omni-input-label-text-align`          | Input label text align.          |
| `--omni-input-slot-color`                | Input field slot color.          |
| `--omni-input-slot-height`               | Input field slot height.         |
| `--omni-input-slot-width`                | Input field slot width.          |
| `--omni-password-icon-color`             | Password icon fill color.        |
| `--omni-password-icon-height`            | Password icon height.            |
| `--omni-password-icon-width`             | Password icon width.             |
| `--omni-password-input-icon-right`       | Password slot icon styles.       |
| `--omni-password-input-icon-top`         | Password field slot padding.     |
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
