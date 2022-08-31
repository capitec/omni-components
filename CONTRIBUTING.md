# Contributing to Omni Components

Welcome! We encourage any contribution to this project. As a contributor, here's important guidelines we would like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Submitting Issues](#submitting-issues)
* [Development](#development)
* [Submitting Pull Requests](#submitting-pull-requests)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/capitec/omni-components/blob/develop/CODE_OF_CONDUCT.md).

## Submitting Issues

Issues are intended for:

* [Reporting Bugs](#reporting-bugs)
* [Logging Feature Requests](#logging-feature-requests)

Basic Guidelines:
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do not** use issues for any personal support. Use [Discussions](https://github.com/capitec/omni-components/discussions) or [StackOverflow](https://stackoverflow.com/) instead.
* **Do not** side-track or derail issues threads. Stick to the topic please.
* **Do not** post comments using just "+1", "++" or "👍". Use [Reactions](https://docs.github.com/en/rest/reactions) instead.

### Reporting Bugs

A bug is an error, flaw or fault associated with any part of the project.

Basic Guidelines:
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** describe the bug concisely. Avoid adding extraneous code, logs or screenshots.
* **Do** add a minimal test or repro (e.g. [CodePen](https://codepen.io/), [jsFiddle](https://jsfiddle.net/)) to demonstrate the bug.

### Logging Feature Requests

A feature request is an improvement or new capability associated with any part of the project.

Basic Guidelines:
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** provide sufficient motivation / use case(s) for the feature.
* **Do not** submit multiple requests within one request.

## Development

### Branches

* `develop` - Default branch of the repo for all Pull Requests.
* `main` - Used for stable releases, which we do once a month.

### Getting Started

#### Dependencies

* Git (v2+)
* Node.js (v16+)
* NPM (v7+)
* VS Code + Recommended Extensions (recommended, but not required).

#### Setup

1. [Fork](https://github.com/capitec/omni-components) the repository and create a branch from `develop`.
2. Clone the forked repo and run `npm ci` inside the repository root.
3. Start up the dev server with `npm run storybook` (or by launching debugging in VS Code).

### Storybook

We make extensive use of [Storybook](https://storybook.js.org/) for the purpose of developing, testing as well as exploring published component documentation. This is achieved using [stories](https://storybook.js.org/docs/web-components/writing-stories/introduction) with [play functions](https://storybook.js.org/docs/web-components/writing-stories/play-function).

### Directory Structure

When adding or editing components, please note the following key directories:

```
├── src
│   ├── button
│   │   ├── Button.stories.ts
│   │   ├── Button.ts
│   │   ├── index.ts
│   │   ├── README.md
│   ├── ...
├── themes
├── ...
```

* `src` - Contains all components, organized into a flat list of directories named afer a component, e.g. `button`. Each directory contains:
  * `Button.stories.ts` - The stories for the component.
  * `Button.ts` - The component. *(NOTE: There might be more than one, depending on complexity and composition)*
  * `index.ts` - The directory-level index, containing one or more component exports.
  * `README.md` - The README for the component *(NOTE: Generated when Pull Request is merged)*.
* `themes` - Basic built-in themes, viewable within the Storybook application.

### Naming Conventions

* **Do** use lower case [kebab case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) for component folder names, e.g. `some-component`.
* **Do** use using [pascal case](https://en.wikipedia.org/wiki/Camel_case) for component file names, e.g. `MyComponent.ts`.
* **Do** use the name of the component, suffixed with `stories` for component story file names, e.g. `MyComponent.stories.ts`.
* **Do** ensure component class name matches its file name, e.g. `SomeComponent.ts` contains `export class SomeComponent { ... }`.
* **Do not** use any verbs or prefixes within component property names, instead **do** use nouns, e.g. `mode`, `position`.
* **Do** name CSS custom properties as follows:
  * Component: `--omni-<component>-<state>-<css-property>`, e.g. `--omni-button-primary-background-color`
  * Theme: `--omni-theme-<state>-<css-property>`, e.g. `--omni-theme-primary-color`
* **Do** follow standard [TypeScript](https://www.typescriptlang.org/docs/), [Lit](https://lit.dev/docs/) and [Storybook](https://storybook.js.org/docs/web-components/writing-stories/introduction) related conventions. 

> 💡 TIP: Refer to existing components and stories for examples. 

### Definition of Done
#### General
* **Do** use [TypeScript](https://www.typescriptlang.org/docs/), including common language practices.
* **Do** follow our [naming conventions](#naming-conventions).

#### Components
* **Do** base off [LitElement](https://lit.dev/).
* **Do** utilize LitElement's [decorators](https://lit.dev/docs/components/decorators/), required for element and property names.
* **Do** ensure sufficient [JSDoc](https://jsdoc.app/) as well as general code comments are added.
* **Do** use and extend existing shared (see [`src/styles/ComponentStyles.ts`](https://github.com/capitec/omni-components/blob/develop/src/styles/ComponentStyles.ts)) CSS custom property and theme variables.
* **Do** set suitable CSS custom property defaults, **avoid** hard-coding CSS property values directly within components, unless deemed required.
* **Do** adhere to and leverage existing DOM standards around attributes and events.
* **Do** implement only one component class within a component file.

#### Stories
* **Do** use [Component Story Format (CSF) 3](https://storybook.js.org/blog/component-story-format-3-0/).
* **Do** implement one or more [play functions](https://storybook.js.org/docs/web-components/writing-stories/play-function) per story to test component state, behavior and events.
  * **Do** set the `data-testid` within every story template.
  * **Do** ensure there are no [accessibility](https://storybook.js.org/docs/web-components/writing-tests/accessibility-testing) violations.

#### Themes
* **Do** maintain each built-in theme, by ensuring all `--omni-theme-*` CSS custom properties are implemented across.
* **Do** test each theme thoroughly via the Storybook application.

> 💡 TIP: Refer to existing components, stories and themes for examples for any of the above.

## Submitting Pull Requests
### Checks

* All story play function tests pass.
* All story play function tests has at least 80% code coverage of components.
