<!-- ⚠️ This README has been generated from the file(s) ".tooling/readme/blueprint.md" ⚠️-->
<br>

<p align="center">
  <img src="./.tooling/readme/logos/omni.png" alt="Logo" width="128" height="128" />
</p>

<h3 align="center">Omni Components</h3>
<p align="center"><strong><code>@capitec/omni-components</code></strong></p>
<p align="center">Modern UI component library for mobile and web</p>

<br />

<p align="center">
	<a href="https://npmcharts.com/compare/@capitec/omni-components?minimal=true"><img alt="Downloads per week" src="https://img.shields.io/npm/dw/@capitec/omni-components.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@capitec/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@capitec/omni-components.svg" height="20"/></a>
	<a href="https://github.com/capitec/omni-components/actions/workflows/build.yml"><img alt="GitHub Build" src="https://github.com/capitec/omni-components/actions/workflows/build.yml/badge.svg" height="20"/></a>
	<a href="https://github.com/capitec/omni-components/blob/develop/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/capitec/omni-components" height="20"/></a>
</p>
<p align="center">
	<a href="https://capitec.github.io/open-source/docs/omni-components/"><img alt="Docs" src="https://img.shields.io/static/v1?label=docs&message=capitec.github.io/open-source&color=blue&style=flat-square" /></a>
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

<p align="center">🚩 View our <a href="https://capitec.github.io/open-source/docs/omni-components">interactive documentation</a> for more info on component usage and live previews.</p>

<br>


