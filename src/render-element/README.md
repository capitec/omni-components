# omni-render-element

Element that defers content rendering to a provided function / promise.

## Example

```html
<omni-render-element></omni-render-element>
```

## Properties

| Property   | Attribute  | Modifiers | Type                        | Description                                      |
|------------|------------|-----------|-----------------------------|--------------------------------------------------|
| `data`     | `data`     |           | `object \| Promise<object>` | Data associated with the component.              |
| `dir`      |            |           | `string`                    |                                                  |
| `lang`     |            |           | `string`                    |                                                  |
| `override` | `override` |           |                             | Used to set the base direction of text for display |
| `renderer` | `renderer` |           | `RenderFunction`            | Renderer function                                |
| `styles`   |            | readonly  | `CSSResultGroup[]`          |                                                  |

## Methods

| Method          | Type                                             |
|-----------------|--------------------------------------------------|
| `renderAsync`   | `(): Promise<TemplateResult<ResultType> \| unique symbol>` |
| `renderLoading` | `(): TemplateResult<1>`                          |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                      |
|-------------------------------------------------|----------------------------------|
| `--omni-render-element-loading-indicator-width` | Loading Indicator width          |
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
