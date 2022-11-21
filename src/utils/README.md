# code-editor

## Properties

| Property          | Attribute         | Modifiers | Type                                             | Default    |
|-------------------|-------------------|-----------|--------------------------------------------------|------------|
| `code`            | `code`            |           | `string \| Promise<string>`                      |            |
| `codeParent`      |                   |           | `HTMLDivElement`                                 |            |
| `disabled`        | `disabled`        |           | `boolean`                                        |            |
| `extensions`      | `extensions`      |           | `() => { extension: Extension; } \| readonly Extension[] \| Promise<Extension>` | "() => []" |
| `noTab`           | `no-tab`          |           | `boolean`                                        |            |
| `override`        |                   |           |                                                  |            |
| `readOnly`        | `read-only`       |           | `boolean`                                        |            |
| `slotElement`     |                   |           | `HTMLSlotElement`                                |            |
| `styles`          |                   | readonly  | `CSSResult[]`                                    |            |
| `transformSource` | `transformSource` |           | `(source: string) => string \| Promise<string>`  | "(s) => s" |

## Methods

| Method    | Type                                             |
|-----------|--------------------------------------------------|
| `refresh` | `(getCode?: (): string \| Promise<string>) => Promise<void>` |

## Events

| Event                      | Type                                       |
|----------------------------|--------------------------------------------|
| `codemirror-loaded`        | `CustomEvent<CodeMirrorEditorEvent>`       |
| `codemirror-source-change` | `CustomEvent<CodeMirrorSourceUpdateEvent>` |
| `codemirror-update`        | `CustomEvent<CodeMirrorUpdateEvent>`       |


# live-property-editor

## Properties

| Property             | Attribute           | Modifiers | Type                                     | Default                 | Description                                      |
|----------------------|---------------------|-----------|------------------------------------------|-------------------------|--------------------------------------------------|
| `cssValueReader`     | `cssValueReader`    |           | `(variable: CSSVariable) => CSSVariable` | "(c) => c"              |                                                  |
| `customElements`     |                     |           | `Package`                                |                         |                                                  |
| `customElementsPath` | `custom-elements`   |           | `string`                                 | "/custom-elements.json" |                                                  |
| `data`               | `data`              |           | `ComponentStoryFormat<any>`              |                         |                                                  |
| `dir`                |                     |           | `string`                                 |                         |                                                  |
| `disabled`           | `disabled`          |           | `boolean`                                |                         |                                                  |
| `element`            | `element`           |           | `string`                                 |                         |                                                  |
| `ignoreAttributes`   | `ignore-attributes` |           | `string`                                 |                         |                                                  |
| `lang`               |                     |           | `string`                                 |                         |                                                  |
| `override`           | `override`          |           |                                          |                         | Used to set the base direction of text for display |
| `slotCodeMirrors`    |                     |           | `NodeListOf<CodeEditor>`                 |                         |                                                  |
| `styles`             |                     | readonly  | `CSSResultGroup[]`                       |                         |                                                  |

## Methods

| Method       | Type       |
|--------------|------------|
| `resetSlots` | `(): void` |

## Events

| Event             | Type                               |
|-------------------|------------------------------------|
| `property-change` | `CustomEvent<PropertyChangeEvent>` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
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


# story-renderer

## Properties

| Property         | Attribute     | Type                 |
|------------------|---------------|----------------------|
| `codeEditor`     |               | `CodeEditor`         |
| `interactive`    | `interactive` | `boolean`            |
| `key`            | `key`         | `string`             |
| `override`       |               |                      |
| `path`           | `path`        | `string`             |
| `propertyEditor` |               | `LivePropertyEditor` |
| `tag`            | `tag`         | `string`             |

## Methods

| Method             | Type                        |
|--------------------|-----------------------------|
| `createRenderRoot` | `(): Element \| ShadowRoot` |
