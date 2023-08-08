# omni-expander

Layout component that groups together content in an expanded box.

## Example

html

```
<omni-expander label="My Expander">
 <omni-label label="Expanded"></omni-label>
</omni-expander>
```

## Properties

| Property          | Attribute          | Modifiers | Type                   | Default | Description                                      |
|-------------------|--------------------|-----------|------------------------|---------|--------------------------------------------------|
| `buttonAlignment` | `button-alignment` |           | `"left" \| "right"`    | "right" | Indicate where the Expander button should be positioned |
| `dir`             |                    |           | `string`               |         |                                                  |
| `disabled`        | `disabled`         |           | `boolean \| undefined` |         | Indicator if the expander is disabled.           |
| `expanded`        | `expanded`         |           | `boolean \| undefined` |         | Indicator if the expander is expanded.           |
| `label`           | `label`            |           | `string \| undefined`  |         | Expander component label.                        |
| `lang`            |                    |           | `string`               |         |                                                  |
| `override`        | `override`         |           |                        |         | Used to set the base direction of text for display |
| `styles`          |                    | readonly  | `CSSResultGroup[]`     |         |                                                  |

## Events

| Event      | Type                                           |
|------------|------------------------------------------------|
| `collapse` | `CustomEvent<{ label: string \| undefined; }>` |
| `expand`   | `CustomEvent<{ label: string \| undefined; }>` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the expander once expanded. |
| `expand-icon`       | Replaces the expand icon by default this will be the omni-chevron-down-icon. |
| `header-icon`       | Replaces the icon in the header which is usually placed on the opposite end of the expand icon. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                             |
|-------------------------------------------------|-----------------------------------------|
| `--omni-expander-background-color`              | Expander component background color.    |
| `--omni-expander-border-top`                    | Expander header border top.             |
| `--omni-expander-content-border`                | Expander content border.                |
| `--omni-expander-header-height`                 | Expander header height.                 |
| `--omni-expander-header-icon-container-padding` | Expander header icon container padding. |
| `--omni-expander-header-padding`                | Expander header padding.                |
| `--omni-expander-header-width`                  | Expander header width.                  |
| `--omni-expander-width`                         | Expander component width.               |
| `--omni-theme-accent-active-color`              | Theme accent active color.              |
| `--omni-theme-accent-color`                     | Theme accent color.                     |
| `--omni-theme-accent-hover-color`               | Theme accent hover color.               |
| `--omni-theme-background-active-color`          | Theme background active color.          |
| `--omni-theme-background-color`                 | Theme background color.                 |
| `--omni-theme-background-hover-color`           | Theme background hover color.           |
| `--omni-theme-border-radius`                    | Theme border radius.                    |
| `--omni-theme-border-width`                     | Theme border width.                     |
| `--omni-theme-box-shadow`                       | Theme box shadow.                       |
| `--omni-theme-box-shadow-color`                 | Theme inactive color.                   |
| `--omni-theme-disabled-background-color`        | Theme disabled background color.        |
| `--omni-theme-disabled-border-color`            | Theme disabled border color.            |
| `--omni-theme-error-border-color`               | Theme error border color.               |
| `--omni-theme-error-font-color`                 | Theme disabled background color.        |
| `--omni-theme-font-color`                       | Theme font color.                       |
| `--omni-theme-font-family`                      | Theme font family.                      |
| `--omni-theme-font-size`                        | Theme font size.                        |
| `--omni-theme-font-weight`                      | Theme font weight.                      |
| `--omni-theme-hint-font-color`                  | Theme hint font color.                  |
| `--omni-theme-inactive-color`                   | Theme inactive color.                   |
| `--omni-theme-primary-active-color`             | Theme primary active color.             |
| `--omni-theme-primary-color`                    | Theme primary color.                    |
| `--omni-theme-primary-hover-color`              | Theme primary hover color.              |


# omni-expander-group

Layout container that groups expanders, allowing for automatic expanding and collapsing of sibling expander controls.

## Example

html

```
<omni-expander-group>
 <omni-expander>
     <omni-label label=></omni-label>
 </omni-expander>
 <omni-expander>
     <omni-label></omni-label>
 </omni-expander>
</omni-expander-group>
```

## Properties

| Property     | Attribute     | Modifiers | Type                                  | Default  | Description                                      |
|--------------|---------------|-----------|---------------------------------------|----------|--------------------------------------------------|
| `dir`        |               |           | `string`                              |          |                                                  |
| `expandMode` | `expand-mode` |           | `"multiple" \| "single" \| undefined` | "single" | Expander component label.                        |
| `lang`       |               |           | `string`                              |          |                                                  |
| `override`   | `override`    |           |                                       |          | Used to set the base direction of text for display |
| `styles`     |               | readonly  | `CSSResultGroup[]`                    |          |                                                  |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                             |
|-------------------------------------------------|-----------------------------------------|
| `--omni-expander-group-container-margin-bottom` | Expander group container margin bottom. |
| `--omni-expander-group-container-min-height`    | Expander group min height.              |
| `--omni-expander-group-container-min-width`     | Expander group min width.               |
| `--omni-theme-accent-active-color`              | Theme accent active color.              |
| `--omni-theme-accent-color`                     | Theme accent color.                     |
| `--omni-theme-accent-hover-color`               | Theme accent hover color.               |
| `--omni-theme-background-active-color`          | Theme background active color.          |
| `--omni-theme-background-color`                 | Theme background color.                 |
| `--omni-theme-background-hover-color`           | Theme background hover color.           |
| `--omni-theme-border-radius`                    | Theme border radius.                    |
| `--omni-theme-border-width`                     | Theme border width.                     |
| `--omni-theme-box-shadow`                       | Theme box shadow.                       |
| `--omni-theme-box-shadow-color`                 | Theme inactive color.                   |
| `--omni-theme-disabled-background-color`        | Theme disabled background color.        |
| `--omni-theme-disabled-border-color`            | Theme disabled border color.            |
| `--omni-theme-error-border-color`               | Theme error border color.               |
| `--omni-theme-error-font-color`                 | Theme disabled background color.        |
| `--omni-theme-font-color`                       | Theme font color.                       |
| `--omni-theme-font-family`                      | Theme font family.                      |
| `--omni-theme-font-size`                        | Theme font size.                        |
| `--omni-theme-font-weight`                      | Theme font weight.                      |
| `--omni-theme-hint-font-color`                  | Theme hint font color.                  |
| `--omni-theme-inactive-color`                   | Theme inactive color.                   |
| `--omni-theme-primary-active-color`             | Theme primary active color.             |
| `--omni-theme-primary-color`                    | Theme primary color.                    |
| `--omni-theme-primary-hover-color`              | Theme primary hover color.              |
