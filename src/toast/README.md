# omni-toast

Component to visually notify a user of a message.

## Example

```html
<omni-toast
  type="info"
  header="Toast Title"
  detail="Short detail Text"
  closable>
</omni-toast>
```

## Properties

| Property    | Attribute   | Modifiers | Type                                             | Default | Description                                      |
|-------------|-------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `closeable` | `closeable` |           | `boolean \| undefined`                           |         | If true, will display a close button that fires a `close-click` event when clicked. |
| `detail`    | `detail`    |           | `string \| undefined`                            |         | The toast detail.                                |
| `dir`       |             |           | `string`                                         |         |                                                  |
| `header`    | `header`    |           | `string \| undefined`                            |         | The toast title.                                 |
| `lang`      |             |           | `string`                                         |         |                                                  |
| `override`  | `override`  |           |                                                  |         | Used to set the base direction of text for display |
| `styles`    |             | readonly  | `CSSResultGroup[]`                               |         |                                                  |
| `type`      | `type`      |           | `"none" \| "success" \| "warning" \| "error" \| "info"` | "none"  | The type of toast to display.                    |

## Events

| Event         | Type              | Description                                      |
|---------------|-------------------|--------------------------------------------------|
| `close-click` | `CustomEvent<{}>` | Dispatched when the close button is clicked when `closeable`. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component message area. |
| `close`             | Content to render as the close button when `closeable`. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `prefix`            | Content to render before toast message area.     |

## CSS Custom Properties

| Property                                 | Description                                      |
|------------------------------------------|--------------------------------------------------|
| `--omni-theme-accent-active-color`       | Theme accent active color.                       |
| `--omni-theme-accent-color`              | Theme accent color.                              |
| `--omni-theme-accent-hover-color`        | Theme accent hover color.                        |
| `--omni-theme-background-active-color`   | Theme background active color.                   |
| `--omni-theme-background-color`          | Theme background color.                          |
| `--omni-theme-background-hover-color`    | Theme background hover color.                    |
| `--omni-theme-border-radius`             | Theme border radius.                             |
| `--omni-theme-border-width`              | Theme border width.                              |
| `--omni-theme-box-shadow`                | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`          | Theme inactive color.                            |
| `--omni-theme-disabled-background-color` | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`     | Theme disabled border color.                     |
| `--omni-theme-error-border-color`        | Theme error border color.                        |
| `--omni-theme-error-font-color`          | Theme disabled background color.                 |
| `--omni-theme-font-color`                | Theme font color.                                |
| `--omni-theme-font-family`               | Theme font family.                               |
| `--omni-theme-font-size`                 | Theme font size.                                 |
| `--omni-theme-font-weight`               | Theme font weight.                               |
| `--omni-theme-hint-font-color`           | Theme hint font color.                           |
| `--omni-theme-inactive-color`            | Theme inactive color.                            |
| `--omni-theme-primary-active-color`      | Theme primary active color.                      |
| `--omni-theme-primary-color`             | Theme primary color.                             |
| `--omni-theme-primary-hover-color`       | Theme primary hover color.                       |
| `--omni-toast-background`                | The default background applied when no `type` is set. |
| `--omni-toast-border-color`              | Border color. *                                  |
| `--omni-toast-border-radius`             | Border radius.                                   |
| `--omni-toast-border-width`              | Border width.                                    |
| `--omni-toast-box-shadow`                | Box shadow.                                      |
| `--omni-toast-close-padding`             | Padding applied to close button when `closeable`. |
| `--omni-toast-close-size`                | Symmetrical size applied to close button when `closeable`. |
| `--omni-toast-default-font-color`        | The default font color applied when no `type` is set. |
| `--omni-toast-detail-font-family`        | Font family for detail.                          |
| `--omni-toast-detail-font-size`          | Font size for detail.                            |
| `--omni-toast-detail-font-weight`        | Font weight for detail.                          |
| `--omni-toast-detail-line-height`        | Line height for detail.                          |
| `--omni-toast-error-background`          | The background applied when  `type` is set to `error`. |
| `--omni-toast-error-border-color`        | The border color applied when  `type` is set to `error`. |
| `--omni-toast-error-font-color`          | The font color applied when `type` is set to `error`. |
| `--omni-toast-error-icon-color`          | The icon color applied when  `type` is set to `error`. |
| `--omni-toast-header-font-family`        | Font family for header.                          |
| `--omni-toast-header-font-size`          | Font size for header.                            |
| `--omni-toast-header-font-weight`        | Font weight for header.                          |
| `--omni-toast-header-line-height`        | Line height for header.                          |
| `--omni-toast-horizontal-gap`            | Horizontal spacing between icon from `type` and content. |
| `--omni-toast-icon-size`                 | Symmetrical size of icon from `type`.            |
| `--omni-toast-info-background`           | The background applied when  `type` is set to `info`. |
| `--omni-toast-info-border-color`         | The border color applied when  `type` is set to `info`. |
| `--omni-toast-info-font-color`           | The font color applied when `type` is set to `info`. |
| `--omni-toast-info-icon-color`           | The icon color applied when  `type` is set to `info`. |
| `--omni-toast-max-width`                 | Max Width.                                       |
| `--omni-toast-min-width`                 | Min Width.                                       |
| `--omni-toast-padding`                   | Container padding.                               |
| `--omni-toast-success-background`        | The background applied when  `type` is set to `success`. |
| `--omni-toast-success-border-color`      | The border color applied when  `type` is set to `success`. |
| `--omni-toast-success-font-color`        | The font color applied when `type` is set to `success`. |
| `--omni-toast-success-icon-color`        | The icon color applied when  `type` is set to `success`. |
| `--omni-toast-vertical-gap`              | Vertical space between detail and header.        |
| `--omni-toast-warning-background`        | The background applied when  `type` is set to `warning`. |
| `--omni-toast-warning-border-color`      | The border color applied when  `type` is set to `warning`. |
| `--omni-toast-warning-font-color`        | The font color applied when `type` is set to `warning`. |
| `--omni-toast-warning-icon-color`        | The icon color applied when  `type` is set to `warning`. |
| `--omni-toast-width`                     | Width.                                           |
| `--omni-toast-z-index`                   | The z-index.                                     |


