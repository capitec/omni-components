<!-- ⚠️ This README has been generated from the file(s) "readme/blueprint.md" ⚠️-->
<p align="center">
  <img src="https://raw.githubusercontent.com/capitec/omni-components/develop/eleventy/assets/images/logo.png" alt="Logo" width="150" height="auto" />
</p>

<h1 align="center">Omni Components</h1>

<p align="center">
  <b>Customizable web components for any application.</b></br>
  <sub><sub>
</p>

<br />


<p align="center">
		<a href="https://npmcharts.com/compare/@capitec/omni-components?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@capitec/omni-components.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@capitec/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@capitec/omni-components.svg" height="20"/></a>
<a href="https://github.com/capitec/omni-components/actions/workflows/build.yml"><img alt="Build" src="https://github.com/capitec/omni-components/actions/workflows/build.yml/badge.svg" height="20"/></a>
<a href="https://github.com/capitec/omni-components/blob/develop/LICENSE"><img alt="License" src="https://img.shields.io/github/license/capitec/omni-components" height="20"/></a>
<a href="https://capitec.github.io/open-source/?repo=Omni-Components"><img alt="Docs" src="https://img.shields.io/badge/%20-Docs-blue" height="20"/></a>
	</p>


&nbsp;


<p align="center">
  <b>View our <a href="https://capitec.github.io/open-source/?repo=Omni-Components">full documentation</a> for more on component usage and live previews.</b></br>
  <sub><sub>
</p>



&nbsp;

