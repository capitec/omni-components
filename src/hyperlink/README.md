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
| `dir`      |            |           | `string`                                     |         |                                                  |
| `disabled` | `disabled` |           | `boolean`                                    |         | Indicator if the component is disabled.          |
| `href`     | `href`     |           | `string`                                     |         | URL to link to.                                  |
| `inline`   | `inline`   |           | `boolean`                                    |         | Indicator if the link is used as part of a sentence. |
| `label`    | `label`    |           | `string`                                     |         | Text label.                                      |
| `lang`     |            |           | `string`                                     |         |                                                  |
| `override` | `override` |           |                                              |         | Used to set the base direction of text for display |
| `size`     | `size`     |           | `string`                                     |         | Size of the Hyperlink text.                      |
| `styles`   |            | readonly  | `CSSResultGroup[]`                           |         |                                                  |
| `target`   | `target`   |           | `"_self" \| "_blank" \| "_parent" \| "_top"` | "_self" | Where to load the URL specified in "href"        |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

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
| `--omni-theme-accent-active-color`        | Theme accent active color.                    |
| `--omni-theme-accent-color`               | Theme accent color.                           |
| `--omni-theme-accent-hover-color`         | Theme accent hover color.                     |
| `--omni-theme-background-active-color`    | Theme background active color.                |
| `--omni-theme-background-color`           | Theme background color.                       |
| `--omni-theme-background-hover-color`     | Theme background hover color.                 |
| `--omni-theme-border-radius`              | Theme border radius.                          |
| `--omni-theme-border-width`               | Theme border width.                           |
| `--omni-theme-box-shadow`                 | Theme box shadow.                             |
| `--omni-theme-box-shadow-color`           | Theme inactive color.                         |
| `--omni-theme-disabled-background-color`  | Theme disabled background color.              |
| `--omni-theme-disabled-border-color`      | Theme disabled border color.                  |
| `--omni-theme-error-border-color`         | Theme error border color.                     |
| `--omni-theme-error-font-color`           | Theme disabled background color.              |
| `--omni-theme-font-color`                 | Theme font color.                             |
| `--omni-theme-font-family`                | Theme font family.                            |
| `--omni-theme-font-size`                  | Theme font size.                              |
| `--omni-theme-font-weight`                | Theme font weight.                            |
| `--omni-theme-hint-font-color`            | Theme hint font color.                        |
| `--omni-theme-inactive-color`             | Theme inactive color.                         |
| `--omni-theme-primary-active-color`       | Theme primary active color.                   |
| `--omni-theme-primary-color`              | Theme primary color.                          |
| `--omni-theme-primary-hover-color`        | Theme primary hover color.                    |
