# code-editor

## Properties

| Property          | Attribute         | Modifiers | Type                                             | Default    |
|-------------------|-------------------|-----------|--------------------------------------------------|------------|
| `code`            | `code`            |           | `string \| Promise<string> \| undefined`         |            |
| `codeParent`      |                   |           | `HTMLDivElement \| undefined`                    |            |
| `disabled`        | `disabled`        |           | `boolean`                                        |            |
| `extensions`      | `extensions`      |           | `() => { extension: Extension; } \| readonly Extension[] \| Promise<Extension>` | "() => []" |
| `noTab`           | `no-tab`          |           | `boolean`                                        |            |
| `override`        |                   |           |                                                  |            |
| `readOnly`        | `read-only`       |           | `boolean`                                        |            |
| `slotElement`     |                   |           | `HTMLSlotElement \| undefined`                   |            |
| `styles`          |                   | readonly  | `CSSResult[]`                                    |            |
| `transformSource` | `transformSource` |           | `(source: string) => string \| Promise<string>`  | "(s) => s" |

## Methods

| Method             | Type                                             |
|--------------------|--------------------------------------------------|
| `refresh`          | `(getCode?: (): string \| Promise<string>) => Promise<void>` |
| `updateExtensions` | `(): Promise<void>`                              |

## Events

| Event                      | Type                                       |
|----------------------------|--------------------------------------------|
| `codemirror-loaded`        | `CustomEvent<CodeMirrorEditorEvent>`       |
| `codemirror-source-change` | `CustomEvent<CodeMirrorSourceUpdateEvent>` |
| `codemirror-update`        | `CustomEvent<CodeMirrorUpdateEvent>`       |


# live-property-editor

## Properties

| Property             | Attribute           | Modifiers | Type                                     | Default                  | Description                                      |
|----------------------|---------------------|-----------|------------------------------------------|--------------------------|--------------------------------------------------|
| `customElements`     |                     |           | `Package \| undefined`                   |                          |                                                  |
| `customElementsPath` | `custom-elements`   |           | `string`                                 | "./custom-elements.json" |                                                  |
| `data`               | `data`              |           | `ComponentStoryFormat<any> \| undefined` |                          |                                                  |
| `dir`                |                     |           | `string`                                 |                          |                                                  |
| `disabled`           | `disabled`          |           | `boolean`                                |                          |                                                  |
| `element`            | `element`           |           | `string \| undefined`                    |                          |                                                  |
| `ignoreAttributes`   | `ignore-attributes` |           | `string \| undefined`                    |                          |                                                  |
| `lang`               |                     |           | `string`                                 |                          |                                                  |
| `override`           | `override`          |           |                                          |                          | Used to set the base direction of text for display |
| `slotCodeEditors`    |                     |           | `NodeListOf<CodeEditor> \| undefined`    |                          |                                                  |
| `styles`             |                     | readonly  | `CSSResultGroup[]`                       |                          |                                                  |

## Methods

| Method       | Type       |
|--------------|------------|
| `resetSlots` | `(): void` |

## Events

| Event                       | Type                               |
|-----------------------------|------------------------------------|
| `component-render-complete` |                                    |
| `property-change`           | `CustomEvent<PropertyChangeEvent>` |

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

| Property               | Attribute     | Modifiers | Type                                             | Default                                          |
|------------------------|---------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `codeEditor`           |               |           | `CodeEditor \| undefined`                        |                                                  |
| `interactive`          | `interactive` |           | `boolean \| undefined`                           |                                                  |
| `key`                  | `key`         |           | `string \| undefined`                            |                                                  |
| `noInteractiveCodePen` |               | readonly  | `FrameworkOption[]`                              | ["React"]                                        |
| `override`             |               |           |                                                  |                                                  |
| `path`                 | `path`        |           | `string \| undefined`                            |                                                  |
| `propertyEditor`       |               |           | `LivePropertyEditor \| undefined`                |                                                  |
| `secondaryCodeEditor`  |               |           | `CodeEditor \| undefined`                        |                                                  |
| `sourceFallbacks`      |               | readonly  | `[{ fallbackFramework: FrameworkOption; frameworks: FrameworkOption[]; allowRenderFromResult?: boolean \| undefined; }]` | [{"fallbackFramework":"HTML","frameworks":["HTML","Lit","Vue"],"allowRenderFromResult":true}] |
| `tag`                  | `tag`         |           | `string \| undefined`                            |                                                  |

## Methods

| Method                               | Type                                             |
|--------------------------------------|--------------------------------------------------|
| `createRenderRoot`                   | `(): Element \| ShadowRoot`                      |
| `handleCustomThemeCSSVariableSearch` | `(e: Event): void`                               |
| `renderCssVariable`                  | `(variable: CSSVariable): TemplateResult<1> \| unique symbol` |

## Events

| Event                               |
|-------------------------------------|
| `story-renderer-interactive-update` |
