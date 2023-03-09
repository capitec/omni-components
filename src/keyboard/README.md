# omni-keyboard

An on-screen keyboard control component.

## Example

```html
<omni-keyboard></omni-keyboard>
```

## Properties

| Property     | Attribute     | Modifiers | Type                           | Default | Description                                      |
|--------------|---------------|-----------|--------------------------------|---------|--------------------------------------------------|
| `attachMode` | `attach-mode` |           | `"all" \| "attribute" \| "id"` | "all"   | The rule for the Keyboard to attach to inputs for showing on component focus.<br />* `all` - The Keyboard will show on focus for all input related components unless opted out with `data-omni-keyboard-hidden` on the component.<br />* `attribute` - The Keyboard will only show on focus for input related components with the `data-omni-keyboard-attach` attribute |
| `clearLabel` | `clear-label` |           | `string`                       | "Clear" | The text label to display on the clear button. The `clear` slot takes precedence over this label. |
| `closeLabel` | `close-label` |           | `string`                       | "Close" | The text label to display by the close button.   |
| `ctaLabel`   | `cta-label`   |           | `string`                       | "Enter" | The text label to display on the call to action button when `enterkeyhint` is not defined or `enterkeyhint="enter"`. The `cta-enter` slot takes precedence over this label. |
| `dir`        |               |           | `string`                       |         |                                                  |
| `lang`       |               |           | `string`                       |         |                                                  |
| `override`   | `override`    |           |                                |         | Used to set the base direction of text for display |
| `spaceLabel` | `space-label` |           | `string`                       | "Space" | The text label to display on the spacebar button. |
| `styles`     |               | readonly  | `CSSResultGroup[]`             |         |                                                  |

## Methods

| Method               | Type                                             |
|----------------------|--------------------------------------------------|
| `renderBackspace`    | `(): TemplateResult<1>`                          |
| `renderCallToAction` | `(extraClasses?: ClassInfo \| undefined): TemplateResult<1>` |
| `renderCaps`         | `(): TemplateResult<1> \| unique symbol`         |
| `renderClear`        | `(mode?: "return" \| "numeric"): TemplateResult<1>` |
| `renderClose`        | `(): TemplateResult<1>`                          |

## Events

