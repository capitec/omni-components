# omni-tab

Control that can be used to display slotted content, for use within an omni-tabs component.

## Example

html

```
<omni-tab header='Tab 1'>
 <span>Tab 1 Content</span>
</omni-tab>
```

## Properties

| Property   | Attribute  | Modifiers | Type                   | Description                                      |
|------------|------------|-----------|------------------------|--------------------------------------------------|
| `active`   | `active`   |           | `boolean \| undefined` | Indicator if the component is active.            |
| `dir`      |            |           | `string`               |                                                  |
| `disabled` | `disabled` |           | `boolean \| undefined` | Indicator if the component is disabled.          |
| `header`   | `header`   |           | `string \| undefined`  | Tab header label.                                |
| `lang`     |            |           | `string`               |                                                  |
| `override` | `override` |           |                        | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]`     |                                                  |

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


# omni-tab-header

Control that can be used to display custom slotted content, for use within an omni-tabs component and associated omni-tab component.

## Example

html

```
<omni-tab-header for="tab-id">
 <span>Slotted Content</span>
</omni-tab-header>
```

## Properties

| Property   | Attribute  | Modifiers | Type                  | Description                                      |
|------------|------------|-----------|-----------------------|--------------------------------------------------|
| `data`     | `data`     |           | `unknown`             | Data associated with the component.              |
| `dir`      |            |           | `string`              |                                                  |
| `for`      | `for`      |           | `string \| undefined` | Indicator of which omni-tab element with the matching corresponding id attribute should be displayed. |
| `lang`     |            |           | `string`              |                                                  |
| `override` | `override` |           |                       | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]`    |                                                  |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component body.     |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                             |
|-------------------------------------------------|-----------------------------------------|
| `--omni-tab-header-active-font-color`           | Tab header active font color.           |
| `--omni-tab-header-disabled-background-color`   | Tab header disabled background color.   |
| `--omni-tab-header-font-color`                  | Tab header font color.                  |
| `--omni-tab-header-font-family`                 | Tab header font family.                 |
| `--omni-tab-header-font-size`                   | Tab header font size.                   |
| `--omni-tab-header-font-weight`                 | Tab header font weight.                 |
| `--omni-tab-header-height`                      | Tab header tab height.                  |
| `--omni-tab-header-hover-background-color`      | Tab header tab hover background.        |
| `--omni-tab-header-indicator-bar-border-radius` | Tab header indicator bar border radius. |
| `--omni-tab-header-indicator-bar-height`        | Tab header indicator bar height.        |
| `--omni-tab-header-indicator-bar-width`         | Tab header indicator bar width.         |
| `--omni-tab-header-indicator-border-radius`     | Tab header indicator border radius.     |
| `--omni-tab-header-indicator-color`             | Tab header indicator color.             |
| `--omni-tab-header-indicator-height`            | Tab header indicator height.            |
| `--omni-tab-header-indicator-width`             | Tab header indicator width.             |
| `--omni-tab-header-margin`                      | Tab header tab margin.                  |
| `--omni-tab-header-max-width`                   | Tab header tab max width.               |
| `--omni-tab-header-min-width`                   | Tab header tab min width.               |
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


# omni-tabs

Component that displays content in tabs.

## Example

```html
<omni-tabs>
 <omni-tab header='Tab 1'>
  <omni-label>Tab 1</omni-label>
 </omni-tab>
 <omni-tab header="Tab 2">
  <omni-label>Tab 2</omni-label>
 </omni-tab>
 <omni-tab header="Tab 3">
  <omni-label>Tab 3</omni-label>
 </omni-tab>
</omni-tabs>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Description                                      |
|------------|------------|-----------|--------------------|--------------------------------------------------|
| `dir`      |            |           | `string`           |                                                  |
| `lang`     |            |           | `string`           |                                                  |
| `override` | `override` |           |                    | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]` |                                                  |

## Methods

