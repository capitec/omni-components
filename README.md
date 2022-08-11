<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#welcome-to-omni-components-)

# ➜ Welcome to Omni Components 
<h1 align="center">@innofake/omni-components</h1>
<p align="center">
  <img src="https://avatars.githubusercontent.com/u/107934107" alt="Logo" width="150" height="auto" />
</p>

<p align="center">
  <b>Omni Components come with minimal dependencies to reduce the bloat in your project. All web components base off Lit (https://lit.dev) and are each available as fully standalone imports or at a group level import.</b></br>
  <sub><sub>
</p>

<br />

<p align="center">0.0.1</p>

<p align="center">
		<a href="https://npmcharts.com/compare/@innofake/omni-components?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@innofake/omni-components.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@innofake/omni-components"><img alt="NPM Version" src="https://img.shields.io/npm/v/@innofake/omni-components.svg" height="20"/></a>
<a href="https://david-dm.org/innofake/omni-components"><img alt="Dependencies" src="https://img.shields.io/david/innofake/omni-components.svg" height="20"/></a>
<a href="https://github.com/innofake/omni-components/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/innofake/omni-components.svg" height="20"/></a>
<a href=""><img alt="Repository: Private" src="https://img.shields.io/badge/Repository-private-lightgrey.svg" height="20"/></a>
	</p>


&nbsp;

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#table-of-contents)

## ⭑ Table of Contents

* [➜ Welcome to Omni Components ](#-welcome-to-omni-components-)
* [➜ omni-check](#-omni-check)
	* [⭑ Example](#-example)
* [➜ omni-code](#-omni-code)
	* [⭑ Example](#-example-1)
* [➜ omni-icon](#-omni-icon)
	* [⭑ Example](#-example-2)
* [➜ omni-label](#-omni-label)
	* [⭑ Example](#-example-3)
* [➜ omni-radio](#-omni-radio)
	* [⭑ Example](#-example-4)
* [➜ omni-switch](#-omni-switch)
	* [⭑ Example](#-example-5)
* [➜ Contributing and Usage](#-contributing-and-usage)
	* [⭑ License](#-license)
&nbsp;


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-check)

# ➜ omni-check

A control that allows a user to check a value on or off.

```js 
import '@innofake/omni-components/check'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-check
  label="My Toggle Value"
  .data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  checked
  disabled>
</omni-check>
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-code)

# ➜ omni-code

A control to syntax highlight and display source code.

```js 
import '@innofake/omni-components/code'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-code language="html">
 <div>
   <h1>Hello World</h1>
 </div>
</omni-menu>
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-icon)

# ➜ omni-icon

Component that displays an icon

```js 
import '@innofake/omni-components/icon'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-icon
  size="default|extra-small|small|medium|large">
	  <svg version="1.1" id="diagram" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="375px" height="150px">
	    <path d="M45,11.5H33.333c0.735-1.159,1.167-2.528,1.167-4C34.5,3.364,31.136,0,27,0s-7.5,3.364-7.5,7.5c0,1.472,0.432,2.841,1.167,4H9l-9,32h54L45,11.5z M22.5,7.5C22.5,5.019,24.519,3,27,3s4.5,2.019,4.5,4.5c0,1.752-1.017,3.257-2.481,4h-4.037 C23.517,10.757,22.5,9.252,22.5,7.5z" id="control"/>
   </svg>
</omni-icon>

```

```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-label)

# ➜ omni-label

A simple label component that renders a styled text string.

```js 
import '@innofake/omni-components/label'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-label
  label="Hello World"
  type="strong">
</omni-label>
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-radio)

# ➜ omni-radio

A control that allows a user to select a single value from a small group of values.

```js 
import '@innofake/omni-components/radio'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-radio
  label="My Toggle Value"
  data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  checked
  disabled>
</omni-radio>
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#omni-switch)

# ➜ omni-switch

A control that allows a user to switch a value on or off.

```js 
import '@innofake/omni-components/switch'; 
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#example)

## ⭑ Example

```html
<omni-switch
  label="My Switch Value"
  data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  checked>
</omni-switch>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributing-and-usage)

# ➜ Contributing and Usage
<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/BOTLANNER">
            <img src="https://avatars.githubusercontent.com/u/16349308?v=4" width="100;" alt="BOTLANNER"/>
            <br />
            <sub><b>BOTLANNER</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#license)

## ⭑ License
	
Licensed under [ISC](https://opensource.org/licenses/ISC).