| Event         | Type            |
|---------------|-----------------|
| `beforeinput` | `InputEvent`    |
| `change`      |                 |
| `input`       | `InputEvent`    |
| `keydown`     | `KeyboardEvent` |
| `keyup`       | `KeyboardEvent` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `backspace`         | Content to display on backspace button.          |
| `caps-off`          | Content to display on case change button when in a lowercase state. |
| `caps-on`           | Content to display on case change button when in a single uppercase state. |
| `caps-on-permanent` | Content to display on case change button when in a permanent uppercase state. |
| `clear`             | Content to display on clear button.              |
| `close`             | Content to display next to close label.          |
| `cta-done`          | Content to display on call to action button ('Enter') when target component has enterkeyhint="done". |
| `cta-enter`         | Content to display on call to action button ('Enter') when target component has enterkeyhint="enter" or enterkeyhint is not set. |
| `cta-go`            | Content to display on call to action button ('Enter') when target component has enterkeyhint="go". |
| `cta-next`          | Content to display on call to action button ('Enter') when target component has enterkeyhint="next". |
| `cta-previous`      | Content to display on call to action button ('Enter') when target component has enterkeyhint="previous". |
| `cta-search`        | Content to display on call to action button ('Enter') when target component has enterkeyhint="search". |
| `cta-send`          | Content to display on call to action button ('Enter') when target component has enterkeyhint="send". |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-keyboard-background-color`               | Background color for keyboard.                   |
| `--omni-keyboard-button-background-color`        | Background color for keyboard buttons.           |
| `--omni-keyboard-button-border`                  | Border for keyboard buttons.                     |
| `--omni-keyboard-button-border-radius`           | Border radius for keyboard buttons.              |
| `--omni-keyboard-button-font-color`              | Font color for text in keyboard buttons.         |
| `--omni-keyboard-button-font-family`             | Font family for text in keyboard buttons.        |
| `--omni-keyboard-button-font-size`               | Font size for text in keyboard buttons.          |
| `--omni-keyboard-button-font-weight`             | Font weight for text in keyboard buttons.        |
| `--omni-keyboard-button-height`                  | Height for keyboard buttons.                     |
| `--omni-keyboard-button-icon-max-height`         | Max height for slotted content in keyboard buttons. |
| `--omni-keyboard-button-icon-max-width`          | Max width for slotted content in keyboard buttons. |
| `--omni-keyboard-button-line-height`             | Line height for keyboard buttons.                |
| `--omni-keyboard-button-margin`                  | Margin for keyboard buttons.                     |
| `--omni-keyboard-button-mobile-height`           | Height for keyboard buttons in mobile viewports. |
| `--omni-keyboard-button-mobile-margin`           | Margin for keyboard buttons in mobile viewports. |
| `--omni-keyboard-button-mobile-small-border-radius` | Border radius for keyboard buttons in small mobile viewports. |
| `--omni-keyboard-button-mobile-small-font-size`  | Font size for text in keyboard buttons in small mobile viewports. |
| `--omni-keyboard-button-mobile-small-height`     | Height for keyboard buttons in small mobile viewports. |
| `--omni-keyboard-button-mobile-small-width`      | Width for keyboard buttons in small mobile viewports. |
| `--omni-keyboard-button-mobile-width`            | Width for keyboard buttons in mobile viewports.  |
| `--omni-keyboard-button-width`                   | Width for keyboard buttons.                      |
| `--omni-keyboard-close-button-color`             | Font colour for keyboard close button.           |
| `--omni-keyboard-close-button-font-size`         | Font size for keyboard close button.             |
| `--omni-keyboard-close-button-font-weight`       | Font weight for keyboard close button.           |
| `--omni-keyboard-close-icon-width`               | Width for keyboard close button icon.            |
| `--omni-keyboard-closer-padding-right`           | Right padding for keyboard close button area.    |
| `--omni-keyboard-closer-width`                   | Width for keyboard close button area.            |
| `--omni-keyboard-cta-button-background-color`    | Background colour for keyboard call to action button. |
| `--omni-keyboard-cta-button-border-radius`       | Border radius for keyboard call to action button. |
| `--omni-keyboard-cta-button-color`               | Font or icon colour for keyboard call to action button. |
| `--omni-keyboard-cta-button-font-size`           | Font size for keyboard call to action button.    |
| `--omni-keyboard-cta-button-font-weight`         | Font weight for keyboard call to action button.  |
| `--omni-keyboard-cta-button-margin`              | Margin for keyboard call to action button.       |
| `--omni-keyboard-cta-button-max-width`           | Max width for keyboard call to action button.    |
| `--omni-keyboard-cta-button-width`               | Width for keyboard call to action button.        |
| `--omni-keyboard-icons-color`                    | Colour for keyboard icons.                       |
| `--omni-keyboard-key-row-margin`                 | Margin for keyboard rows.                        |
| `--omni-keyboard-key-row-width`                  | Width for keyboard rows.                         |
| `--omni-keyboard-mobile-close-icon-width`        | Width for keyboard close button icon in mobile viewports. |
| `--omni-keyboard-mobile-cta-button-height`       | Height for keyboard call to action button in mobile viewports. |
| `--omni-keyboard-mobile-cta-button-margin`       | Margin for keyboard call to action button in mobile viewports. |
| `--omni-keyboard-mobile-cta-button-max-width`    | Max width for keyboard call to action button in mobile viewports. |
| `--omni-keyboard-mobile-key-row-margin`          | Margin for keyboard rows in mobile viewports.    |
| `--omni-keyboard-mobile-key-row-width`           | Width for keyboard rows in mobile viewports.     |
| `--omni-keyboard-mobile-small-cta-button-height` | Height for keyboard call to action button in small mobile viewports. |
| `--omni-keyboard-mobile-small-cta-button-max-width` | Max width for keyboard call to action button in small mobile viewports. |
| `--omni-keyboard-mobile-small-key-row-margin`    | Margin for keyboard rows in small mobile viewports. |
| `--omni-keyboard-mobile-special-key-row-margin`  | Margin for special keyboard rows in mobile viewports. |
| `--omni-keyboard-row-padding-bottom`             | Bottom padding for last keyboard row.            |
| `--omni-keyboard-row-padding-top`                | Top padding for first keyboard row.              |
| `--omni-keyboard-shadow-background-color`        | Background color for keyboard shadow.            |
| `--omni-keyboard-shadow-border-radius`           | Border radius for keyboard shadow.               |
| `--omni-keyboard-shadow-padding-bottom`          | Bottom padding for keyboard shadow.              |
| `--omni-keyboard-top-bar-background-color`       | Background color for keyboard top bar.           |
| `--omni-keyboard-top-bar-border-bottom-color`    | Border bottom color for keyboard top bar.        |
| `--omni-keyboard-top-bar-border-radius`          | Border radius for keyboard top bar.              |
| `--omni-keyboard-top-bar-mobile-border-radius`   | Border radius for keyboard top bar in mobile viewports. |
| `--omni-keyboard-top-bar-mobile-height`          | Height for keyboard top bar in mobile viewports. |
| `--omni-keyboard-top-bar-padding-left`           | Left padding for keyboard top bar.               |
| `--omni-keyboard-top-bar-padding-right`          | Right padding for keyboard top bar.              |
| `--omni-keyboard-top-bar-width`                  | Width for keyboard top bar.                      |
| `--omni-numeric-keyboard-button-mobile-small-width` | Width for numeric keyboard buttons in small mobile viewports. |
| `--omni-numeric-keyboard-button-mobile-width`    | Width for numeric keyboard buttons in mobile viewports. |
| `--omni-return-keyboard-button-mobile-small-width` | Width for return keyboard buttons in small mobile viewports. |
| `--omni-return-keyboard-button-mobile-width`     | Width for return keyboard buttons in mobile viewports. |
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


# omni-keyboard-button

An internal keyboard button control used in the keyboard component.

## Example

```html
<omni-keyboard-button
 label="a"
 mode="alpha"
 character="Return"
 case="upper"
 disabled>
