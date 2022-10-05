<!-- ⚠️ This README has been generated from the file(s) "readme/blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#welcome-to-omni-components-)

# ➜ Welcome to Omni Components 
<h1 align="center">@capitec/omni-components</h1>
<p align="center">
  <img src="https://avatars.githubusercontent.com/u/109590421" alt="Logo" width="150" height="auto" />
</p>

<p align="center">
  <b>Omni Components come with minimal dependencies to reduce the bloat in your project. All web components base off Lit (https://lit.dev) and are each available as fully standalone imports or at a group level import.</b></br>
  <sub><sub>
</p>

<br />


<p align="center">
		<a href="https://npmcharts.com/compare/@capitec/omni-components?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@capitec/omni-components.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@capitec/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@capitec/omni-components.svg" height="20"/></a>
<a href="https://github.com/capitec/omni-components/actions/workflows/build.yml"><img alt="Build" src="https://github.com/capitec/omni-components/actions/workflows/build.yml/badge.svg" height="20"/></a>
<a href="https://capitec.github.io/open-source/?repo=Omni-Components"><img alt="Docs" src="https://img.shields.io/badge/%20-Docs-blue?logo=data:image/png;base64,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" height="20"/></a>
	</p>


&nbsp;


<p align="center">
  <b>View our <a href="https://capitec.github.io/open-source/?repo=Omni-Components">full documentation</a> for more on component usage and live previews.</b></br>
  <sub><sub>
</p>



&nbsp;

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#table-of-contents)

## ⭑ Table of Contents

* [➜ Welcome to Omni Components ](#-welcome-to-omni-components-)
* [➜ UI Components](#-ui-components)
* [➜ Contributing and Usage](#-contributing-and-usage)
	* [⭑ Contributors](#-contributors)
	* [⭑ License](#-license)
&nbsp;


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#ui-components)

# ➜ UI Components
<table><thead><tr><th>Tag Name</th><th>Class</th><th>Description</th></tr></thead><tbody><tr><td>

[omni-button](src/button/README.md)

</td><td>Button</td><td>

A control that allows an action to be executed.


```js


import '@capitec/omni-components/button';

```

</td></tr><tr><td>

[omni-check](src/check/README.md)

</td><td>Check</td><td>

A control that allows a user to check a value on or off.


```js


import '@capitec/omni-components/check';

```

</td></tr><tr><td>

[omni-chip](src/chip/README.md)

</td><td>Chip</td><td>

A control that can be used for input, setting attributes, or performing actions.


```js


import '@capitec/omni-components/chip';

```

</td></tr><tr><td>

[omni-hyperlink](src/hyperlink/README.md)

</td><td>Hyperlink</td><td>

A link control that allows a user to indicate an action to be executed. Typically used for navigational purposes.


```js


import '@capitec/omni-components/hyperlink';

```

</td></tr><tr><td>

[omni-icon](src/icon/README.md)

</td><td>Icon</td><td>

Component that displays an icon


```js


import '@capitec/omni-components/icon';

```

</td></tr><tr><td>

[omni-check-icon](src/icons/README.md)

</td><td>CheckIcon</td><td>

A check icon component.


```js

import '@capitec/omni-components/icons/Check.icon.js';

```

</td></tr><tr><td>

[omni-close-icon](src/icons/README.md)

</td><td>CloseIcon</td><td>

A Close icon component.


```js

import '@capitec/omni-components/icons/Close.icon.js';

```

</td></tr><tr><td>

[omni-indeterminate-icon](src/icons/README.md)

</td><td>IndeterminateIcon</td><td>

An indeterminate icon component.


```js

import '@capitec/omni-components/icons/Indeterminate.icon.js';

```

</td></tr><tr><td>

[omni-label](src/label/README.md)

</td><td>Label</td><td>

A simple label component that renders styled text.


```js


import '@capitec/omni-components/label';

```

</td></tr><tr><td>

[omni-radio](src/radio/README.md)

</td><td>Radio</td><td>

A control that allows a user to select a single value from a group of values.


```js


import '@capitec/omni-components/radio';

```

</td></tr><tr><td>

[omni-switch](src/switch/README.md)

</td><td>Switch</td><td>

A control that allows a user to switch a value on or off.


```js


import '@capitec/omni-components/switch';

```

</td></tr></tbody></table>



&nbsp;

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributing-and-usage)

# ➜ Contributing and Usage


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributors)

## ⭑ Contributors

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
        <a href="https://github.com/stefan505">
            <img src="https://avatars.githubusercontent.com/u/10812446?v=4" width="100;" alt="stefan505"/>
            <br />
            <sub><b>stefan505</b></sub>
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
        <a href="https://github.com/capitec-oss">
            <img src="https://avatars.githubusercontent.com/u/109588738?v=4" width="100;" alt="capitec-oss"/>
            <br />
            <sub><b>capitec-oss</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#license)

## ⭑ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
