# omni-hyperlink

A link control that allows a user to indicate an action to be executed. Typically used for navigational purposes.

```js 
import '@capitec/omni-components/hyperlink'; 
```

## Example

```html
<omni-hyperlink 
  href="https://example.com"
  label="Click me">
</omni-hyperlink>
```

## Properties

| Property   | Attribute  | Modifiers | Type                                         | Default | Description                                      |
|------------|------------|-----------|----------------------------------------------|---------|--------------------------------------------------|
| `disabled` | `disabled` |           | `boolean`                                    |         | Indicator if the component is disabled.          |
| `href`     | `href`     |           | `string`                                     |         | URL to link to.                                  |
| `inline`   | `inline`   |           | `boolean`                                    |         | Indicator if the link is used as part of a sentence. |
| `label`    | `label`    |           | `string`                                     |         | Text label.                                      |
| `override` |            |           |                                              |         |                                                  |
| `size`     | `size`     |           | `string`                                     |         | Size of the Hyperlink text.                      |
| `styles`   |            | readonly  | `CSSResult[]`                                |         |                                                  |
| `target`   | `target`   |           | `"_self" \| "_blank" \| "_parent" \| "_top"` | "_self" | Where to load the URL specified in "href"        |

## CSS Custom Properties

| Property                                  | Description                                   |
|-------------------------------------------|-----------------------------------------------|
| `--omni-font-family-small`                | Hyperlink small font family variation         |
| `--omni-hyperlink-color`                  | Hyperlink color.                              |
| `--omni-hyperlink-color-active`           | Hyperlink color when in an active state.      |
| `--omni-hyperlink-color-disabled`         | Hyperlink disabled color.                     |
| `--omni-hyperlink-color-visited`          | Hyperlink color when visited                  |
| `--omni-hyperlink-font-family`            | Hyperlink font weight.                        |
| `--omni-hyperlink-font-size`              | Hyperlink font size.                          |
| `--omni-hyperlink-font-size-small`        | Hyperlink small font size variation           |
| `--omni-hyperlink-font-weight`            | Hyperlink font weight.                        |
| `--omni-hyperlink-font-weight-small`      | Hyperlink small font weight                   |
| `--omni-hyperlink-text-decorator`         | Hyperlink text decorator                      |
| `--omni-hyperlink-text-decorator-hover`   | Hyperlink text decorator when in hover state. |
| `--omni-hyperlink-text-decorator-visited` | Hyperlink text decorator when visited.        |
