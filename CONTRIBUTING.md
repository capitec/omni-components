# Contributing to Omni Components

Welcome! We encourage any contribution to this project. As a contributor, here's important guidelines we would like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Submitting Issues](#submitting-issues)
* [Development](#development)
* [Standards & Practices](#standards--practices)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/innofake/omni-components/blob/develop/CODE_OF_CONDUCT.md).

## Submitting Issues

Issues are intended for:

* [Reporting Bugs](#reporting-bugs)
* [Logging Feature Requests](#logging-feature-requests)

Basic Guidelines:
* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do not** use issues for any personal support. Use [Discussions](https://github.com/innofake/omni-components/discussions) or [StackOverflow](https://stackoverflow.com/) instead.
* **Do not** side-track or derail issues threads. Stick to the topic please.
* **Do not** post comments using just "+1", "++" or "👍". Use reactions instead.

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

* `main` - Used for stable releases, which we do once a month.
* `develop` - Default branch of the repo for all Pull Requests.

### Getting Started

#### Dependencies

* Git (v2+)
* Node.js (v16+)
* NPM (v7+)
* VS Code + Recommended Extensions (recommended, but not required).

#### Setup

1. [Fork](https://github.com/innofake/omni-components) the repository and create a branch from `develop`.
2. Clone the forked repo and run `npm ci` inside the repository root.
3. Start up the dev server with `npm run storybook` (or by launching debugging in VS Code).

### Storybook

This project makes extensive use of [Storybook](https://storybook.js.org/) for the purpose of developing, testing as well as exploring published component documentation. This is done using [stories](https://storybook.js.org/docs/web-components/writing-stories/introduction) with [play functions](https://storybook.js.org/docs/web-components/writing-stories/play-function).

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

* `src` - Contains all components, organized into a flat list of directories for each component, e.g. `button`. Each directory contains:
  * `Button.stories.ts` - The stories for the component.
  * `Button.ts` - The component. *(NOTE: There might be more than one, depending on complexity and composition)*
  * `index.ts` - The directory-level index, containing one or more component exports.
  * `README.md` - The generated README for the component (Generated when Pull Request is merged).
* `themes` - Basic built-in themes, viewable within the Storybook application.

### Definition of Done

#### Components
* **Do** implement using TypeScript, following common language associated best practices.
* **Do** base off [Lit](https://lit.dev/).
* **Do** follow our naming conventions and best practices below.

> 💡 TIP: Refer to existing components for examples. 

#### Stories
* **Do** implement using TypeScript, following common language associated best practices.
* **Do** implement using [Component Story Format (CSF) 3](https://storybook.js.org/blog/component-story-format-3-0/).
* **Do** implement one or more [play functions](https://storybook.js.org/docs/web-components/writing-stories/play-function) per story to test component state, behavior and events.

> 💡 TIP: Refer to existing component stories for examples. 

#### Themes
* **Do** add or extend the built-in themes inline with .

### Naming Conventions

* **Do** use lower case [kebab case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) for component folder names, e.g. `some-component`.
* **Do** use using [pascal case](https://en.wikipedia.org/wiki/Camel_case) for component file names, e.g. `MyComponent.ts`.
* **Do** use using [pascal case](https://en.wikipedia.org/wiki/Camel_case) suffixed with `stories` for component story file names, e.g. `MyComponent.stories.ts`.
* **Do** ensure component class name match that of the file name, e.g. `SomeComponent.ts` contains `export class SomeComponent { ... }`.
* **Do not** use any verbs or prefixes within component property names, instead **do** use nouns, e.g. `mode`, `position`.
* **Do** follow common [TypeScript](https://www.typescriptlang.org/docs/) and [Storybook](https://storybook.js.org/docs/web-components/writing-stories/introduction) related conventions. 

### Best Practices

* **Do** implement only one component class within a component file.

### Submit Pull Requests

XXXXX
