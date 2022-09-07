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

| Property   | Attribute  | Modifiers | Type          | Description                             |
|------------|------------|-----------|---------------|-----------------------------------------|
| `closable` | `closable` |           | `boolean`     | Sets if the chip has a close button.    |
| `disabled` | `disabled` |           | `boolean`     | Indicator if the component is disabled. |
| `label`    | `label`    |           | `string`      | Text label.                             |
| `override` |            |           |               |                                         |
| `styles`   |            | readonly  | `CSSResult[]` |                                         |

## Events

| Event    | Type              | Description                                |
|----------|-------------------|--------------------------------------------|
| `remove` | `CustomEvent<{}>` | Dispatched when the close icon is clicked. |

## Slots

| Name         | Description                           |
|--------------|---------------------------------------|
| `chip_icon`  | Replaces the icon for the chip slot   |
| `close_icon` | Replaces the icon for the closed slot |

## CSS Custom Properties

| Property                                      | Description                          |
|-----------------------------------------------|--------------------------------------|
| `--omni-chip-background-color`                | Component background color.          |
| `--omni-chip-border-radius`                   | Component border radius.             |
| `--omni-chip-disabled-background-color`       | Component disabled background color. |
| `--omni-chip-disabled-border-color`           | Component disabled border color.     |
| `--omni-chip-disabled-hover-background-color` | Component icon left padding.         |
| `--omni-chip-height`                          | Component height.                    |
| `--omni-chip-icon-color`                      | Component close icon color.          |
| `--omni-chip-icon-height`                     | Component close icon height.         |
| `--omni-chip-icon-padding-left`               | Component close icon left padding.   |
| `--omni-chip-icon-width`                      | Component close icon width.          |
| `--omni-chip-label-color`                     | Component label color.               |
| `--omni-chip-label-font-family`               | Component label font family.         |
| `--omni-chip-label-font-size`                 | Component label font size.           |
| `--omni-chip-label-font-weight`               | Component label font weight.         |
| `--omni-chip-label-line-height`               | Component label line height.         |
| `--omni-chip-label-padding-left`              | Component label left padding.        |
| `--omni-chip-label-padding-right`             | Component label right padding.       |
| `--omni-chip-max-height`                      | Component maximum height.            |
| `--omni-chip-padding`                         | Component padding.                   |
