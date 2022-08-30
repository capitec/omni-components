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

This project makes extensive use of [Storybook](https://storybook.js.org/) for the purpose of developing, testing as well as exploring published component documentation.

### Directory Structure

When working with our components, please note the following key parts of the directory structure:

```
├── src
│   ├── button
│   │   ├── Button.stories.ts
│   │   ├── Button.ts
│   │   ├── index.ts
│   │   ├── README.md
│   ├── ...
├── stories
├── themes
├── ...
```

* `src` - Contains all UI components, organized into a flat list of folders for each component, e.g. `button`:
  * `Button.stories.ts` - The [Story](https://storybook.js.org/docs/web-components/get-started/whats-a-story) file for the component.
  * `Button.ts` - The component. *(NOTE: There might be more than one related component, depending on complexity and composition)*
  * `index.ts` - The directory-level index, containing one or more component exports.
* `stories` - Storybook application related helpers and components.
* `themes` - Built-in basic themes, viewable within the Storybook application.
### Naming Conventions

1. Folder names MUST be created using all lower case Kebab Case, e.g. `my-component`.
2. File names for classes MUST be created using Pascal Case, e.g. `MyComponent`.
3. Module names MUST match that of the file name, e.g. `MyComponent.ts` contains `export class MyComponent { ... }`.
4. Properties MUST be created using Camel Case, e.g. `@property({...}) innerPosition: string;`.
4. Properties MUST NOT contain any verbs, e.g. `@property({...}) label: string;`.

Best Practices (see OCWP)
 - including commits, merging, etc.
Definition of Done (see OCWP)

### Comments



### Submit Pull Requests

XXXXX
