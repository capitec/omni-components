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

| Property                                         | Description                                |
|--------------------------------------------------|--------------------------------------------|
| `--omni-expander-background`                     | Expander component background.             |
| `--omni-expander-content-border`                 | Expander content border.                   |
| `--omni-expander-content-closed-padding-bottom`  | Expander content closed bottom padding.    |
| `--omni-expander-content-closed-padding-top`     | Expander content closed top padding.       |
| `--omni-expander-content-height`                 | Expander content height.                   |
| `--omni-expander-content-padding`                | Expander content padding.                  |
| `--omni-expander-content-width`                  | Expander content width.                    |
| `--omni-expander-expand-icon-color`              | Expander expand icon color.                |
| `--omni-expander-expand-icon-container-padding`  | Expander expand icon container padding.    |
| `--omni-expander-expand-icon-height`             | Expander expand icon height.               |
| `--omni-expander-expand-icon-width`              | Expander expand icon width.                |
| `--omni-expander-expanded-height`                | Expander component expanded height.        |
| `--omni-expander-expanding-container-padding-bottom` | Expander expanding content bottom padding. |
| `--omni-expander-expanding-container-padding-top` | Expander expanding content top padding.    |
| `--omni-expander-header-border-top`              | Expander header border top.                |
| `--omni-expander-header-disabled-background`     | Expander header disabled background.       |
| `--omni-expander-header-height`                  | Expander header height.                    |
| `--omni-expander-header-hover-background`        | Expander header hover background.          |
| `--omni-expander-header-icon-container-padding`  | Expander header icon container padding.    |
| `--omni-expander-header-icon-slot-height`        | Expander header icon slot height.          |
| `--omni-expander-header-icon-slot-width`         | Expander header icon slot width.           |
| `--omni-expander-header-max-height`              | Expander component maximum height.         |
| `--omni-expander-header-min-height`              | Expander component minimum height.         |
| `--omni-expander-header-padding`                 | Expander header padding.                   |
| `--omni-expander-header-width`                   | Expander header width.                     |
| `--omni-expander-width`                          | Expander component width.                  |
| `--omni-theme-accent-active-color`               | Theme accent active color.                 |
| `--omni-theme-accent-color`                      | Theme accent color.                        |
| `--omni-theme-accent-hover-color`                | Theme accent hover color.                  |
| `--omni-theme-background-active-color`           | Theme background active color.             |
| `--omni-theme-background-color`                  | Theme background color.                    |
| `--omni-theme-background-hover-color`            | Theme background hover color.              |
| `--omni-theme-border-radius`                     | Theme border radius.                       |
| `--omni-theme-border-width`                      | Theme border width.                        |
| `--omni-theme-box-shadow`                        | Theme box shadow.                          |
| `--omni-theme-box-shadow-color`                  | Theme inactive color.                      |
| `--omni-theme-disabled-background-color`         | Theme disabled background color.           |
| `--omni-theme-disabled-border-color`             | Theme disabled border color.               |
| `--omni-theme-error-border-color`                | Theme error border color.                  |
| `--omni-theme-error-font-color`                  | Theme disabled background color.           |
| `--omni-theme-font-color`                        | Theme font color.                          |
| `--omni-theme-font-family`                       | Theme font family.                         |
| `--omni-theme-font-size`                         | Theme font size.                           |
| `--omni-theme-font-weight`                       | Theme font weight.                         |
| `--omni-theme-hint-font-color`                   | Theme hint font color.                     |
| `--omni-theme-inactive-color`                    | Theme inactive color.                      |
| `--omni-theme-primary-active-color`              | Theme primary active color.                |
| `--omni-theme-primary-color`                     | Theme primary color.                       |
| `--omni-theme-primary-hover-color`               | Theme primary hover color.                 |


# omni-expander-group

Layout container that groups expanders, allowing for automatic expanding and collapsing of sibling expander components.

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
