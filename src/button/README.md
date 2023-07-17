# omni-button

Control that allows an action to be executed.

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
| `disabled`     | `disabled`      |           | `boolean \| undefined`                           |             | Indicator if the component is disabled.          |
| `label`        | `label`         |           | `string \| undefined`                            |             | Text label.                                      |
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
| `--omni-button-clear-active-background`          | Clear "type" active background.                  |
| `--omni-button-clear-active-border-color`        | Clear "type" active border color.                |
| `--omni-button-clear-active-border-width`        | Clear "type" active border width.                |
| `--omni-button-clear-active-color`               | Clear "type" active color.                       |
| `--omni-button-clear-background`                 | Clear "type" background.                         |
| `--omni-button-clear-border-color`               | Clear "type" border color.                       |
| `--omni-button-clear-border-width`               | Clear "type" border width.                       |
| `--omni-button-clear-color`                      | Clear "type" color.                              |
| `--omni-button-clear-disabled-background`        | Clear "type" disabled back color.                |
| `--omni-button-clear-disabled-border-color`      | Clear "type" disabled border color.              |
| `--omni-button-clear-disabled-border-width`      | Clear "type" disabled border width.              |
| `--omni-button-clear-disabled-color`             | Clear "type" disabled color.<br /><br />WHITE    |
| `--omni-button-clear-hover-background`           | Clear "type" hover background.                   |
| `--omni-button-clear-hover-border-color`         | Clear "type" hover border color.                 |
| `--omni-button-clear-hover-border-width`         | Clear "type" hover border width.                 |
| `--omni-button-clear-hover-color`                | Clear "type" hover color.                        |
| `--omni-button-disabled-active-hover-background` | Disabled hover and active background.            |
| `--omni-button-disabled-background`              | Disabled background.                             |
| `--omni-button-disabled-border-color`            | Disabled border color.                           |
| `--omni-button-font-family`                      | Component font family.                           |
| `--omni-button-font-size`                        | Component font size.                             |
| `--omni-button-font-weight`                      | Component font weight.                           |
| `--omni-button-line-height`                      | Component line height.                           |
| `--omni-button-padding-bottom`                   | Component padding bottom.                        |
| `--omni-button-padding-left`                     | Component padding left.                          |
| `--omni-button-padding-right`                    | Component padding right.<br /><br />PRIMARY      |
| `--omni-button-padding-top`                      | Component padding top.                           |
| `--omni-button-primary-active-background`        | Primary "type" active back color.                |
| `--omni-button-primary-active-border-color`      | Primary "type" active border color.              |
| `--omni-button-primary-active-border-width`      | Primary "type" active border width.              |
| `--omni-button-primary-active-color`             | Primary "type" active color.                     |
| `--omni-button-primary-background`               | Primary "type" background.                       |
| `--omni-button-primary-border-color`             | Primary "type" border color.                     |
| `--omni-button-primary-border-width`             | Primary "type" border width.                     |
| `--omni-button-primary-color`                    | Primary "type" color.                            |
| `--omni-button-primary-disabled-background`      | Primary "type" disabled back color.              |
| `--omni-button-primary-disabled-border-color`    | Primary "type" disabled border color.            |
| `--omni-button-primary-disabled-border-width`    | Primary "type" disabled border width.            |
| `--omni-button-primary-disabled-color`           | Primary "type" disabled color.<br /><br />SECONDARY |
| `--omni-button-primary-hover-background`         | Primary "type" hover background.                 |
| `--omni-button-primary-hover-border-color`       | Primary "type" hover border color.               |
| `--omni-button-primary-hover-border-width`       | Primary "type" hover border width.               |
| `--omni-button-primary-hover-box-shadow`         | Primary "type" hover box shadow.                 |
| `--omni-button-primary-hover-color`              | Primary "type" hover color.                      |
| `--omni-button-secondary-active-background`      | Secondary "type" active background.              |
| `--omni-button-secondary-active-border-color`    | Secondary "type" active border color.            |
| `--omni-button-secondary-active-border-width`    | Secondary "type" active border width.            |
| `--omni-button-secondary-active-color`           | Secondary "type" active color.                   |
| `--omni-button-secondary-background`             | Secondary "type" background.                     |
| `--omni-button-secondary-border-color`           | Secondary "type" border color.                   |
| `--omni-button-secondary-border-width`           | Secondary "type" border width.                   |
| `--omni-button-secondary-color`                  | Secondary "type" color.                          |
| `--omni-button-secondary-disabled-background`    | Secondary "type" disabled back color.            |
| `--omni-button-secondary-disabled-border-color`  | Secondary "type" disabled border color.          |
| `--omni-button-secondary-disabled-border-width`  | Secondary "type" disabled border width.          |
| `--omni-button-secondary-disabled-color`         | Secondary "type" disabled color.<br /><br />CLEAR |
| `--omni-button-secondary-hover-background`       | Secondary "type" hover background.               |
| `--omni-button-secondary-hover-border-color`     | Secondary "type" hover border color.             |
| `--omni-button-secondary-hover-border-width`     | Secondary "type" hover border width.             |
| `--omni-button-secondary-hover-box-shadow`       | Secondary "type" hover box shadow.               |
| `--omni-button-secondary-hover-color`            | Secondary "type" hover color.                    |
| `--omni-button-slot-margin-bottom`               | Slot margin bottom (When positioned top of label). |
| `--omni-button-slot-margin-left`                 | Slot margin left (When positioned right of label). |
| `--omni-button-slot-margin-right`                | Slot margin left (When positioned right of label). |
| `--omni-button-slot-margin-top`                  | Slot margin top (When positioned bottom of label). |
| `--omni-button-white-active-background`          | White "type" active background.                  |
| `--omni-button-white-active-border-color`        | White "type" active border color.                |
| `--omni-button-white-active-border-width`        | White "type" active border width.                |
| `--omni-button-white-active-color`               | White "type" hover color.                        |
| `--omni-button-white-background`                 | White "type" background.                         |
| `--omni-button-white-border-color`               | White "type" border color.                       |
| `--omni-button-white-border-width`               | White "type" border width.                       |
| `--omni-button-white-color`                      | White "type" color.                              |
| `--omni-button-white-disabled-background`        | White "type" disabled back color.                |
| `--omni-button-white-disabled-border-color`      | White "type" disabled border color.              |
| `--omni-button-white-disabled-border-width`      | White "type" disabled border width.              |
| `--omni-button-white-disabled-color`             | White "type" disabled color.                     |
| `--omni-button-white-hover-background`           | White "type" hover background.                   |
| `--omni-button-white-hover-border-color`         | White "type" hover border color.                 |
| `--omni-button-white-hover-border-width`         | White "type" hover border width.                 |
| `--omni-button-white-hover-box-shadow`           | White "type" hover box shadow.                   |
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