</omni-keyboard-button>"
```

## Properties

| Property    | Attribute   | Modifiers | Type                             | Default | Description                                      |
|-------------|-------------|-----------|----------------------------------|---------|--------------------------------------------------|
| `case`      | `case`      |           | `"lower" \| "upper" \| "custom"` | "lower" | The case of the button:<br />- `upper` Uppercase input only.<br />- `lower` Lowercase input only. |
| `character` | `character` |           | `string`                         | ""      | The character for the button.                    |
| `dir`       |             |           | `string`                         |         |                                                  |
| `disabled`  | `disabled`  |           | `boolean \| undefined`           |         | Indicator if the button is disabled.             |
| `label`     | `label`     |           | `string`                         | ""      | Text label.                                      |
| `lang`      |             |           | `string`                         |         |                                                  |
| `mode`      | `mode`      |           | `KeyboardButtonMode`             | "none"  | The mode for the button:<br />- `alpha` Alphabetical mode.<br />- `return` Return (Enter) mode.<br />- `numeric` Numerical mode.<br />- `action` Arbitrary actions mode.<br />- `space` Spacebar mode. |
| `override`  | `override`  |           |                                  |         | Used to set the base direction of text for display |
| `styles`    |             | readonly  | `CSSResultGroup[]`               |         |                                                  |

## Events

| Event            | Type                              | Description                                     |
|------------------|-----------------------------------|-------------------------------------------------|
| `keyboard-click` | `CustomEvent<{ value: string; }>` | Dispatched when the keyboard button is clicked. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
|                     | Content to render inside button                  |
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
