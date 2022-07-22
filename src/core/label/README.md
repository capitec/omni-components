# omni-label

A simple label component that renders a styled text string.

```js 
import '@innofake/web-components/core/label'; 
```

## Example

```html
<omni-label  label="Hello World"  type="strong"></omni-label>
```

## Properties

| Property   | Attribute | Modifiers | Type                                             | Default   | Description                                      |
|------------|-----------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `label`    | `label`   |           | `String`                                         |           | The label string to display.                     |
| `override` |           |           |                                                  |           | The element style template.                      |
| `styles`   |           | readonly  | `CSSResult[]`                                    |           |                                                  |
| `type`     | `type`    |           | `"default"\|"title"\|"subtitle"\|"strong"\|String` | "default" | The type of label to display:- `default` Normal font weight.- `title` Larger font and weight.- `subtitle` Larger font and weight.- `strong` Largest font and weight. |

## CSS Custom Properties

| Property                                     | Description                 |
|----------------------------------------------|-----------------------------|
| `--innofake-omni-label-cursor`               | Label cursor.               |
| `--innofake-omni-label-default-font-size`    | Default label font size.    |
| `--innofake-omni-label-default-font-weight`  | Default label font weight.  |
| `--innofake-omni-label-font-color`           | Label font color.           |
| `--innofake-omni-label-font-family`          | Label font family.          |
| `--innofake-omni-label-font-size`            | Label font size.            |
| `--innofake-omni-label-font-weight`          | Label font weight.          |
| `--innofake-omni-label-strong-font-size`     | Strong label font size.     |
| `--innofake-omni-label-strong-font-weight`   | Strong label font weight.   |
| `--innofake-omni-label-subtitle-font-size`   | Subtitle label font size.   |
| `--innofake-omni-label-subtitle-font-weight` | Subtitle label font weight. |
| `--innofake-omni-label-title-font-size`      | Title label font size.      |
| `--innofake-omni-label-title-font-weight`    | Title label font weight.    |
