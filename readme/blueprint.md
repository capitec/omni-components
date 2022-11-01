
{{ template:logo }}

{{ template:description }}

{{ template:badges }}

&nbsp;


<p align="center">
  <b>View our <a href="https://capitec.github.io/open-source/?repo=Omni-Components">full documentation</a> for more on component usage and live previews.</b></br>
  <sub><sub>
</p>



&nbsp;
{{ template:toc }}
&nbsp;
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

{{ load:readme/LIST.md }}

&nbsp;
# Contributing and Usage
## Setup

1. [Fork](https://github.com/capitec/omni-components/fork) the repository and create a branch from `develop`.
2. Clone the forked repo, checkout your branch, and run `npm ci` inside the repository root.
3. Start up the dev server with `npm run serve` (or by launching debugging in VS Code).

For more on contribution guidelines, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Contributors
{{ load:readme/contributors.md }}
{{ template:license }}
