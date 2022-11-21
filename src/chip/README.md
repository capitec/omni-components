# omni-chip

A control that can be used for input, setting attributes, or performing actions.

```js

import '@capitec/omni-components/chip';
```

## Example

```html
<omni-chip
  label="Chip title"
  closable>
</omni-chip>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Description                                      |
|------------|------------|-----------|--------------------|--------------------------------------------------|
| `closable` | `closable` |           | `boolean`          | Sets if the chip has a close button.             |
| `dir`      |            |           | `string`           |                                                  |
| `disabled` | `disabled` |           | `boolean`          | Indicator if the component is disabled.          |
| `label`    | `label`    |           | `string`           | Text label.                                      |
| `lang`     |            |           | `string`           |                                                  |
| `override` | `override` |           |                    | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |                                                  |

## Events

| Event    | Type              | Description                                |
|----------|-------------------|--------------------------------------------|
| `remove` | `CustomEvent<{}>` | Dispatched when the close icon is clicked. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `chip_icon`         | Replaces the icon for the chip slot              |
| `close_icon`        | Replaces the icon for the closed slot            |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                      | Description                          |
|-----------------------------------------------|--------------------------------------|
| `--omni-chip-background-color`                | Component background color.          |
| `--omni-chip-border-radius`                   | Component border radius.             |
| `--omni-chip-close-icon-color`                | Component close icon color.          |
| `--omni-chip-close-icon-width`                | Component close icon width.          |
| `--omni-chip-disabled-background-color`       | Component disabled background color. |
| `--omni-chip-disabled-border-color`           | Component disabled border color.     |
| `--omni-chip-disabled-hover-background-color` | Component icon left padding.         |
| `--omni-chip-height`                          | Component height.                    |
| `--omni-chip-hover-border`                    | Component hover border.              |
| `--omni-chip-hover-shadow`                    | Component hover shadow.              |
| `--omni-chip-icon-width`                      | Component slotted icon width.        |
| `--omni-chip-label-color`                     | Component label color.               |
| `--omni-chip-label-font-family`               | Component label font family.         |
| `--omni-chip-label-font-size`                 | Component label font size.           |
| `--omni-chip-label-font-weight`               | Component label font weight.         |
| `--omni-chip-label-line-height`               | Component label line height.         |
| `--omni-chip-label-padding-left`              | Component label left padding.        |
| `--omni-chip-label-padding-right`             | Component label right padding.       |
| `--omni-chip-max-height`                      | Component maximum height.            |
| `--omni-chip-padding`                         | Component padding.                   |
| `--omni-theme-accent-active-color`            | Theme accent active color.           |
| `--omni-theme-accent-color`                   | Theme accent color.                  |
| `--omni-theme-accent-hover-color`             | Theme accent hover color.            |
| `--omni-theme-background-active-color`        | Theme background active color.       |
| `--omni-theme-background-color`               | Theme background color.              |
| `--omni-theme-background-hover-color`         | Theme background hover color.        |
| `--omni-theme-border-radius`                  | Theme border radius.                 |
| `--omni-theme-border-width`                   | Theme border width.                  |
| `--omni-theme-box-shadow`                     | Theme box shadow.                    |
| `--omni-theme-box-shadow-color`               | Theme inactive color.                |
| `--omni-theme-disabled-background-color`      | Theme disabled background color.     |
| `--omni-theme-disabled-border-color`          | Theme disabled border color.         |
| `--omni-theme-error-border-color`             | Theme error border color.            |
| `--omni-theme-error-font-color`               | Theme disabled background color.     |
| `--omni-theme-font-color`                     | Theme font color.                    |
| `--omni-theme-font-family`                    | Theme font family.                   |
| `--omni-theme-font-size`                      | Theme font size.                     |
| `--omni-theme-font-weight`                    | Theme font weight.                   |
| `--omni-theme-hint-font-color`                | Theme hint font color.               |
| `--omni-theme-inactive-color`                 | Theme inactive color.                |
| `--omni-theme-primary-active-color`           | Theme primary active color.          |
| `--omni-theme-primary-color`                  | Theme primary color.                 |
| `--omni-theme-primary-hover-color`            | Theme primary hover color.           |