[](#table-of-contents)

## Table of Contents

* [Getting Started](#getting-started)
* [UI Components](#ui-components)
* [Contributing and Usage](#contributing-and-usage)
	* [Setup](#setup)
	* [Contributors](#contributors)
	* [License](#license)
&nbsp;

[](#getting-started)

# Getting Started

Install Omni Components locally:

```bash

npm install @capitec/omni-components
```

Then import the components you require and start to use them in your project.

The following example shows how to import and use the ``<omni-button>`` as well as a slotted ``<omni-icon>`` with [Google Material Icons](https://fonts.google.com/icons).

> Import the required components
```js

import '@capitec/omni-components/button';
import '@capitec/omni-components/icon';
```
> or
```html

<script type="module" src="/node_modules/omni-components/dist/button/button.js" ></script>
<script type="module" src="/node_modules/omni-components/dist/icon/icon.js" ></script>
```
> Use the components in your project
```html

<!-- Add Material to your project, e.g. Adding below link in <head>-->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<!-- ------------------------------------------------------------- -->

<omni-button type="primary" label="Button" slot-position="left">
  <omni-icon icon="@material/thumb_up"></omni-icon>
</omni-button>
```
[![Getting Started - CodePen Example](readme/CodePenExample.PNG)](https://codepen.io/capitec-oss/pen/eYrLaGZ)

For a more detailed installation guide, see [`INSTALLATION.md`](./INSTALLATION.md) as well as our [full documentation](https://capitec.github.io/open-source/?repo=Omni-Components).

&nbsp;


[](#ui-components)

# UI Components
<table style="max-width: 800px;"><thead><tr><th style="width: 100px;">Tag Name</th><th style="width: 600px;">Description</th></tr></thead><tbody><tr><td>

[omni-button](src/button/README.md)

</td><td>

Control that allows an action to be executed.

</td></tr><tr><td>

[omni-check](src/check/README.md)

</td><td>

Control that allows a selection to be made.

</td></tr><tr><td>

[omni-chip](src/chip/README.md)

</td><td>

Control that can be used for input, setting attributes, or performing actions.

</td></tr><tr><td>

[omni-color-field](src/color-field/README.md)

</td><td>

Color input control.

</td></tr><tr><td>

[omni-currency-field](src/currency-field/README.md)

</td><td>

A currency input control that formats input based on currency and locale.

</td></tr><tr><td>

[omni-hyperlink](src/hyperlink/README.md)

</td><td>

Control to indicate an action to be executed. Typically used for navigational purposes.

</td></tr><tr><td>

[omni-icon](src/icon/README.md)

</td><td>

Component that displays an icon.

</td></tr><tr><td>

[omni-check-icon](src/icons/README.md)

</td><td>

Check icon component.

</td></tr><tr><td>

[omni-chevron-down-icon](src/icons/README.md)

</td><td>

Chevron down icon component.

</td></tr><tr><td>

[omni-clear-icon](src/icons/README.md)

</td><td>

A clear icon component.

</td></tr><tr><td>

[omni-close-icon](src/icons/README.md)

</td><td>

Close icon component.

</td></tr><tr><td>

[omni-eye-hidden-icon](src/icons/README.md)

</td><td>

Hidden eye icon component

</td></tr><tr><td>

[omni-eye-visible-icon](src/icons/README.md)

</td><td>

Visible eye icon component.

</td></tr><tr><td>

[omni-indeterminate-icon](src/icons/README.md)

</td><td>

Indeterminate icon component.

</td></tr><tr><td>

[omni-loading-icon](src/icons/README.md)

</td><td>

Loading icon component.

</td></tr><tr><td>

[omni-lock-closed-icon](src/icons/README.md)

</td><td>

Closed lock icon component.

</td></tr><tr><td>

[omni-lock-open-icon](src/icons/README.md)

</td><td>

Open lock icon component.

</td></tr><tr><td>

[omni-minus-icon](src/icons/README.md)

</td><td>

Minus icon component.

</td></tr><tr><td>

[omni-more-icon](src/icons/README.md)

</td><td>

More icon component.

</td></tr><tr><td>

[omni-plus-icon](src/icons/README.md)

</td><td>

Plus icon component.

</td></tr><tr><td>

[omni-search-icon](src/icons/README.md)

</td><td>

A search icon component.

</td></tr><tr><td>

[omni-label](src/label/README.md)

</td><td>

Label component that renders styled text.

</td></tr><tr><td>

[omni-number-field](src/number-field/README.md)

</td><td>

Input control to enter a single line of numbers.

</td></tr><tr><td>

[omni-numeric-field](src/numeric-field/README.md)

</td><td>

Input control to enter a single line of numbers with a stepper control.

</td></tr><tr><td>

[omni-password-field](src/password-field/README.md)

</td><td>

Password input control.

</td></tr><tr><td>

[omni-radio](src/radio/README.md)

</td><td>

Control to select a single value from a group of values.

</td></tr><tr><td>

[omni-render-element](src/render-element/README.md)

</td><td>

Element that defers content rendering to a provided function / promise.

</td></tr><tr><td>

[omni-search-field](src/search-field/README.md)

</td><td>

A search input control.

</td></tr><tr><td>

[omni-select](src/select/README.md)

</td><td>

Control to get / set a value within a list of options.

</td></tr><tr><td>

[omni-switch](src/switch/README.md)

</td><td>

Control to switch a value on or off.

</td></tr><tr><td>

[omni-text-field](src/text-field/README.md)

</td><td>

Control to input text.

</td></tr></tbody></table>



&nbsp;

[](#contributing-and-usage)

# Contributing and Usage

[](#setup)

## Setup

1. [Fork](https://github.com/capitec/omni-components/fork) the repository and create a branch from `develop`.
2. Clone the forked repo, checkout your branch, and run `npm ci` inside the repository root.
3. Start up the dev server with `npm run serve` (or by launching debugging in VS Code).

For more on contribution guidelines, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).


[](#contributors)

## Contributors

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/BOTLANNER">
            <img src="https://avatars.githubusercontent.com/u/16349308?v=4" width="100;" alt="BOTLANNER"/>
            <br />
            <sub><b>BOTLANNER</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/chromaticWaster">
            <img src="https://avatars.githubusercontent.com/u/22874454?v=4" width="100;" alt="chromaticWaster"/>
            <br />
            <sub><b>chromaticWaster</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/stefan505">
            <img src="https://avatars.githubusercontent.com/u/10812446?v=4" width="100;" alt="stefan505"/>
            <br />
            <sub><b>stefan505</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/capitec-oss">
            <img src="https://avatars.githubusercontent.com/u/109588738?v=4" width="100;" alt="capitec-oss"/>
            <br />
            <sub><b>capitec-oss</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

[](#license)

## License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
