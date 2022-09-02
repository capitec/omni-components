# Contributing to Omni Components

Welcome! We encourage contributions and here's a few important guidelines we would like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Issues](#issues)
* [Development](#development)
* [Pull Requests](#pull-requests)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/capitec/omni-components/blob/develop/CODE_OF_CONDUCT.md).

## Issues

Issues are intended for:

* [Bugs](#bugs)
* [Feature Requests](#feature-requests)

### Guidelines
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do not** use issues for any personal support. Use [Discussions](https://github.com/capitec/omni-components/discussions) or [StackOverflow](https://stackoverflow.com/) instead.
* **Do not** side-track or derail issues threads. Stick to the topic please.
* **Do not** post comments using just "+1", "++" or "👍". Use [Reactions](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) instead.

### Bugs

A bug is an error, flaw or fault associated with *any part* of the project.

### Guidelines
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** describe the bug concisely, **avoid** adding extraneous code, logs or screenshots.
* **Do** attach a minimal test or repro (e.g. [CodePen](https://codepen.io/), [jsFiddle](https://jsfiddle.net/)) to demonstrate the bug.

### Feature Requests

A feature request is an improvement or new capability associated with *any part* of the project.

### Guidelines
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** provide sufficient motivation / use case(s) for the feature. 
* **Do not** submit multiple unrelated requests within one request.

## Development

### Branches

* `develop` - Default branch for all Pull Requests.
* `main` - Stable branch for all periodic releases.

### Getting Started

#### Dependencies

* Git (v2+)
* Node.js (v16+)
* NPM (v7+)
* VS Code + recommended extensions (recommended, but not required).

#### Setup

1. [Fork](https://github.com/capitec/omni-components) the repository and create a branch from `develop`.
2. Clone the forked repo, checkout you branch, and run `npm ci` inside the repository root.
3. Start up the dev server with `npm run storybook` (or by launching debugging in VS Code).

### Storybook

We make extensive use of [Storybook](https://storybook.js.org/) for developing, testing as well as exploring published component documentation. This is achieved using [stories](https://storybook.js.org/docs/web-components/writing-stories/introduction) with [play functions](https://storybook.js.org/docs/web-components/writing-stories/play-function).

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

* `src` - Contains all components in a flat structure, each named afer a component, e.g. `button`. Contents:
  * `Button.stories.ts` - The stories for the component.
  * `Button.ts` - The component. *(NOTE: There might be multiple, depending on complexity and composition)*
  * `index.ts` - The directory-level index, containing one or more component exports.
  * `README.md` - The README for the component *(NOTE: Generated when Pull Request is merged)*.
* `themes` - Basic built-in themes, viewable within the Storybook application.

### Naming Conventions

* **Do** use *lower case* [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) for component folder names, e.g. `some-component`. 🍢
* **Do** use uppercase first letter [CamelCase](https://en.wikipedia.org/wiki/Camel_case) for component file names, e.g. `SomeComponent.ts`.
* **Do** use the name of the component, suffixed with `.stories` for component story file names, e.g. `SomeComponent.stories.ts`.
* **Do** match component name with its file name, e.g. `SomeComponent.ts` contains `export class SomeComponent { ... }`.
* **Do** prefix the custom element name with `omni-`.
* **Do not** use any verbs or prefixes within component property names, instead **do** use nouns, e.g. `mode`, `position`.
* **Do** name CSS custom properties as follows: 
  * Component: `--omni-<component>-<state>-<css-property>`, e.g. `--omni-button-primary-background-color`
  * Theme: `--omni-theme-<state>-<css-property>`, e.g. `--omni-theme-primary-color`
* **Do** follow standard [TypeScript](https://www.typescriptlang.org/docs/), [Lit](https://lit.dev/docs/) and [Storybook](https://storybook.js.org/docs/web-components/writing-stories/introduction) related conventions. 

> 💡 TIP: Refer to existing components and stories for examples. 

### Definition of Done
Here's a *non-exhaustive* list of requirements that are key to contributing to this project.

#### General
* **Do** use [TypeScript](https://www.typescriptlang.org/docs/), with common language practices.
* **Do** follow our [naming conventions](#naming-conventions).

#### Components
* **Do** base off [LitElement](https://lit.dev/).
* **Do** implement "mobile first" templates, leveraging [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) layout and styling principles. 📱
* **Do** utilize LitElement's [decorators](https://lit.dev/docs/components/decorators/), required for element and property names.
* **Do** ensure sufficient [JSDoc](https://jsdoc.app/) as well as general code comments are added.
* **Do** use and extend existing shared CSS component and theme custom properties. (See [`src/styles/ComponentStyles.ts`](https://github.com/capitec/omni-components/blob/develop/src/styles/ComponentStyles.ts))
* **Do** set suitable CSS custom property defaults, **avoid** hard-coding CSS property values directly within components, unless deemed required.
* **Do** adhere to and leverage existing DOM standards when making use of [`<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) element.
* **Do** implement suitable DOM [accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) features.
* **Do** allow components to be user customizable via [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) implementations.
* **Do** implement only *one* component class within a component file.

#### Stories
* **Do** use [Component Story Format (CSF) 3](https://storybook.js.org/blog/component-story-format-3-0/).
* **Do** implement a [play function](https://storybook.js.org/docs/web-components/writing-stories/play-function) per story to test story-specific component state and event behaviours.
  * **Do** set the `data-testid` within every story template.
  * **Do** ensure there are no [accessibility](https://storybook.js.org/docs/web-components/writing-tests/accessibility-testing) violations.

#### Themes
* **Do** maintain each built-in theme, by ensuring all `--omni-theme-*` CSS custom properties are implemented.
* **Do** test each theme thoroughly via the Storybook application.

> 💡 TIP: Refer to existing components, stories and themes for examples for any of the above.

## Pull Requests
### Requirements
* **Do** ensure the branch is up to date with the `develop` branch.
* **Do** ensure there's no conflicts with the `develop` branch.
* **Do** ensure that all automatic [checks](#checks) pass.

### Checks

* All story play function tests pass.
<!--- * All story play function tests has at least 80% code coverage of components. --->