[](#introduction)

## Introduction

Omni Components is a collection UI components for mobile and web that enable you to build omni-channel user experience that look great on every size of screen.

Core features of the library include:
- **Framework Agnostic** - Components are delivered as standard HTML [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), that can be used in VanillaJS or within any framework, e.g. Lit, React, Vue, Angular, etc.
- **Theming** - Components can be styled globally and individually using CSS properties.
- **Responsive** - The components adapt responsively to the device that they render on to provide contextual user experiences.
- **Mobile Optimized** - We develop for mobile first, and scale up to larger screen sizes from there.
- **Lightweight** - The library is small, tree-shakes well, and comes with minimal dependencies, minimizing bloat to your project.

<br>


[](#usage)

## Usage

1️⃣ &nbsp; Install Omni Components in your project.

```bash
npm install '@capitec/omni-components'
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


This example shows how to import and use a few common components. Omni Components can be combined with 3rd party libraries, e.g. here we embed a [Google Material Icons](https://fonts.google.com/icons) as a slotted element within a ``<omni-button>``.

[CodePen](https://codepen.io/capitec-oss/pen/eYrLaGZ)

```html
<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>Omni Components Demo</title>

        <base href="/">
      
        <!-- Import Google Material icons library -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- Import Omni Components -->
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


[](#api-reference)

## API Reference


<table style="max-width: 800px;"><thead><tr><th style="width: 100px;">Tag Name</th><th style="width: 600px;">Description</th></tr></thead><tbody><tr><td>

[omni-button](src/button/README.md)

</td><td>

Control that allows an action to be executed.

</td></tr><tr><td>

[omni-calendar](src/calendar/README.md)

</td><td>

Calendar component to set specific date.

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

Control to enter a formatted currency value.

</td></tr><tr><td>

[omni-date-picker](src/date-picker/README.md)

</td><td>

Control to get / set a specific date using a calendar.

</td></tr><tr><td>

[omni-email-field](src/email-field/README.md)

</td><td>

Email input control, used in forms for input validation and to display correct virtual keyboard on mobile.

</td></tr><tr><td>

[omni-hyperlink](src/hyperlink/README.md)

</td><td>

Control to indicate an action to be executed. Typically used for navigational purposes.

</td></tr><tr><td>

[omni-icon](src/icon/README.md)

</td><td>

Component that displays an icon.

</td></tr><tr><td>

[omni-arrow-right-icon](src/icons/README.md)

</td><td>

Arrow right icon component.

</td></tr><tr><td>

[omni-backspace-icon](src/icons/README.md)

</td><td>

Backspace icon component.

</td></tr><tr><td>

[omni-calendar-icon](src/icons/README.md)

</td><td>

A calendar icon component.

</td></tr><tr><td>

[omni-caps-lock-icon](src/icons/README.md)

</td><td>

Caps lock icon component.

</td></tr><tr><td>

[omni-caps-off-icon](src/icons/README.md)

</td><td>

Caps off icon component.

</td></tr><tr><td>

[omni-caps-on-icon](src/icons/README.md)

</td><td>

Caps on icon component.

</td></tr><tr><td>

[omni-check-icon](src/icons/README.md)

</td><td>

Check icon component.

</td></tr><tr><td>

[omni-chevron-down-icon](src/icons/README.md)

</td><td>

Chevron down icon component.

</td></tr><tr><td>

[omni-chevron-left-icon](src/icons/README.md)

</td><td>

Chevron left icon component.

</td></tr><tr><td>

[omni-chevron-right-icon](src/icons/README.md)

</td><td>

Chevron right icon component.

</td></tr><tr><td>

[omni-clear-icon](src/icons/README.md)

</td><td>

Clear icon component.

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

[omni-next-icon](src/icons/README.md)

</td><td>

Next icon component.

</td></tr><tr><td>

[omni-plus-icon](src/icons/README.md)

</td><td>

Plus icon component.

</td></tr><tr><td>

[omni-previous-icon](src/icons/README.md)

</td><td>

Previous icon component.

</td></tr><tr><td>

[omni-search-icon](src/icons/README.md)

</td><td>

Search icon component.

</td></tr><tr><td>

[omni-send-icon](src/icons/README.md)

</td><td>

Send icon component.

</td></tr><tr><td>

[omni-keyboard](src/keyboard/README.md)

</td><td>

A responsive on-screen keyboard control component.

</td></tr><tr><td>

[omni-keyboard-button](src/keyboard/README.md)

</td><td>

An internal keyboard button control used in the keyboard component.

</td></tr><tr><td>

[omni-label](src/label/README.md)

</td><td>

Label component that renders styled text.

</td></tr><tr><td>

[omni-modal](src/modal/README.md)

</td><td>

Control to display modal content with optional header and footer content.

</td></tr><tr><td>

[omni-number-field](src/number-field/README.md)

</td><td>

Input control to enter a single line of numbers.

</td></tr><tr><td>

[omni-password-field](src/password-field/README.md)

</td><td>

Password input control.

</td></tr><tr><td>

[omni-pin-field](src/pin-field/README.md)

</td><td>

Input control to enter a masked numeric value.

</td></tr><tr><td>

[omni-radio](src/radio/README.md)

</td><td>

Control to select a single value from a group of values.

</td></tr><tr><td>

[omni-radio-group](src/radio/README.md)

</td><td>

Control to group radio components for single selection

</td></tr><tr><td>

[omni-render-element](src/render-element/README.md)

</td><td>

Element that defers content rendering to a provided function / promise.

</td></tr><tr><td>

[omni-search-field](src/search-field/README.md)

</td><td>

Search input control.

</td></tr><tr><td>

[omni-select](src/select/README.md)

</td><td>

Control to get / set a value within a list of options.

</td></tr><tr><td>

[omni-switch](src/switch/README.md)

</td><td>

Control to switch a value on or off.

</td></tr><tr><td>

[omni-tab](src/tab/README.md)

</td><td>

Control that can be used to display slotted content, for use within an Tab Group component.

</td></tr><tr><td>

[omni-tab-group](src/tab/README.md)

</td><td>

Component that displays content in tabs.

</td></tr><tr><td>

[omni-tab-header](src/tab/README.md)

</td><td>

Control that can be used to display custom slotted content, for use within Tab Group component with associated Tab component.

</td></tr><tr><td>

[omni-text-field](src/text-field/README.md)

</td><td>

Control to input text.

</td></tr><tr><td>

[omni-toast](src/toast/README.md)

</td><td>

Component to visually notify a user of a message.

</td></tr><tr><td>

[omni-toast-stack](src/toast/README.md)

</td><td>

A toast container that animates in and stacks toast elements.

</td></tr></tbody></table>



<br>


[](#contributors)

## Contributors

Made possible by these fantastic people. 💖

See the [`CONTRIBUTING.md`](./CONTRIBUTING.md) guide to get involved.


<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/chromaticWaster">
            <img src="https://avatars.githubusercontent.com/u/22874454?v=4" width="100;" alt="chromaticWaster"/>
            <br />
            <sub><b>chromaticWaster</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/BOTLANNER">
            <img src="https://avatars.githubusercontent.com/u/16349308?v=4" width="100;" alt="BOTLANNER"/>
            <br />
            <sub><b>BOTLANNER</b></sub>
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
        <a href="https://github.com/jn42lm1">
            <img src="https://avatars.githubusercontent.com/u/54233338?v=4" width="100;" alt="jn42lm1"/>
            <br />
            <sub><b>jn42lm1</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Makhubedu">
            <img src="https://avatars.githubusercontent.com/u/43409770?v=4" width="100;" alt="Makhubedu"/>
            <br />
            <sub><b>Makhubedu</b></sub>
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

<br>


[](#license)

## License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).

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