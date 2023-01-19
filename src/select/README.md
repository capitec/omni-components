# omni-select

Control to get / set a value within a list of options.

## Example

```html
<omni-select
  label="Enter a value"
  value="Hello World"
  hint="Required"
  error="Field level error message"
  items={'item1','item2','item3','item4'}
  display-field="label"
  id-field="id"
  disabled>
</omni-select>
```

## Properties

| Property       | Attribute       | Modifiers | Type                                             | Default             | Description                                      |
|----------------|-----------------|-----------|--------------------------------------------------|---------------------|--------------------------------------------------|
| `data`         | `data`          |           | `object`                                         |                     | Data associated with the component.              |
| `dir`          |                 |           | `string`                                         |                     |                                                  |
| `disabled`     | `disabled`      |           | `boolean`                                        | false               | Indicator if the component should be disabled.   |
| `displayField` | `display-field` |           | `string`                                         |                     | Field of the item to display as one of the selectable options. |
| `emptyMessage` | `empty-message` |           | `string`                                         | "No items provided" | Message displayed in the items container when no items are bound to the component. |
| `error`        | `error`         |           | `string`                                         |                     | Error message guiding a user to correct a mistake. |
| `hint`         | `hint`          |           | `string`                                         |                     | Hint message to assist the user.                 |
| `idField`      | `id-field`      |           | `string`                                         | "id"                | Id field of the items provided.                  |
| `items`        | `items`         |           | `string[] \| Record<string, unknown>[] \| Promise<SelectTypes> \| (() => SelectItems)` |                     | Selectable items of the select component.        |
| `label`        | `label`         |           | `string`                                         |                     | Text label.                                      |
| `lang`         |                 |           | `string`                                         |                     |                                                  |
| `override`     | `override`      |           |                                                  |                     | Used to set the base direction of text for display |
| `renderItem`   | `renderItem`    |           | `RenderFunction`                                 |                     | Render function for each item.                   |
| `styles`       |                 | readonly  | `CSSResultGroup[]`                               |                     |                                                  |
| `value`        | `value`         |           | `string \| number \| Record<string, unknown>`    | null                | Value entered into the form component.           |

## Methods

| Method          | Type                                     |
|-----------------|------------------------------------------|
| `renderContent` | `(): TemplateResult<1>`                  |
| `renderControl` | `(): TemplateResult<1>`                  |
| `renderLoading` | `(): TemplateResult<1>`                  |
| `renderPicker`  | `(): TemplateResult<1> \| unique symbol` |

## Events

