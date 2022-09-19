# omni-icon

Component that displays an icon

```js 
import '@capitec/omni-components/icon'; 
```

## Examples

```html
<omni-icon  size="default|extra-small|small|medium|large">	   <svg version="1.1" id="diagram" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="375px" height="150px"><path d="M45,11.5H33.333c0.735-1.159,1.167-2.528,1.167-4C34.5,3.364,31.136,0,27,0s-7.5,3.364-7.5,7.5c0,1.472,0.432,2.841,1.167,4H9l-9,32h54L45,11.5z M22.5,7.5C22.5,5.019,24.519,3,27,3s4.5,2.019,4.5,4.5c0,1.752-1.017,3.257-2.481,4h-4.037 C23.517,10.757,22.5,9.252,22.5,7.5z" id="control"/></svg></omni-icon>
```

```html
<omni-icon  size="default|extra-small|small|medium|large"  icon="＠material/person"></omni-icon>
```

## Properties

| Property   | Attribute | Modifiers | Type                                             | Default   | Description                                      |
|------------|-----------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `icon`     | `icon`    |           | `string`                                         |           | The name of the icon to display. Takes preference over the slotted icon. |
| `override` |           |           |                                                  |           | The element style template.                      |
| `size`     | `size`    |           | `"default" \| "extra-small" \| "small" \| "medium" \| "large"` | "default" | The size to display the icon at                  |
| `styles`   |           | readonly  | `CSSResult[]`                                    |           |                                                  |

## Slots

| Name | Description              |
|------|--------------------------|
|      | The icon to be displayed |

## CSS Custom Properties

| Property                       | Description            |
|--------------------------------|------------------------|
| `--omni-icon-background-color` | Icon background color. |
| `--omni-icon-fill`             | Icon fill color.       |
| `--omni-icon-size-default`     | Icon default size.     |
| `--omni-icon-size-extra-small` | Icon extra small size. |
| `--omni-icon-size-large`       | Icon large size.       |
| `--omni-icon-size-medium`      | Icon medium size.      |
| `--omni-icon-size-small`       | Icon small size.       |
