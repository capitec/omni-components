# omni-code

A control to syntax highlight and display source code.

```js 
import '@innofake/omni-components/code'; 
```

## Example

```html
<omni-code language="html">
 <div>
   <h1>Hello World</h1>
 </div>
</omni-menu>
```

## Properties

| Property   | Attribute  | Modifiers | Type          | Default | Description                                      |
|------------|------------|-----------|---------------|---------|--------------------------------------------------|
| `content`  | `content`  |           | `String`      |         | Raw text to parse as content. If this property is specified, it will take precedence over slotted content. This should also be used if you are using dynamic content |
| `header`   | `header`   |           | `String`      |         | Renders a small header above the block itself.   |
| `language` | `language` |           | `string`      | "html"  |                                                  |
| `override` |            |           |               |         | The element style template.                      |
| `styles`   |            | readonly  | `CSSResult[]` |         |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## CSS Custom Properties

| Property                                       | Description                          |
|------------------------------------------------|--------------------------------------|
| `--omni-code-header-background`                | Header background.                   |
| `--omni-code-header-border`                    | Header border.                       |
| `--omni-code-header-border-radius`             | Header border radius.                |
| `--omni-code-header-font-weight`               | Header font weight.                  |
| `--omni-code-header-padding`                   | Header padding.                      |
| `--omni-code-scrollbar-thumb-background`       | Scrollbar thumb background.          |
| `--omni-code-scrollbar-thumb-border-radius`    | Scrollbar thumb border radius.       |
| `--omni-code-scrollbar-thumb-hover-background` | Scrollbar thumb background on hover. |
| `--omni-code-scrollbar-track-border-width`     | Scrollbar track border width.        |
| `--omni-code-scrollbar-track-box-shadow`       | Scrollbar track box shadow.          |
| `--omni-code-scrollbar-width`                  | Scrollbar Width.                     |