| Event    |
|----------|
| `change` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `prefix`            | Replaces the icon for the prefix slot.           |
| `suffix`            | Replaces the icon for the suffix slot.           |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-form-border-bottom`                      | Form border bottom.                              |
| `--omni-form-border-color`                       | Form border color.                               |
| `--omni-form-border-left`                        | Form border left.                                |
| `--omni-form-border-radius`                      | Form border radius.                              |
| `--omni-form-border-right`                       | Form border right.                               |
| `--omni-form-border-style`                       | Form border style.                               |
| `--omni-form-border-top`                         | Form border top.                                 |
| `--omni-form-border-width`                       | Form border width.                               |
| `--omni-form-container-font-family`              | Form container font family.                      |
| `--omni-form-container-width`                    | Form container width.                            |
| `--omni-form-disabled-background-color`          | Form disabled background color.                  |
| `--omni-form-disabled-border-color`              | Form disabled border color.                      |
| `--omni-form-disabled-focussed-label-background-color` | Form disabled label focussed background color.   |
| `--omni-form-disabled-hover-color`               | Form disabled hover color.                       |
| `--omni-form-error-border-color`                 | Form error border color.                         |
| `--omni-form-error-hover-color`                  | Form error hover color.                          |
| `--omni-form-error-label-border-width`           |                                                  |
| `--omni-form-error-label-color`                  | Form error label color.                          |
| `--omni-form-error-label-font-color`             | Form error label font color.                     |
| `--omni-form-error-label-font-family`            | Form error label font family.                    |
| `--omni-form-error-label-font-size`              | Form error label font size.                      |
| `--omni-form-error-label-font-weight`            | Form error label font weight.                    |
| `--omni-form-error-label-padding-left`           | Form error label left padding.                   |
| `--omni-form-error-label-padding-top`            | Form error label top padding.                    |
| `--omni-form-field-background-color`             | Form layout background color.                    |
| `--omni-form-focussed-border-color`              | Form focussed border color.                      |
| `--omni-form-focussed-border-width`              | Form focussed border width.                      |
| `--omni-form-focussed-label-color`               | Form focussed label color.                       |
| `--omni-form-focussed-label-error-color`         | Form focussed error label color.                 |
| `--omni-form-hint-label-border-width`            | Form hint label border width.                    |
| `--omni-form-hint-label-font-color`              | Form hint label font color.                      |
| `--omni-form-hint-label-font-family`             | Form hint label font family.                     |
| `--omni-form-hint-label-font-size`               | Form hint label font size.                       |
| `--omni-form-hint-label-font-weight`             | Form hint label font weight.                     |
| `--omni-form-hint-label-padding-left`            | Form hint label left padding.                    |
| `--omni-form-hint-label-padding-top`             | Form hint label top padding.                     |
| `--omni-form-hover-color`                        | Form hover color.                                |
| `--omni-form-label-color`                        | Form label color.                                |
| `--omni-form-label-disabled-color`               | Form label disabled color.                       |
| `--omni-form-label-font-size`                    | Form label font size.                            |
| `--omni-form-label-font-weight`                  | Form label font weight.                          |
| `--omni-form-label-left`                         | Form label left margin.                          |
| `--omni-form-label-text-align`                   | Form label text align.                           |
| `--omni-form-label-transform-origin`             | Form label text align                            |
| `--omni-form-label-z-index`                      | Form label z-index.                              |
| `--omni-select-control-icon-color`               | Select control icon color.                       |
| `--omni-select-control-icon-width`               | Select control icon width.                       |
| `--omni-select-control-margin-left`              | Select control left margin.                      |
| `--omni-select-control-margin-right`             | Select control right margin.                     |
| `--omni-select-control-width`                    | Select control width.                            |
| `--omni-select-field-font-color`                 | Select component input field font color.         |
| `--omni-select-field-font-family`                | Select component input field font family.        |
| `--omni-select-field-font-size`                  | Select component input field font size.          |
| `--omni-select-field-font-weight`                | Select component input field font weight.        |
| `--omni-select-field-height`                     | Select component input field height              |
| `--omni-select-field-padding`                    | Select component input field padding.            |
| `--omni-select-field-text-align`                 | Select component input field text align.         |
| `--omni-select-item-font-color`                  | Select item font color.                          |
| `--omni-select-item-font-family`                 | Select item font family.                         |
| `--omni-select-item-font-weight`                 | Select item font weight.                         |
| `--omni-select-item-header-font-background-color` | Select item header font background color.        |
| `--omni-select-item-header-font-family`          | Select item header font family.                  |
| `--omni-select-item-header-font-size`            | Select item header font size.                    |
| `--omni-select-item-header-font-weight`          | Select item header font weight.                  |
| `--omni-select-item-header-item-border-top-left-radius` | Select item header top left border radius.       |
| `--omni-select-item-header-item-border-top-right-radius` | Select item header top right border radius.      |
| `--omni-select-item-header-left`                 | Select item header left.                         |
| `--omni-select-item-header-padding-bottom`       | Select item head bottom padding.                 |
| `--omni-select-item-header-padding-left`         | Select item head left padding.                   |
| `--omni-select-item-header-padding-right`        | Select item head right padding.                  |
| `--omni-select-item-header-padding-top`          | Select item header top padding.                  |
| `--omni-select-item-header-right`                | Select item header right.                        |
| `--omni-select-item-hover-background-color`      | Select item hover background color.              |
| `--omni-select-item-none-hover`                  | Select item hover.                               |
| `--omni-select-item-padding-bottom`              | Select item bottom padding.                      |
| `--omni-select-item-padding-left`                | Select item left padding.                        |
| `--omni-select-item-padding-right`               | Select item right padding.                       |
| `--omni-select-item-padding-top`                 | Select item top padding.                         |
| `--omni-select-item-selected-color`              | Selected item color.                             |
| `--omni-select-item-width`                       | Select item width.                               |
| `--omni-select-items-container-background-color` | Select items container background color.         |
| `--omni-select-items-container-box-shadow`       | Select items container box shadow.               |
| `--omni-select-items-container-render-bottom-top` | Select items container top when rendered at the bottom. |
| `--omni-select-items-container-top`              | Select items container top.                      |
| `--omni-select-items-container-width`            | Select items container width                     |
| `--omni-select-items-height`                     | Select items height.                             |
| `--omni-select-items-width`                      | Select items width.                              |
| `--omni-select-loading-indicator-height`         | Select loading indicator height.                 |
| `--omni-select-loading-indicator-width`          | Select loading indicator width.                  |
| `--omni-select-mobile-items-container-border-top-left-radius` | Select item container for mobile top left radius. |
| `--omni-select-mobile-items-container-border-top-right-radius` | Select item container for mobile right left radius. |
| `--omni-select-mobile-items-container-bottom`    | Select item container for mobile bottom.         |
| `--omni-select-mobile-items-container-left`      | Select item container for mobile left.           |
| `--omni-select-mobile-items-container-right`     | Select item container for mobile right.          |
| `--omni-theme-accent-active-color`               | Theme accent active color.                       |
| `--omni-theme-accent-color`                      | Theme accent color.                              |
| `--omni-theme-accent-hover-color`                | Theme accent hover color.                        |
| `--omni-theme-background-active-color`           | Theme background active color.                   |
| `--omni-theme-background-color`                  | Theme background color.                          |
| `--omni-theme-background-hover-color`            | Theme background hover color.                    |
| `--omni-theme-border-radius`                     | Theme border radius.                             |
| `--omni-theme-border-width`                      | Theme border width.                              |
| `--omni-theme-box-shadow`                        | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`                  | Theme inactive color.                            |
| `--omni-theme-disabled-background-color`         | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`             | Theme disabled border color.                     |
| `--omni-theme-error-border-color`                | Theme error border color.                        |
| `--omni-theme-error-font-color`                  | Theme disabled background color.                 |
| `--omni-theme-font-color`                        | Theme font color.                                |
| `--omni-theme-font-family`                       | Theme font family.                               |
| `--omni-theme-font-size`                         | Theme font size.                                 |
| `--omni-theme-font-weight`                       | Theme font weight.                               |
| `--omni-theme-hint-font-color`                   | Theme hint font color.                           |
| `--omni-theme-inactive-color`                    | Theme inactive color.                            |
| `--omni-theme-primary-active-color`              | Theme primary active color.                      |
| `--omni-theme-primary-color`                     | Theme primary color.                             |
| `--omni-theme-primary-hover-color`               | Theme primary hover color.                       |
