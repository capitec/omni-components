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
| `clearable`    | `clearable`     |           | `boolean`                                        | false               | Toggles the ability to clear the value of the component. |
| `data`         | `data`          |           | `object \| undefined`                            |                     | Data associated with the component.              |
| `dir`          |                 |           | `string`                                         |                     |                                                  |
| `disabled`     | `disabled`      |           | `boolean`                                        | false               | Indicator if the component should be disabled.   |
| `displayField` | `display-field` |           | `string \| undefined`                            |                     | Field of the item to display as one of the selectable options. |
| `emptyMessage` | `empty-message` |           | `string`                                         | "No items provided" | Message displayed in the items container when no items are bound to the component. |
| `error`        | `error`         |           | `string \| undefined`                            |                     | Error message guiding a user to correct a mistake. |
| `hint`         | `hint`          |           | `string \| undefined`                            |                     | Hint message to assist the user.                 |
| `idField`      | `id-field`      |           | `string`                                         | "id"                | Id field of the items provided.                  |
| `items`        | `items`         |           | `string[] \| Record<string, unknown>[] \| Promise<SelectTypes> \| (() => SelectItems) \| undefined` |                     | Selectable items of the select component.        |
| `label`        | `label`         |           | `string \| undefined`                            |                     | Text label.                                      |
| `lang`         |                 |           | `string`                                         |                     |                                                  |
| `override`     | `override`      |           |                                                  |                     | Used to set the base direction of text for display |
| `renderItem`   | `renderItem`    |           | `RenderFunction \| undefined`                    |                     | Render function for each item.                   |
| `styles`       |                 | readonly  | `CSSResultGroup[]`                               |                     |                                                  |
| `value`        | `value`         |           | `string \| number \| Record<string, unknown> \| undefined` | null                | Value entered into the form component.           |

## Methods

| Method          | Type                                     |
|-----------------|------------------------------------------|
| `renderContent` | `(): TemplateResult<1>`                  |
| `renderControl` | `(): TemplateResult<1>`                  |
| `renderLabel`   | `(): TemplateResult<1>`                  |
| `renderLoading` | `(): TemplateResult<1>`                  |
| `renderPicker`  | `(): TemplateResult<1> \| unique symbol` |

## Events

| Event    |
|----------|
| `change` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `arrow`             | Replaces the icon for the arrow slot (Displays on desktop and tablet devices). |
| `clear`             | Replaces the icon for the clear slot.            |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `more`              | Replaces the icon for the more slot (Displays on mobile devices). |
| `prefix`            | Replaces the icon for the prefix slot.           |
| `suffix`            | Replaces the icon for the suffix slot.           |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-container-font-family`                   | Container font family.                           |
| `--omni-container-height`                        | Container height.                                |
| `--omni-container-width`                         | Container width.                                 |
| `--omni-form-border-bottom`                      | Form border bottom.                              |
| `--omni-form-border-color`                       | Form border color.                               |
| `--omni-form-border-left`                        | Form border left.                                |
| `--omni-form-border-radius`                      | Form border radius.                              |
| `--omni-form-border-right`                       | Form border right.                               |
| `--omni-form-border-style`                       | Form border style.                               |
| `--omni-form-border-top`                         | Form border top.                                 |
| `--omni-form-border-width`                       | Form border width.                               |
| `--omni-form-clear-control-margin-left`          | Form clear control left margin.                  |
| `--omni-form-clear-control-margin-right`         | Form clear control right margin.                 |
| `--omni-form-clear-control-width`                | Form clear control width.                        |
| `--omni-form-clear-icon-color`                   | Form clear icon color.                           |
| `--omni-form-disabled-background-color`          | Form disabled background color.                  |
| `--omni-form-disabled-border-color`              | Form disabled border color.                      |
| `--omni-form-disabled-focussed-label-background-color` | Form disabled label focussed background color.   |
| `--omni-form-disabled-hover-color`               | Form disabled hover color.                       |
| `--omni-form-error-border-color`                 | Form error border color.                         |
| `--omni-form-error-hover-color`                  | Form error hover color.                          |
| `--omni-form-error-label-border-width`           | Form error label border width.                   |
| `--omni-form-error-label-color`                  | Form error label color.                          |
| `--omni-form-error-label-font-color`             | Form error label font color.                     |
| `--omni-form-error-label-font-family`            | Form error label font family.                    |
| `--omni-form-error-label-font-size`              | Form error label font size.                      |
| `--omni-form-error-label-font-weight`            | Form error label font weight.                    |
| `--omni-form-error-label-padding-left`           | Form error label left padding.                   |
| `--omni-form-error-label-padding-top`            | Form error label top padding.                    |
| `--omni-form-focussed-border-color`              | Form focussed border color.                      |
| `--omni-form-focussed-border-width`              | Form focussed border width.                      |
| `--omni-form-focussed-error-label-color`         | Form focussed error label color.                 |
| `--omni-form-focussed-label-background-color`    | Form focussed label background color.            |
| `--omni-form-focussed-label-color`               | Form focussed label color.                       |
| `--omni-form-focussed-label-disabled-background-color` | Form focussed label disabled background color.   |
| `--omni-form-focussed-label-margin-left`         | Form focussed label left margin.                 |
| `--omni-form-focussed-label-padding-left`        | Form focussed label left.                        |
| `--omni-form-focussed-label-padding-right`       | Form focussed label right.                       |
| `--omni-form-focussed-label-transform-scale`     | Form focussed label transform scale.             |
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
| `--omni-form-label-margin-left`                  | Form label margin left.                          |
| `--omni-form-label-text-align`                   | Form label text align.                           |
| `--omni-form-label-z-index`                      | Form label z-index.                              |
| `--omni-form-layout-background-color`            | Layout background color.                         |
| `--omni-form-layout-border-radius`               | Layout border radius.                            |
| `--omni-form-layout-height`                      | Layout height.                                   |
| `--omni-form-layout-width`                       | Layout width.                                    |
| `--omni-select-control-icon-color`               | Select control icon color.                       |
| `--omni-select-control-icon-error-color`         | Select control error icon color.                 |
| `--omni-select-control-icon-height`              | Select control icon height.                      |
| `--omni-select-control-icon-width`               | Select control icon width.                       |
| `--omni-select-control-padding`                  | Select component control padding.                |
| `--omni-select-dialog-background-color`          | Select dialog background color.                  |
| `--omni-select-dialog-bottom`                    | Select dialog bottom.                            |
| `--omni-select-dialog-left`                      | Select dialog left.                              |
| `--omni-select-dialog-modal-max-height`          | Select dialog height.                            |
| `--omni-select-dialog-modal-max-width`           | Select dialog modal max width.                   |
| `--omni-select-dialog-right`                     | Select dialog right.                             |
| `--omni-select-field-disabled-font-color`        | Select component input field disabled font color. |
| `--omni-select-field-error-font-color`           | Select component input field error font color.   |
| `--omni-select-field-font-color`                 | Select component input field font color.         |
| `--omni-select-field-font-family`                | Select component input field font family.        |
| `--omni-select-field-font-size`                  | Select component input field font size.          |
| `--omni-select-field-font-weight`                | Select component input field font weight.        |
| `--omni-select-field-height`                     | Select component input field height.             |
| `--omni-select-field-padding`                    | Select component input field padding.            |
| `--omni-select-field-text-align`                 | Select component input field text align.         |
| `--omni-select-field-width`                      | Select component input field width.              |
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
