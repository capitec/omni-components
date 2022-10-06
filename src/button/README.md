# omni-button

A control that allows an action to be executed.

```js

import '@capitec/omni-components/button';
```

## Example

```html
<omni-button
  label="Some Action"
  type="primary">
</omni-button>
```

## Properties

| Property       | Attribute       | Modifiers | Type                                             | Default     | Description                                      |
|----------------|-----------------|-----------|--------------------------------------------------|-------------|--------------------------------------------------|
| `dir`          |                 |           | `string`                                         |             |                                                  |
| `disabled`     | `disabled`      |           | `boolean`                                        |             | Indicator if the component is disabled.          |
| `label`        | `label`         |           | `string`                                         |             | Text label.                                      |
| `lang`         |                 |           | `string`                                         |             |                                                  |
| `override`     | `override`      |           |                                                  |             | Used to set the base direction of text for display |
| `slotPosition` | `slot-position` |           | `"left" \| "top" \| "right" \| "bottom"`         | "left"      | Position of slotted content.                     |
| `styles`       |                 | readonly  | `CSSResultGroup[]`                               |             |                                                  |
| `type`         | `type`          |           | `"primary" \| "secondary" \| "clear" \| "white"` | "secondary" | Display type.                                    |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside button, can be positioned using {@link slotPosition} property. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-button-border-radius`                    | Component border radius.                         |
| `--omni-button-clear-active-background-color`    | Clear "type" active background color.            |
| `--omni-button-clear-active-border-color`        | Clear "type" active border color.                |
| `--omni-button-clear-active-border-width`        | Clear "type" active border width.                |
| `--omni-button-clear-background-color`           | Clear "type" background color.                   |
| `--omni-button-clear-border-color`               | Clear "type" border color.                       |
| `--omni-button-clear-border-width`               | Clear "type" border width.                       |
| `--omni-button-clear-color`                      | Clear "type" color.                              |
| `--omni-button-clear-hover-background-color`     | Clear "type" hover background color.             |
| `--omni-button-disabled-active-hover-background-color` | Disabled active background color.                |
| `--omni-button-disabled-background-color`        | Disabled background color.                       |
| `--omni-button-disabled-border-color`            | Disabled border color.                           |
| `--omni-button-font-family`                      | Component font family.                           |
| `--omni-button-font-size`                        | Component font size.                             |
| `--omni-button-font-weight`                      | Component font weight.                           |
| `--omni-button-line-height`                      | Component line height.                           |
| `--omni-button-padding-bottom`                   | Component padding bottom.                        |
| `--omni-button-padding-left`                     | Component padding left.                          |
| `--omni-button-padding-right`                    | Component padding right.                         |
| `--omni-button-padding-top`                      | Component padding top.                           |
| `--omni-button-primary-active-background-color`  | Primary "type" active back color.                |
| `--omni-button-primary-background-color`         | Primary "type" background color.                 |
| `--omni-button-primary-border-color`             | Primary "type" border color.                     |
| `--omni-button-primary-border-width`             | Primary "type" border width.                     |
| `--omni-button-primary-color`                    | Primary "type" color.                            |
| `--omni-button-secondary-active-background-color` | Secondary "type" active background color.        |
| `--omni-button-secondary-background-color`       | Secondary "type" background color.               |
| `--omni-button-secondary-border-color`           | Secondary "type" border color.                   |
| `--omni-button-secondary-border-width`           | Secondary "type" border width.                   |
| `--omni-button-secondary-color`                  | Secondary "type" color.                          |
| `--omni-button-slot-margin-bottom`               | Slot margin bottom (When positioned top of label). |
| `--omni-button-slot-margin-left`                 | Slot margin left (When positioned right of label). |
| `--omni-button-slot-margin-right`                | Slot margin left (When positioned right of label). |
| `--omni-button-slot-margin-top`                  | Slot margin top (When positioned bottom of label). |
| `--omni-button-white-active-background-color`    | White "type" active background color.            |
| `--omni-button-white-active-border-color`        | White "type" active border color.                |
| `--omni-button-white-active-border-width`        | White "type" active border width.                |
| `--omni-button-white-background-color`           | White "type" background color.                   |
| `--omni-button-white-border-color`               | White "type" border color.                       |
| `--omni-button-white-border-width`               | White "type" border width.                       |
| `--omni-button-white-color`                      | White "type" color.                              |
| `--omni-button-white-hover-background-color`     | White "type" hover background color.             |
| `--omni-theme-accent-active-color`               | Theme accent active color.                       |
| `--omni-theme-accent-color`                      | Theme accent color.                              |
| `--omni-theme-accent-hover-color`                | Theme accent hover color.                        |
| `--omni-theme-background-active-color`           | Theme background active color.                   |
| `--omni-theme-background-color`                  | Theme background color.                          |
| `--omni-theme-background-hover-color`            | Theme background hover color.                    |
| `--omni-theme-border-radius`                     | Theme border radius.                             |
| `--omni-theme-border-width`                      | Theme border width.                              |
| `--omni-theme-box-shadow`                        | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`                  | Theme inactive color.                            |
| `--omni-theme-disabled-background-color`         | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`             | Theme disabled border color.                     |
| `--omni-theme-error-border-color`                | Theme error border color.                        |
| `--omni-theme-error-font-color`                  | Theme disabled background color.                 |
| `--omni-theme-font-color`                        | Theme font color.                                |
| `--omni-theme-font-family`                       | Theme font family.                               |
| `--omni-theme-font-size`                         | Theme font size.                                 |
| `--omni-theme-font-weight`                       | Theme font weight.                               |
| `--omni-theme-hint-font-color`                   | Theme hint font color.                           |
| `--omni-theme-inactive-color`                    | Theme inactive color.                            |
| `--omni-theme-primary-active-color`              | Theme primary active color.                      |
| `--omni-theme-primary-color`                     | Theme primary color.                             |
| `--omni-theme-primary-hover-color`               | Theme primary hover color.                       |
