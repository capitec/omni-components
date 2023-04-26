# omni-switch

Control to switch a value on or off.

## Example

```html
<omni-switch
  label="My Switch Value"
  hint="Required"
  error="Field level error message"
  checked>
</omni-switch>
```

## Properties

| Property   | Attribute  | Modifiers | Type                   | Description                                      |
|------------|------------|-----------|------------------------|--------------------------------------------------|
| `checked`  | `checked`  |           | `boolean \| undefined` | Indicator if the component is checked or not.    |
| `data`     | `data`     |           | `object \| undefined`  | Data associated with the component.              |
| `dir`      |            |           | `string`               |                                                  |
| `disabled` | `disabled` |           | `boolean \| undefined` | Indicator if the component is disabled.          |
| `error`    | `error`    |           | `string \| undefined`  | An error message to guide users to correct a mistake. |
| `hint`     | `hint`     |           | `string \| undefined`  | Hint message to assist the user.                 |
| `label`    | `label`    |           | `string \| undefined`  | Text label.                                      |
| `lang`     |            |           | `string`               |                                                  |
| `override` | `override` |           |                        | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]`     |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event          | Type                                           | Description                                      |
|----------------|------------------------------------------------|--------------------------------------------------|
| `value-change` | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the switch checked state is changed. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component.          |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                      |
|-------------------------------------------------|----------------------------------|
| `--omni-switch-checked-hover-knob-box-shadow`   | Knob checked hover box shadow.   |
| `--omni-switch-checked-knob-background-color`   | Knob checked background color.   |
| `--omni-switch-checked-track-background-color`  | Track checked background color.  |
| `--omni-switch-disabled-knob-background-color`  | Knob disabled background color.. |
| `--omni-switch-disabled-knob-box-shadow`        | Knob disabled hover box shadow.  |
| `--omni-switch-disabled-track-background-color` | Track disabled background color. |
| `--omni-switch-input-error-label-font-color`    | Error text font color.           |
| `--omni-switch-input-error-label-font-family`   | Error text font family.          |
| `--omni-switch-input-error-label-font-size`     | Error text font size.            |
| `--omni-switch-input-error-label-font-weight`   | Error text font weight.          |
| `--omni-switch-input-hint-label-font-color`     | Hint text font color.            |
| `--omni-switch-input-hint-label-font-family`    | Hint text font family.           |
| `--omni-switch-input-hint-label-font-size`      | Hint text font size.             |
| `--omni-switch-input-hint-label-font-weight`    | Hint text font weight.           |
| `--omni-switch-knob-background-color`           | Knob background color.           |
| `--omni-switch-knob-box-shadow`                 | Knob box shadow.                 |
| `--omni-switch-knob-height`                     | Knob height.                     |
| `--omni-switch-knob-hover-box-shadow`           | Knob hover box shadow.           |
| `--omni-switch-knob-width`                      | Knob width.                      |
| `--omni-switch-label-font-color`                | Label font color.                |
| `--omni-switch-label-font-family`               | Label font family.               |
| `--omni-switch-label-font-size`                 | Label font size.                 |
| `--omni-switch-label-font-weight`               | Label font weight.               |
| `--omni-switch-label-spacing`                   | Label left margin spacing.       |
| `--omni-switch-track-background-color`          | Track background color.          |
| `--omni-switch-track-border-radius`             | Track border radius.             |
| `--omni-switch-track-height`                    | Track height.                    |
| `--omni-switch-track-inset`                     | Track inset margins.             |
| `--omni-switch-track-width`                     | Track width.                     |
| `--omni-theme-accent-active-color`              | Theme accent active color.       |
| `--omni-theme-accent-color`                     | Theme accent color.              |
| `--omni-theme-accent-hover-color`               | Theme accent hover color.        |
| `--omni-theme-background-active-color`          | Theme background active color.   |
| `--omni-theme-background-color`                 | Theme background color.          |
| `--omni-theme-background-hover-color`           | Theme background hover color.    |
| `--omni-theme-border-radius`                    | Theme border radius.             |
| `--omni-theme-border-width`                     | Theme border width.              |
| `--omni-theme-box-shadow`                       | Theme box shadow.                |
| `--omni-theme-box-shadow-color`                 | Theme inactive color.            |
| `--omni-theme-disabled-background-color`        | Theme disabled background color. |
| `--omni-theme-disabled-border-color`            | Theme disabled border color.     |
| `--omni-theme-error-border-color`               | Theme error border color.        |
| `--omni-theme-error-font-color`                 | Theme disabled background color. |
| `--omni-theme-font-color`                       | Theme font color.                |
| `--omni-theme-font-family`                      | Theme font family.               |
| `--omni-theme-font-size`                        | Theme font size.                 |
| `--omni-theme-font-weight`                      | Theme font weight.               |
| `--omni-theme-hint-font-color`                  | Theme hint font color.           |
| `--omni-theme-inactive-color`                   | Theme inactive color.            |
| `--omni-theme-primary-active-color`             | Theme primary active color.      |
| `--omni-theme-primary-color`                    | Theme primary color.             |
| `--omni-theme-primary-hover-color`              | Theme primary hover color.       |
