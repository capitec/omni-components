# Contributing to Omni Components

Welcome! We encourage contributions and here's a few important guidelines we would like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Issues](#issues)
* [Vulnerabilities](#vulnerabilities)
* [Development](#development)
* [Testing](#testing)
* [Pull Requests](#pull-requests)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/capitec/omni-components/blob/develop/CODE_OF_CONDUCT.md).

## Issues

Engagement always starts with an Issue where conversations and debates can occur around [bugs](#bugs) and [feature requests](#feature-requests):

* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do not** use issues for any personal support. Use [Discussions](https://github.com/capitec/omni-components/discussions) or [StackOverflow](https://stackoverflow.com/) instead.
* **Do not** side-track or derail issues threads. Stick to the topic please.
* **Do not** post comments using just "+1", "++" or "👍". Use [Reactions](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) instead.

### Bugs

A bug is an error, flaw or fault associated with *any part* of the project:

* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** describe the bug concisely, **avoid** adding extraneous code, logs or screenshots.
* **Do** attach a minimal test or repro (e.g. [CodePen](https://codepen.io/), [jsFiddle](https://jsfiddle.net/)) to demonstrate the bug.

### Feature Requests

A feature request is an improvement or new capability associated with *any part* of the project:

* **Do** search for a similar / existing Issue prior to submitting a new one.
* **Do** provide sufficient motivation / use case(s) for the feature. 
* **Do not** submit multiple unrelated requests within one request.

> 💡 TIP: We suggest that you engage as much as possible within an Issue prior to proceeding with any contributions. 

## Vulnerabilities

A vulnerability is typically a security-related risk associated with *any part* of the project (or any dependencies):

* **Do** refer to our [Security Policy](https://github.com/capitec/omni-components/security/policy) for more info.
* **Do** report vulnerabilities via this [link](https://github.com/capitec/omni-components/security/advisories/new). 
* **Do not** report any Issues or mention in public Discussions for discretionary purposes.

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

1. [Fork](https://github.com/capitec/omni-components/fork) the repository and create a new branch from `develop` (Do not directly use `develop` as this will prevent certain workflows from being triggered).
2. Go to the Actions tab and enable workflow runs for the repository. (This is needed to generate screenshots for tests)

    <img src="https://github.com/capitec/omni-components/blob/main/.github/assets/enable-workflows.png?raw=true" alt="Enabling Workflows" style="max-width: 100%; width: auto;"/>
3. Add a `PROTECTED_TOKEN` secret for workflow runs with a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) as its value. (Optional)
    - This is to enable re-triggering of workflows when a workflow commits screenshots. If this is not set a new code commit will be required to trigger the next workflow as it uses the default `GITHUB_TOKEN` instead.
    - See [Automatic token authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow) for detail.
    
    <img src="https://github.com/capitec/omni-components/blob/main/.github/assets/protected-token-creation.gif?raw=true" alt="Protected token creation" style="max-width: 100%; width: auto;"/>
4. Clone the forked repo, checkout your branch, and run `npm ci` inside the repository root.
5. Install the testing dependencies with `npx playwright install --with-deps`.
6. Start up the dev server with `npm run serve` (or by launching debugging in VS Code).

### Directory Structure

When adding or editing components, please note the following key directories:

```

├── src
│   ├── button
│   │   ├── Button.stories.ts
│   │   ├── Button.spec.ts
│   │   ├── Button.ts
│   │   ├── index.ts
│   │   ├── README.md
│   ├── ...
├── ...

```

* `src` - Contains all components in a flat structure, each named after a component, e.g. `button`. Contents:
  * `Button.stories.ts` - The stories for the component.
  * `Button.spec.ts` - The tests for the component.
  * `Button.ts` - The component. *(NOTE: There might be multiple, depending on complexity and composition)*
  * `index.ts` - The directory-level index, containing one or more component exports.
  * `README.md` - The README for the component *(NOTE: Generated when Pull Request is merged)*.

### Naming Conventions

* **Do** use *lower case* [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) for component folder names, e.g. `some-component`. 🍢
* **Do** use uppercase first letter [CamelCase](https://en.wikipedia.org/wiki/Camel_case) for component file names, e.g. `SomeComponent.ts`.
* **Do** use the name of the component, suffixed with `.stories` for component story file names, e.g. `SomeComponent.stories.ts`.
* **Do** use the name of the component, suffixed with `.spec` for component test file names, e.g. `SomeComponent.spec.ts`.
* **Do** match component name with its file name, e.g. `SomeComponent.ts` contains `export class SomeComponent { ... }`.
* **Do** prefix the custom element name with `omni-`.
* **Do not** use any verbs or prefixes within component property names, instead **do** use nouns, e.g. `mode`, `position`.
* **Do** name CSS custom properties as follows: 
  * Component: `--omni-<component>-<state>-<css-property>`, e.g. `--omni-button-primary-background-color`
  * Theme: `--omni-theme-<state>-<css-property>`, e.g. `--omni-theme-primary-color`
* **Do** follow standard [TypeScript](https://www.typescriptlang.org/docs/), [Lit](https://lit.dev/docs/) related conventions. 

> 💡 TIP: Refer to existing components and stories for examples. 

### Definition of Done
Here's a *non-exhaustive* list of requirements that are key to contributing to this project.

#### General
* **Do** use [TypeScript](https://www.typescriptlang.org/docs/), with common language practices.
* **Do** follow our [naming conventions](#naming-conventions).

#### Components
* **Do** base off [OmniElement](https://github.com/capitec/omni-components/blob/develop/src/core/OmniElement.ts).
* **Do** implement "mobile first" templates, leveraging [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) layout and styling principles. 📱
* **Do** utilize [LitElement's](https://lit.dev/) [decorators](https://lit.dev/docs/components/decorators/), required for element and property names.
* **Do** ensure sufficient [JSDoc](https://jsdoc.app/) as well as general code comments are added.
* **Do** add an `HTMLElementTagNameMap` entry as documented [here](https://lit.dev/docs/tools/publishing/#publish-typescript-typings).
* **Do** use and extend existing shared CSS component and theme custom properties. (See [`src/core/OmniElement.ts`](https://github.com/capitec/omni-components/blob/develop/src/core/OmniElement.ts))
* **Do** set suitable CSS custom property defaults, **avoid** hard-coding CSS property values directly within components, unless deemed required.
* **Do** adhere to and leverage existing DOM standards when making use of [`<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) element.
* **Do** implement suitable DOM [accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) features.
* **Do** allow components to be user customizable via [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) implementations.
* **Do** implement only *one* component class within a component file.

#### Stories
* **Do** use [Component Story Format (CSF) 3](https://github.com/capitec/omni-components/blob/develop/src/utils/ComponentStoryFormat.ts).
* **Do** set the `data-testid` within every story template.
* **Do** ensure that stories are authored to be both dark and light theme friendly (test via the hosted documentation).
* **Do** ensure that stories have their respective framework templates authored for each story where required.

#### Tests
* **Do** cater for behavioral testing for components that covers interaction and visual testing.
    * **Test** the attributes of the component using assertions.
    * **Test** visual behaviour by interactions. (Ensure mobile rendering differences are catered for)
        * Take a screenshot of the initial state of the component.
        * Perform interactions with the component.
        * Take a screenshot of every change in state during the interactions.
    * **Test** the events of the component using mock functions.
* **Do** ensure that the test name is unique and descriptive of what will be tested.   
* **Do** ensure that the tests written result in at least 80% code coverage for the component.
* **Do** ensure that the tests focus on user facing features of the component, not the internal workings of the component.
* **Do** ensure that all tests pass.


#### Themes
* **Do** maintain each built-in theme, by ensuring all `--omni-theme-*` CSS custom properties are implemented.
* **Do** test each theme thoroughly via the hosted documentation.

> 💡 TIP: Refer to existing components, stories and themes for examples for any of the above.


## Testing 

Tests are conducted via [Playwright](https://playwright.dev).

### Running tests from shell

- To run the end-to-end tests for all components on all configured browsers

```sh
npm run test
```

- To only run the end-to-end tests for all components on all configured browsers. (`npm run serve` must be run separately)

```sh
npm run test:only 
```

- To run the end-to-end tests for all components only on Chromium. (`npm run serve` must be run separately)
```sh
npx playwright test --project=chromium
```
- To run the tests of a specific component on all configured browsers. (`npm run serve` must be run separately)
```sh
npx playwright test Component.spec.ts
```

### Running tests from Playwright Test Explorer within VSCode

- Ensure that `npm run serve` is running separately.
- Refer to the [Playwright Test Explorer](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension.

### Viewing the test report

- To view the latest test report.
```sh
npm run test-results 
```
<img src="https://github.com/capitec/omni-components/blob/main/.github/assets/test-results-report.gif?raw=true" alt="Test Report" style="max-width: 100%; width: auto;"/>

> 🔶 NOTE: Screenshot testing only asserts during CI workflows, the report will locally only show current screenshots taken, but not perform any comparisons.

## Pull Requests
### Requirements
* **Do** ensure the branch is up to date with the `develop` branch.
* **Do** ensure there's no conflicts with the `develop` branch.
* **Do** ensure that all automatic [checks](#checks) pass. ✔

### Checks

* Code scanning passes.
* Lint validation passes. 
> 💡 TIP: Analyze changes locally with `npm run lint`.
* Format validation passes. 
> 💡 TIP: Apply changes locally with `npm run format`.
* All tests pass.