| Method      | Type                           |
|-------------|--------------------------------|
| `selectTab` | `(tabHeader: TabHeader): void` |

## Events

| Event        | Type                                             | Description                              |
|--------------|--------------------------------------------------|------------------------------------------|
| `tab-select` | `CustomEvent<{ previous: HTMLElement, selected: HTMLElement}>` | Dispatched when an omni-tab is selected. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | All omni-tab components that are managed by this component. |
| `header`            | Optional omni-tab-header components associated with each omni-tab component. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                        | Description                                      |
|-------------------------------------------------|--------------------------------------------------|
| `--omni-tab-header-active-font-color`           | Tab component header active font color.          |
| `--omni-tab-header-disabled-background-color`   | Tab header component disabled background color.  |
| `--omni-tab-header-font-color`                  | Tab header component font color.                 |
| `--omni-tab-header-font-family`                 | Tab header component font family.                |
| `--omni-tab-header-font-size`                   | Tab header component font size.                  |
| `--omni-tab-header-font-weight`                 | Tab header component font weight.                |
| `--omni-tab-header-height`                      | Tab header component tab height.                 |
| `--omni-tab-header-hover-background-color`      | Tab header component tab hover background.       |
| `--omni-tab-header-indicator-bar-border-radius` | Tab header component indicator bar border radius. |
| `--omni-tab-header-indicator-bar-height`        | Tab header component indicator bar height.       |
| `--omni-tab-header-indicator-bar-width`         | Tab header component indicator bar width.        |
| `--omni-tab-header-indicator-border-radius`     | Tab header component indicator border radius.    |
| `--omni-tab-header-indicator-color`             | Tab header component indicator color.            |
| `--omni-tab-header-indicator-height`            | Tab header component indicator height.           |
| `--omni-tab-header-indicator-width`             | Tab header component indicator width.            |
| `--omni-tab-header-margin`                      | Tab header component tab margin.                 |
| `--omni-tab-header-max-width`                   | Tab header component tab max width.              |
| `--omni-tab-header-min-width`                   | Tab header component tab min width.              |
| `--omni-tabs-tab-bar-background-color`          | Tabs tab bar background color.                   |
| `--omni-tabs-tab-bar-border-bottom`             | Tabs tab bar bottom border.                      |
| `--omni-tabs-tab-bar-height`                    | Tabs tab bar height.                             |
| `--omni-tabs-tab-bar-width`                     | Tabs tab bar width.                              |
| `--omni-theme-accent-active-color`              | Theme accent active color.                       |
| `--omni-theme-accent-color`                     | Theme accent color.                              |
| `--omni-theme-accent-hover-color`               | Theme accent hover color.                        |
| `--omni-theme-background-active-color`          | Theme background active color.                   |
| `--omni-theme-background-color`                 | Theme background color.                          |
| `--omni-theme-background-hover-color`           | Theme background hover color.                    |
| `--omni-theme-border-radius`                    | Theme border radius.                             |
| `--omni-theme-border-width`                     | Theme border width.                              |
| `--omni-theme-box-shadow`                       | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`                 | Theme inactive color.                            |
| `--omni-theme-disabled-background-color`        | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`            | Theme disabled border color.                     |
| `--omni-theme-error-border-color`               | Theme error border color.                        |
| `--omni-theme-error-font-color`                 | Theme disabled background color.                 |
| `--omni-theme-font-color`                       | Theme font color.                                |
| `--omni-theme-font-family`                      | Theme font family.                               |
| `--omni-theme-font-size`                        | Theme font size.                                 |
| `--omni-theme-font-weight`                      | Theme font weight.                               |
| `--omni-theme-hint-font-color`                  | Theme hint font color.                           |
| `--omni-theme-inactive-color`                   | Theme inactive color.                            |
| `--omni-theme-primary-active-color`             | Theme primary active color.                      |
| `--omni-theme-primary-color`                    | Theme primary color.                             |
| `--omni-theme-primary-hover-color`              | Theme primary hover color.                       |
