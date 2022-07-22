# omni-switch

A control that allows a user to switch a value on or off.

```js 
import '@innofake/web-components/inputs/switch'; 
```

## Example

```html
<omni-switch  label="My Switch Value"  data="{'id': 12345, 'name': 'Test'}"  hint="Required"  error="Field level error message"  checked></omni-switch>
```

## Properties

| Property   | Attribute  | Modifiers | Type          | Default | Description                                      |
|------------|------------|-----------|---------------|---------|--------------------------------------------------|
| `checked`  | `checked`  |           | `boolean`     | false   | Indicator if the component is checked or not.    |
| `data`     | `data`     |           | `Object`      |         | Data associated with the component.              |
| `disabled` | `disabled` |           | `boolean`     | false   | Indicator if the component is disabled.          |
| `error`    | `error`    |           | `string`      |         | An error message to guide users to correct a mistake. |
| `hint`     | `hint`     |           | `string`      |         | A hint message to assist the user.               |
| `label`    | `label`    |           | `string`      |         | The switch label text.                           |
| `override` |            |           |               |         | The element style template.                      |
| `styles`   |            | readonly  | `CSSResult[]` |         |                                                  |

## Methods

| Method  | Type       |
|---------|------------|
| `focus` | `(): void` |

## Events

| Event           | Type                                           | Description                                      |
|-----------------|------------------------------------------------|--------------------------------------------------|
| `value-change`  | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the switch checked state is changed. |
| `value-changed` | `CustomEvent<{ old: Boolean; new: Boolean; }>` | Dispatched when the switch checked state is changed. |

## CSS Custom Properties

| Property                                         | Description                      |
|--------------------------------------------------|----------------------------------|
| `--innofake-omni-switch-checked-hover-knob-box-shadow` | Knob checked hover box shadow.   |
| `--innofake-omni-switch-checked-knob-background-color` | Knob checked background color.   |
| `--innofake-omni-switch-checked-track-background-color` | Track checked background color.  |
| `--innofake-omni-switch-disabled-knob-background-color` | Knob disabled background color.  |
| `--innofake-omni-switch-disabled-knob-box-shadow` | Knob disabled hover box shadow.  |
| `--innofake-omni-switch-disabled-track-background-color` | Track disabled background color. |
| `--innofake-omni-switch-input-error-label-font-color` | Error text font color.           |
| `--innofake-omni-switch-input-error-label-font-family` | Error text font family.          |
| `--innofake-omni-switch-input-error-label-font-size` | Error text font size.            |
| `--innofake-omni-switch-input-error-label-font-weight` | Error text font weight.          |
| `--innofake-omni-switch-input-hint-label-font-color` | Hint text font color.            |
| `--innofake-omni-switch-input-hint-label-font-family` | Hint text font family.           |
| `--innofake-omni-switch-input-hint-label-font-size` | Hint text font size.             |
| `--innofake-omni-switch-input-hint-label-font-weight` | Hint text font weight.           |
| `--innofake-omni-switch-knob-background-color`   | Knob background color.           |
| `--innofake-omni-switch-knob-box-shadow`         | Knob box shadow.                 |
| `--innofake-omni-switch-knob-height`             | Knob height.                     |
| `--innofake-omni-switch-knob-hover-box-shadow`   | Knob hover box shadow.           |
| `--innofake-omni-switch-knob-width`              | Knob width.                      |
| `--innofake-omni-switch-label-font-color`        | Label font color.                |
| `--innofake-omni-switch-label-font-family`       | Label font family.               |
| `--innofake-omni-switch-label-font-size`         | Label font size.                 |
| `--innofake-omni-switch-label-font-weight`       | Label font weight.               |
| `--innofake-omni-switch-label-spacing`           | Label left margin spacing.       |
| `--innofake-omni-switch-track-background-color`  | Track background color.          |
| `--innofake-omni-switch-track-border-radius`     | Track border radius.             |
| `--innofake-omni-switch-track-height`            | Track height.                    |
| `--innofake-omni-switch-track-inset`             | Track inset margins.             |
| `--innofake-omni-switch-track-width`             | Track width.                     |
