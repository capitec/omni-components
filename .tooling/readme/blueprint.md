
<br>

{{ template:logo }}

<h3 align="center">{{ template:projectName }}</h3>
<p align="center"><strong><code>{{ pkg.name }}</code></strong></p>
<p align="center">{{ pkg.description }}</p>

<br />

<p align="center">
	<a href="https://npmcharts.com/compare/@capitec/omni-components?minimal=true"><img alt="Downloads per week" src="https://img.shields.io/npm/dw/@capitec/omni-components.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@capitec/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@capitec/omni-components.svg" height="20"/></a>
	<a href="https://github.com/capitec/omni-components/actions/workflows/build.yml"><img alt="GitHub Build" src="https://github.com/capitec/omni-components/actions/workflows/build.yml/badge.svg" height="20"/></a>
	<a href="https://github.com/capitec/omni-components/blob/develop/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/capitec/omni-components" height="20"/></a>
</p>
<p align="center">
	<a href="https://capitec.github.io/open-source/?repo=Omni-Components"><img alt="Docs" src="https://img.shields.io/static/v1?label=docs&message=capitec.github.io/open-source&color=blue&style=flat-square" /></a>
</p>

<br/>

<p align="center">
	[<a href="#introduction">Introduction</a>]
	[<a href="#usage">Usage</a>]
	[<a href="#api-reference">API Reference</a>]
	[<a href="#contributors">Contributors</a>]
	[<a href="#license">License</a>]
</p>

<br/>

---

<br />

<p align="center">🚩 View our <a href="https://capitec.github.io/open-source/docs/Omni-Components">interactive documentation</a> for more info on component usage and live previews.</p>

<br>

## Introduction

{{ template:projectName }} is a collection UI components for mobile and web that enable you to build omni-channel user experience that look great on every size of screen.

Core features of the library include:
- **Framework Agnostic** - Components are delivered as standard HTML [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), that can be used in VanillaJS or within any framework, e.g. Lit, React, Vue, Angular, etc.
- **Theming** - Components can be styled globally and individually using CSS properties.
- **Responsive** - The components adapt responsively to the device that they render on to provide contextual user experiences.
- **Mobile Optimized** - We develop for mobile first, and scale up to larger screen sizes from there.
- **Lightweight** - The library is small, tree-shakes well, and comes with minimal dependencies, minimizing bloat to your project.

<br>

## Usage

1️⃣ &nbsp; Install {{ template:projectName }} in your project.

```bash
npm install {{ pkg.name }}
```

2️⃣ &nbsp; Import the components you require. See [`INSTALLATION.md`](./INSTALLATION.md) for more detail.

```js
// JS import
import '@capitec/omni-components/button';

// or HTML import
<script type="module" src="/node_modules/omni-components/dist/button/button.js" ></script>
```

3️⃣ &nbsp; Use the component tag in your web page.
```html
<omni-button type="primary" label="Button"></omni-button>
```

### 💡 Example


This example shows how to import and use a few common components. {{ template:projectName }} can be combined with 3rd party libraries, e.g. here we embed a [Google Material Icons](https://fonts.google.com/icons) as a slotted element within a ``<omni-button>``.

[CodePen](https://codepen.io/capitec-oss/pen/eYrLaGZ)

```html
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>{{ template:projectName }} Demo</title>

        <base href="/">
      
        <!-- Import Google Material icons library -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- Import {{ template:projectName }} -->
        <script type="module">
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/button/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/icon/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/check/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/radio/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/switch/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/text-field/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/number-field/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/password-field/index.js";
          import "https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/select/index.js";

          document.querySelector('omni-select').items = [
            {"id":"1", "label":"Peter Parker"},
            {"id":"2","label":"James Howlett"},
            {"id":"3", "label":"Tony Stark"},
            {"id":"4","label":"Steve Rodgers"},
            {"id":"5", "label":"Bruce Banner"},
            {"id":"6","label":"Wanda Maximoff"},
            {"id":"7", "label":"TChalla"},
            {"id":"8","label":"Henry P. McCoy"},
            {"id":"9", "label":"Carl Lucas"},
            {"id":"10","label":"Frank Castle"}
          ];
        </script>

      <style>
        :root {
          --omni-theme-primary-color: #005AE0;
          --omni-theme-primary-hover-color: #0052D8;
          --omni-theme-primary-active-color: #004BD1;
        }
        
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
        }
        
        omni-text-field, omni-number-field, omni-password-field, omni-select {
          width: 300px;
        }
      </style>
    </head>

    <body>
        <omni-button type="primary" label="Button" slot-position="left">
          <omni-icon icon="@material/thumb_up"></omni-icon>
        </omni-button>

        <omni-check label="Check" error="Required"></omni-check>

        <omni-radio label="Radio"></omni-radio>

        <omni-switch label="Switch"></omni-switch>

        <omni-text-field label="Text Field"></omni-text-field>

        <omni-number-field label="Number Field"></omni-number-field>

        <omni-password-field label="Password Field"></omni-password-field>

        <omni-select label="Select" display-field="label" idfield="id"></omni-select>
    </body>
</html>
```

<br>

## API Reference

{{ load:.tooling/readme/LIST.md }}

<br>

## Contributors

Made possible by these fantastic people. 💖

See the [`CONTRIBUTING.md`](./CONTRIBUTING.md) guide to get involved.

{{ load:.tooling/readme/contributors.md }}

<br>

{{ template:license }}

<br>
<br>
<hr>
<br>
<br>
<br>
<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./.tooling/readme/logos/capitec-logo-white.svg">
        <img alt="Capitec Logo" src="./.tooling/readme/logos/capitec-logo-color.svg" height="28">
    </picture>
</p>
<p align="center">We are hiring 🤝 Join us! 🇿🇦</p>
<p align="center">
    <a href="https://www.capitecbank.co.za/about-us/careers">https://www.capitecbank.co.za/about-us/careers</a>
</p>

<br>
<br>