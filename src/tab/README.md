# omni-tab

Control that can be used to display slotted content used within a omni-tab-group component.

## Example

html

```
<omni-tab>
 <span>Slotted Content</span>
</omni-tab>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Description                                      |
|------------|------------|-----------|--------------------|--------------------------------------------------|
| `dir`      |            |           | `string`           |                                                  |
| `lang`     |            |           | `string`           |                                                  |
| `override` | `override` |           |                    | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |                                                  |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component body.     |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                 | Description                      |
|------------------------------------------|----------------------------------|
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


# omni-tab-group

Component that displays content in tabs.

## Example

```html
<omni-tab-group>
 <omni-tab data-omni-tab-label="Details">
  <omni-label label="Tab 1"></omni-label>
 </omni-tab>
 <omni-tab data-omni-tab-label="Comments (3)">
  <omni-label label="Tab 2"></omni-label>
 </omni-tab>
</omni-tab-group>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Description                                      |
|------------|------------|-----------|--------------------|--------------------------------------------------|
| `dir`      |            |           | `string`           |                                                  |
| `lang`     |            |           | `string`           |                                                  |
| `override` | `override` |           |                    | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |                                                  |

## Methods

| Method      | Type                   |
|-------------|------------------------|
| `selectTab` | `(tab: Element): void` |

## Events

| Event        | Type              | Description                                      |
|--------------|-------------------|--------------------------------------------------|
| `tab-select` | `CustomEvent<{}>` | Dispatched when one of the omni-tabs is clicked. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component body.     |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                       | Description                                   |
|------------------------------------------------|-----------------------------------------------|
| `--omni-tab-group-tab-bar-background-color`    | Tab group tab bar background color.           |
| `--omni-tab-group-tab-bar-border-bottom`       | Tab group tab bar bottom border.              |
| `--omni-tab-group-tab-bar-height`              | Tab group tab bar height.                     |
| `--omni-tab-group-tab-bar-width`               | Tab group tab bar width.                      |
| `--omni-tab-group-tab-height`                  | Tab group tab height.                         |
| `--omni-tab-group-tab-hover-background-color`  | Tab group tab hover background.               |
| `--omni-tab-group-tab-indicator-border-radius` | Tab group active tab indicator border radius. |
| `--omni-tab-group-tab-indicator-color`         | Tab group active tab indicator color.         |
| `--omni-tab-group-tab-indicator-height`        | Tab group active tab indicator height..       |
| `--omni-tab-group-tab-indicator-width`         | Tab group active tab indicator width.         |
| `--omni-tab-group-tab-label-container-height`  | Tab group tab label container height.         |
| `--omni-tab-group-tab-label-font-color`        | Tab group tab label font color.               |
| `--omni-tab-group-tab-label-font-family`       | Tab group tab label font family.              |
| `--omni-tab-group-tab-label-font-size`         | Tab group tab label font size.                |
| `--omni-tab-group-tab-label-font-weight`       | Tab group tab label font weight.              |
| `--omni-tab-group-tab-margin`                  | Tab group tab margin.                         |
| `--omni-tab-group-tab-max-width`               | Tab group tab max width.                      |
| `--omni-tab-group-tab-min-width`               | Tab group tab min width.                      |
| `--omni-tab-group-tab-selected-font-color`     | Tab group active tab label font color.        |
| `--omni-tab-group-tab-tab-indicator-height`    | Tab group tab active indicator height.        |
| `--omni-theme-accent-active-color`             | Theme accent active color.                    |
| `--omni-theme-accent-color`                    | Theme accent color.                           |
| `--omni-theme-accent-hover-color`              | Theme accent hover color.                     |
| `--omni-theme-background-active-color`         | Theme background active color.                |
| `--omni-theme-background-color`                | Theme background color.                       |
| `--omni-theme-background-hover-color`          | Theme background hover color.                 |
| `--omni-theme-border-radius`                   | Theme border radius.                          |
| `--omni-theme-border-width`                    | Theme border width.                           |
| `--omni-theme-box-shadow`                      | Theme box shadow.                             |
| `--omni-theme-box-shadow-color`                | Theme inactive color.                         |
| `--omni-theme-disabled-background-color`       | Theme disabled background color.              |
| `--omni-theme-disabled-border-color`           | Theme disabled border color.                  |
| `--omni-theme-error-border-color`              | Theme error border color.                     |
| `--omni-theme-error-font-color`                | Theme disabled background color.              |
| `--omni-theme-font-color`                      | Theme font color.                             |
| `--omni-theme-font-family`                     | Theme font family.                            |
| `--omni-theme-font-size`                       | Theme font size.                              |
| `--omni-theme-font-weight`                     | Theme font weight.                            |
| `--omni-theme-hint-font-color`                 | Theme hint font color.                        |
| `--omni-theme-inactive-color`                  | Theme inactive color.                         |
| `--omni-theme-primary-active-color`            | Theme primary active color.                   |
| `--omni-theme-primary-color`                   | Theme primary color.                          |
| `--omni-theme-primary-hover-color`             | Theme primary hover color.                    |
| `--theme-tab-selected-font-color`              | Tab group active Tab font color.              |
