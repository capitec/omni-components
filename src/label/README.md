# omni-label

Label component that renders styled text.

## Example

```html
<omni-label
  label="Hello World"
  type="strong">
</omni-label>
```

## Properties

| Property   | Attribute  | Modifiers | Type                                             | Default   | Description                                      |
|------------|------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `dir`      |            |           | `string`                                         |           |                                                  |
| `label`    | `label`    |           | `string \| undefined`                            |           | Text label.                                      |
| `lang`     |            |           | `string`                                         |           |                                                  |
| `override` | `override` |           |                                                  |           | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]`                               |           |                                                  |
| `type`     | `type`     |           | `"default" \| "title" \| "subtitle" \| "strong"` | "default" | Type of label to display.                        |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component.<br /><br />Registry of all properties defined by the component. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                 | Description                      |
|------------------------------------------|----------------------------------|
| `--omni-label-cursor`                    | Label cursor.                    |
| `--omni-label-default-font-size`         | Default label font size.         |
| `--omni-label-default-font-weight`       | Default label font weight.       |
| `--omni-label-font-color`                | Label font color.                |
| `--omni-label-font-family`               | Label font family.               |
| `--omni-label-font-size`                 | Label font size.                 |
| `--omni-label-font-weight`               | Label font weight.               |
| `--omni-label-strong-font-size`          | Strong label font size.          |
| `--omni-label-strong-font-weight`        | Strong label font weight.        |
| `--omni-label-subtitle-font-size`        | Subtitle label font size.        |
| `--omni-label-subtitle-font-weight`      | Subtitle label font weight.      |
| `--omni-label-title-font-size`           | Title label font size.           |
| `--omni-label-title-font-weight`         | Title label font weight.         |
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
