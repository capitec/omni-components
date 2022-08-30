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

| Property   | Attribute  | Modifiers | Type                                           | Default | Description                                      |
|------------|------------|-----------|------------------------------------------------|---------|--------------------------------------------------|
| `disabled` | `disabled` |           | `boolean`                                      | false   | Indicator if the link is disabled.               |
| `href`     | `href`     |           | `string`                                       |         | URL to link to. NOTE, suppresses "click" event if specified. |
| `inline`   | `inline`   |           | `boolean`                                      | false   | Indicator if the link is used as part of a sentence. |
| `label`    | `label`    |           | `string`                                       |         | The label string to display.                     |
| `override` |            |           |                                                |         |                                                  |
| `size`     | `size`     |           | `string`                                       |         | Size of the Hyperlink text:<br />- `default` Size variation to apply.<br />- `small` Size variation to apply. |
| `styles`   |            | readonly  | `CSSResult[]`                                  |         |                                                  |
| `target`   | `target`   |           | `"_self"\|"_blank"\|"_parent"\|"_top"\|String` | "_self" | Where to load the URL specified in "href":<br />- `_self` Current browsing context.<br />- `_blank` Usually a new tab, users can configure the browser to open a new window instead.<br />- `_parent` Parent browsing context of the current one. If no parent, behave as "_self".<br />- `_top` Topmost browsing context (the "highest" context thats an ancestor of the current one). If no ancestors, behaves as "_self". |

## CSS Custom Properties

| Property                                  | Description                                   |
|-------------------------------------------|-----------------------------------------------|
| `--omni-font-family-small`                | Hyperlink small font family variation         |
| `--omni-hyperlink-color`                  | Hyperlink color.                              |
| `--omni-hyperlink-color-active`           | Hyperlink colour when in an active state.     |
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
