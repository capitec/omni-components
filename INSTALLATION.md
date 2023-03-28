# Installation

You can use Omni Components via CDN or by installing it locally. 


## CDN Installation (Easiest) 📡

The easiest way to install Omni Components is with the CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/omni-components.js"></script>
```

<strong> 💡 If you're only using a few components, it will be more efficient to [cherry pick](#cherry-picking-) the ones you need. </strong>

## Local Installation 💾

You can also install Omni Components locally with the following command:

```bash
npm install @capitec/omni-components
```

With the latest package installed from NPM, [you can use a bundler](#bundling-). The ESM package used for [CDN Installation](#cdn-installation-(easiest)-) has its dependencies bundled already which allows it to be used without the need to install dependencies. However when using the local installation from NPM, the dependencies need to be provided externally, or you would need to [bundle the dependencies](#bundling-).

<strong> 💡 For clarity, the docs will usually show imports from `@capitec/omni-components`. If you're not using a module resolver or bundler, you'll need to adjust these paths to point to the folder Omni Components is in. </strong>


## Cherry Picking 🍒

The CDN approach is the _easiest_ way to load Omni Components, but easy isn't always efficient. You'll incur the full size of the library even if you only use a handful of components. This is convenient for prototyping or if you're using most of the components, but it may result in longer load times in production. To improve this, you can cherry pick the components you need.

Cherry picking can be done from your local install or [directly from the CDN](https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/). This will limit the number of files the browser has to download and reduce the amount of bytes being transferred. The disadvantage is that you need to load components manually.

Here's an example that loads only the button component.


```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/button/Button.js"></script>

<omni-button label="Button" type="secondary"></omni-button>
```

NOTE: Some components may have dependencies that are automatically imported when you cherry pick.

<strong> 💡  _Never_ cherry pick components or utilities from `omni-components.js` as this will still cause the browser to load the entire library. Instead, cherry pick from specific modules as shown above. You will also see files named `chunk.[hash].js` in the `chunks-js` directory, never import these files directly, as they are generated and change from version to version. </strong>

## Bundling 💼

Omni Components is distributed as a collection of standard ES modules that [all modern browsers can understand](https://caniuse.com/es6-module). However, importing a lot of modules can result in a lot of HTTP requests and potentially longer load times. Using a CDN can alleviate this, but some users may wish to further optimize their imports with a bundler.

To use Omni Components with a bundler, first install it from NPM along with your bundler of choice:

```bash
npm install @capitec/omni-components
```

<strong> 💡 Using a bundler will allow for optimal [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), which will ensure the smallest size and most efficient usage. Our [starter templates](#starter-templates-🔰) already provide this for you!</strong>

## Starter Templates 🔰

To help bootstrap a development project, we offer the following application starter template repositories:

* [Lit Starter](https://github.com/capitec/template-pwa-lit) - For [Lit](https://lit.dev)-based SPA development.