# omni-toast-stack

A toast container that animates in and stacks toast elements.

## Example

```html
<omni-toast-stack position="bottom" reverse>
     <omni-toast
       type="info"
       header="Toast Title"
       detail="Short detail Text"
       closable>
     </omni-toast>
</omni-toast-stack>
```

## Properties

| Property   | Attribute  | Modifiers | Type                                             | Default  | Description                                      |
|------------|------------|-----------|--------------------------------------------------|----------|--------------------------------------------------|
| `dir`      |            |           | `string`                                         |          |                                                  |
| `lang`     |            |           | `string`                                         |          |                                                  |
| `override` | `override` |           |                                                  |          | Used to set the base direction of text for display |
| `position` | `position` |           | `"left" \| "top" \| "right" \| "bottom" \| "top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | "bottom" | The position to stack toasts                     |
| `reverse`  | `reverse`  |           | `boolean \| undefined`                           |          | Reverse the order of toast with newest toasts showed on top of the stack. By default newest toasts are showed at the bottom of the stack. |
| `styles`   |            | readonly  | `CSSResult[]`                                    |          |                                                  |

## Methods

| Method      | Type                           | Description                                |
|-------------|--------------------------------|--------------------------------------------|
| `showToast` | `(init: ShowToastInit): Toast` | Push a toast message onto the toast stack. |

## Events

| Event                | Type                      | Description                                      |
|----------------------|---------------------------|--------------------------------------------------|
| `toast-remove`       | `CustomEvent<Toast>`      | Dispatched when the a toast is removed from the stack. |
| `toast-stack-remove` | `CustomEvent<ToastStack>` | Dispatched from a toast when it is removed from the stack. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Toast(s) to be displayed                         |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                 | Description                                      |
|------------------------------------------|--------------------------------------------------|
| `--omni-theme-accent-active-color`       | Theme accent active color.                       |
| `--omni-theme-accent-color`              | Theme accent color.                              |
| `--omni-theme-accent-hover-color`        | Theme accent hover color.                        |
| `--omni-theme-background-active-color`   | Theme background active color.                   |
| `--omni-theme-background-color`          | Theme background color.                          |
| `--omni-theme-background-hover-color`    | Theme background hover color.                    |
| `--omni-theme-border-radius`             | Theme border radius.                             |
| `--omni-theme-border-width`              | Theme border width.                              |
| `--omni-theme-box-shadow`                | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`          | Theme inactive color.                            |
| `--omni-theme-disabled-background-color` | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`     | Theme disabled border color.                     |
| `--omni-theme-error-border-color`        | Theme error border color.                        |
| `--omni-theme-error-font-color`          | Theme disabled background color.                 |
| `--omni-theme-font-color`                | Theme font color.                                |
| `--omni-theme-font-family`               | Theme font family.                               |
| `--omni-theme-font-size`                 | Theme font size.                                 |
| `--omni-theme-font-weight`               | Theme font weight.                               |
| `--omni-theme-hint-font-color`           | Theme hint font color.                           |
| `--omni-theme-inactive-color`            | Theme inactive color.                            |
| `--omni-theme-primary-active-color`      | Theme primary active color.                      |
| `--omni-theme-primary-color`             | Theme primary color.                             |
| `--omni-theme-primary-hover-color`       | Theme primary hover color.                       |
| `--omni-toast-stack-anchor-bottom`       | The position from the bottom toast `position` is set to `bottom`, `bottom-left`, or `bottom-right`. |
| `--omni-toast-stack-anchor-left`         | The position from the bottom toast `position` is set to `left`, `top-left`, or `bottom-left`. |
| `--omni-toast-stack-anchor-right`        | The position from the bottom toast `position` is set to `right`, `top-right`, or `bottom-right`. |
| `--omni-toast-stack-anchor-top`          | The position from the bottom toast `position` is set to `top`, `top-left`, or `top-right`. |
| `--omni-toast-stack-font-color`          | The font color applied to the stack.             |
| `--omni-toast-stack-gap`                 | The vertical gap between toast elements in the stack. |
| `--omni-toast-stack-z-index`             | The z-index of the stack.                        |
