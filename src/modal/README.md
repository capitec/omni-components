# omni-modal

Control to display modal content with optional header and footer content.

## Example

```html
<omni-modal header-label="Header Label" header-align="center">
   <span slot="header">Rich Header Content</span>
   <span>Body Content</span>
   <span slot="footer">Footer Content</span>
</omni-modal>
```

## Properties

| Property       | Attribute       | Modifiers | Type                                         | Default | Description                                      |
|----------------|-----------------|-----------|----------------------------------------------|---------|--------------------------------------------------|
| `dir`          |                 |           | `string`                                     |         |                                                  |
| `headerAlign`  | `header-align`  |           | `"left" \| "center" \| "right" \| undefined` |         | Header text horizontal alignment:<br />  - `left` Align header to the left.<br />  - `center` Align header to the center.<br />  - `right` Align header to the right. |
| `headerLabel`  | `header-label`  |           | `string`                                     | ""      | Title text to be displayed in header area.       |
| `hide`         | `hide`          |           | `boolean \| undefined`                       |         | If true, will hide the modal.                    |
| `lang`         |                 |           | `string`                                     |         |                                                  |
| `noFooter`     | `no-footer`     |           | `boolean \| undefined`                       |         | If true, will not display the footer section of the modal |
| `noFullscreen` | `no-fullscreen` |           | `boolean \| undefined`                       |         | If true, will not apply the modal as fullscreen on mobile viewports. |
| `noHeader`     | `no-header`     |           | `boolean \| undefined`                       |         | If true, will not display the header section of the modal |
| `styles`       |                 | readonly  | `CSSResultGroup[]`                           |         |                                                  |

## Events

| Event           | Description                                      |
|-----------------|--------------------------------------------------|
| `click-outside` | Dispatched when a click or touch occurs outside the modal container. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component body.     |
| `footer`            | Content to render inside the component footer.   |
| `header`            | Content to render inside the component header.   |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Shadow Parts

| Part        | Description                                      |
|-------------|--------------------------------------------------|
| `backdrop`  | Internal `HTMLDivElement` instance for backdrop. |
| `body`      | Internal `HTMLDivElement` instance for body.     |
| `container` | Internal `HTMLDivElement` instance for container. |
| `dialog`    | Internal `HTMLDialogElement` instance.           |
| `footer`    | Internal `HTMLDivElement` instance for footer.   |
| `header`    | Internal `HTMLDivElement` instance for header.   |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-modal-body-background`                   | Background for modal body.                       |
| `--omni-modal-body-font-color`                   | Font color for modal body.                       |
| `--omni-modal-body-font-family`                  | Font family for modal body.                      |
| `--omni-modal-body-font-size`                    | Font size for modal body.                        |
| `--omni-modal-body-font-weight`                  | Font weight for modal body.                      |
| `--omni-modal-body-overflow`                     | Overflow for modal body.                         |
| `--omni-modal-body-padding`                      | Padding for modal body.                          |
| `--omni-modal-container-box-shadow`              | Box shadow for modal content container.          |
| `--omni-modal-container-padding`                 | Padding for modal content container.             |
| `--omni-modal-dialog-background`                 | Background for wrapping `HTMLDialogElement` backdrop. |
| `--omni-modal-dialog-bottom`                     | Bottom position for wrapping `HTMLDialogElement`. |
| `--omni-modal-dialog-left`                       | Left position for wrapping `HTMLDialogElement`.  |
| `--omni-modal-dialog-right`                      | Right position for wrapping `HTMLDialogElement`. |
| `--omni-modal-dialog-top`                        | Top position for wrapping `HTMLDialogElement`.   |
| `--omni-modal-footer-background`                 | Background for modal footer.                     |
| `--omni-modal-footer-font-color`                 | Font color for modal footer.                     |
| `--omni-modal-footer-font-family`                | Font family for modal footer.                    |
| `--omni-modal-footer-font-size`                  | Font size for modal footer.                      |
| `--omni-modal-footer-font-weight`                | Font weight for modal footer.                    |
| `--omni-modal-footer-padding`                    | Padding for modal footer.                        |
| `--omni-modal-footer-text-align`                 | Text align for modal footer.                     |
| `--omni-modal-header-background`                 | Background for modal header.                     |
| `--omni-modal-header-border-radius`              | Border radius for modal header.                  |
| `--omni-modal-header-font-color`                 | Font color for modal header.                     |
| `--omni-modal-header-font-family`                | Font family for modal header.                    |
| `--omni-modal-header-font-size`                  | Font size for modal header.                      |
| `--omni-modal-header-font-weight`                | Font weight for modal header.                    |
| `--omni-modal-header-padding-bottom`             | Bottom padding for modal header.                 |
| `--omni-modal-header-padding-left`               | Left padding for modal header.                   |
| `--omni-modal-header-padding-right`              | Right padding for modal header.                  |
| `--omni-modal-header-padding-top`                | Top padding for modal header.                    |
| `--omni-modal-max-height`                        | Max height for modal content container.          |
| `--omni-modal-max-width`                         | Max width for modal content container.           |
| `--omni-modal-no-footer-body-border-bottom-radius` | Bottom border radius for modal body when there is no footer. |
| `--omni-modal-no-header-body-border-top-radius`  | Top border radius for modal body when there is no header. |
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
