# omni-alert

Component that displays an alert.

## Example

```html
<omni-alert>
</omni-alert>
```

## Properties

| Property           | Attribute           | Modifiers | Type                                             | Default | Description                                      |
|--------------------|---------------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `actionAlign`      | `action-align`      |           | `"left" \| "center" \| "right" \| "stretch" \| undefined` |         | Action button(s) horizontal alignment:<br />  - `left` Align action button(s) to the left.<br />  - `center` Align action button(s) to the center.<br />  - `right` Align action button(s) to the right. (Default)<br />  - `stretch` Align action button(s) stretched to fill the horizontal space. |
| `description`      | `description`       |           | `string \| undefined`                            |         | The alert detail message.                        |
| `descriptionAlign` | `description-align` |           | `"left" \| "center" \| "right" \| undefined`     |         | Description content horizontal alignment:<br />  - `left` Align description content to the left.<br />  - `center` Align description content to the center. (Default)<br />  - `right` Align description content to the right. |
| `dir`              |                     |           | `string`                                         |         |                                                  |
| `enableSecondary`  | `enable-secondary`  |           | `boolean \| undefined`                           |         | If true, will provide a secondary action button. |
| `headerAlign`      | `header-align`      |           | `"left" \| "center" \| "right" \| undefined`     |         | Header content horizontal alignment:<br />  - `left` Align header to the left.<br />  - `center` Align header to the center. (Default)<br />  - `right` Align header to the right. |
| `lang`             |                     |           | `string`                                         |         |                                                  |
| `message`          | `message`           |           | `string \| undefined`                            |         | The alert header message.                        |
| `override`         | `override`          |           |                                                  |         | The element style template.                      |
| `primaryAction`    | `primary-action`    |           | `string \| undefined`                            |         | The primary action button label (Defaults to 'Ok'). |
| `secondaryAction`  | `secondary-action`  |           | `string \| undefined`                            |         | The secondary action button label (Defaults to 'Cancel'). |
| `status`           | `status`            |           | `"success" \| "warning" \| "error" \| "info" \| "none"` | "none"  | The alert status (Defaults to 'none').           |
| `styles`           |                     | readonly  | `CSSResultGroup[]`                               |         |                                                  |

## Methods

| Method      | Type                                             | Description                                      |
|-------------|--------------------------------------------------|--------------------------------------------------|
| `hide`      | `(): void`                                       | Hide the `omni-alert` and remove the component from the DOM |
| `show`      | `(): Alert`                                      | Show the `omni-alert`.                           |
| `showAsync` | `(): Promise<"auto" \| "primary" \| "secondary">` | Show the `omni-alert` asynchronously, waits for it to close and returns the reason for close. |

## Events

| Event                | Type                                   | Description                                  |
|----------------------|----------------------------------------|----------------------------------------------|
| `alert-action-click` | `CustomEvent<{ secondary: boolean; }>` |                                              |
| `alert-close`        |                                        |                                              |
| `close-click`        |                                        | Dispatched when the close button is clicked. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside the component description body. |
| `header`            | Content to render inside the component message area. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `primary`           | Content to render as the primary action button.  |
| `secondary`         | Content to render as the secondary action button. |
| `status-indicator`  | Content to render as the status indicator instead of default status icons. |

## CSS Shadow Parts

| Part      | Description                                      |
|-----------|--------------------------------------------------|
| `actions` | Internal `HTMLDivElement` instance for container of action button(s). |
| `content` | Internal `HTMLDivElement` instance for container of header and description content. |
| `header`  | Internal `HTMLDivElement` instance for header.   |
| `modal`   | Internal `omni-modal` element instance.          |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-alert-action-button-internal-padding-bottom` | Alert action button(s) internal bottom padding.  |
| `--omni-alert-action-button-internal-padding-left` | Alert action button(s) internal left padding.    |
| `--omni-alert-action-button-internal-padding-right` | Alert action button(s) internal right padding.   |
| `--omni-alert-action-button-internal-padding-top` | Alert action button(s) internal top padding.     |
| `--omni-alert-action-button-padding-bottom`      | Alert action button(s) bottom padding.           |
| `--omni-alert-action-button-padding-left`        | Alert action button(s) left padding.             |
| `--omni-alert-action-button-padding-right`       | Alert action button(s) right padding.            |
| `--omni-alert-action-button-padding-top`         | Alert action button(s) top padding.              |
| `--omni-alert-animation-duration`                | Alert fade in and out animation duration.        |
| `--omni-alert-border`                            | Alert border.                                    |
| `--omni-alert-border-radius`                     | Alert border radius.                             |
| `--omni-alert-box-shadow`                        | Alert box shadow.                                |
| `--omni-alert-description-font-color`            | Alert description font color.                    |
| `--omni-alert-description-font-family`           | Alert description font family.                   |
| `--omni-alert-description-font-size`             | Alert description font size.                     |
| `--omni-alert-description-font-weight`           | Alert description font weight.                   |
| `--omni-alert-description-line-height`           | Alert description line height.                   |
| `--omni-alert-description-padding-bottom`        | Alert description bottom padding.                |
| `--omni-alert-description-padding-left`          | Alert description left padding.                  |
| `--omni-alert-description-padding-right`         | Alert description right padding.                 |
| `--omni-alert-description-padding-top`           | Alert description top padding.                   |
| `--omni-alert-header-background`                 | Alert header background.                         |
| `--omni-alert-header-font-color`                 | Alert header font color.                         |
| `--omni-alert-header-font-family`                | Alert header font family.                        |
| `--omni-alert-header-font-size`                  | Alert header font size.                          |
| `--omni-alert-header-font-weight`                | Alert header font weight.                        |
| `--omni-alert-header-line-height`                | Alert header line height.                        |
| `--omni-alert-header-padding-bottom`             | Alert header bottom padding.                     |
| `--omni-alert-header-padding-left`               | Alert header left padding.                       |
| `--omni-alert-header-padding-right`              | Alert header right padding.                      |
| `--omni-alert-header-padding-top`                | Alert header top padding.                        |
| `--omni-alert-max-width`                         | Maximum width for alert.                         |
| `--omni-alert-min-width`                         | Minimum width for alert.                         |
| `--omni-alert-padding-bottom`                    | Alert content bottom padding.                    |
| `--omni-alert-padding-left`                      | Alert content left padding.                      |
| `--omni-alert-padding-right`                     | Alert content right padding.                     |
| `--omni-alert-padding-top`                       | Alert content top padding.                       |
| `--omni-header-horizontal-gap`                   | Alert header horizontal space between status indicator and header content. |
| `--omni-header-status-size`                      | Alert header status indicator symmetrical size.  |
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
