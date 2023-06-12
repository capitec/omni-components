# Installation

You can use Omni Components via CDN or by installing it locally. 


## CDN Installation (Easiest) 📡

The easiest way to install Omni Components is with the CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/omni-components.js"></script>
```

> 💡 If you're only using a few components, it will be more efficient to [cherry pick](#cherry-picking-) the ones you need.

## Local Installation 💾

You can also install Omni Components locally with the following command:

```bash
npm install '@capitec/omni-components'
```

With the latest package installed from NPM, [you can use a bundler](#bundling-). The ESM package used for [CDN Installation](#cdn-installation-(easiest)-) has its dependencies bundled already which allows it to be used without the need to install dependencies. However when using the local installation from NPM, the dependencies need to be provided externally, or you would need to [bundle the dependencies](#bundling-).

> 💡 For clarity, the docs will usually show imports from `@capitec/omni-components`. If you're not using a module resolver or bundler, you'll need to adjust these paths to point to the folder Omni Components is in.


## Cherry Picking 🍒

The CDN approach is the _easiest_ way to load Omni Components, but easy isn't always efficient. You'll incur the full size of the library even if you only use a handful of components. This is convenient for prototyping or if you're using most of the components, but it may result in longer load times in production. To improve this, you can cherry pick the components you need.

Cherry picking can be done from your local install or [directly from the CDN](https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/). This will limit the number of files the browser has to download and reduce the amount of bytes being transferred. The disadvantage is that you need to load components manually.

Here's an example that loads only the button component.


```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@capitec/omni-components@esm/dist/button/Button.js"></script>

<omni-button label="Button" type="secondary"></omni-button>
```

NOTE: Some components may have dependencies that are automatically imported when you cherry pick.

> 💡  _Never_ cherry pick components or utilities from `omni-components.js` as this will still cause the browser to load the entire library. Instead, cherry pick from specific modules as shown above. You will also see files named `chunk.[hash].js` in the `chunks-js` directory, never import these files directly, as they are generated and change from version to version.

## Bundling 💼

Omni Components is distributed as a collection of standard ES modules that [all modern browsers can understand](https://caniuse.com/es6-module). However, importing a lot of modules can result in a lot of HTTP requests and potentially longer load times. Using a CDN can alleviate this, but some users may wish to further optimize their imports with a bundler.

To use Omni Components with a bundler, first install it from NPM along with your bundler of choice:

```bash
npm install '@capitec/omni-components'
```

> 💡 Using a bundler will allow for optimal [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), which will ensure the smallest size and most efficient usage. Our [starter templates](#starter-templates-) already provide this for you!



## React Wrappers 🎁

React makes some assumptions about HTML elements that don't fully apply to custom elements, as it treats lower-case tag names differently from upper-case component names in ways that can make custom elements harder than necessary to use. 

Omni Components provides a separate package with each web component wrapped into a React component.


You can install Omni Components for React locally with the following command:

```bash
npm install '@capitec/omni-components-react'
```

Or you can use Omni Components for React directly via a CDN:
```jsx
import { OmniButton } from "https://cdn.jsdelivr.net/npm/@capitec/omni-components-react@esm/button/index.js";

const App = () => <OmniButton label='Click' type='primary'/>; 
```

## Vue Support ⚙

By default, Vue will attempt to resolve a non-native HTML tag as a registered Vue component before falling back to rendering it as a custom element. 
This means that in order for custom web components like Omni Components to behave correctly, Vue needs to be made aware that they are custom elements and not Vue components.

In Browser (no bundler):
```js
// Only works if using in-browser compilation.
// If using build tools, see config example.
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('omni-');
```

Config Example (Vite as bundler): 
```js
// vite.config.js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('omni-')
        }
      }
    })
  ]
}
```

Additionally, Vue makes some assumptions regarding property naming, which does not alway apply to custom elements like Omni Components.
Vue expects bound properties to be `kebab-case` named, which means by default `camelCase` named properties will have incorrect bindings.

Use the `:kebab-prop.camel` syntax in order to enforce `camelCase` bindings. See the [`.camel` modifier for `v-bind`](https://vuejs.org/api/built-in-directives.html#v-bind) for more detail.

For example: To bind to a property named `renderItem` with Vue, the property would be bound as `:render-item.camel`.

<br/>

Refer to [Vue and Web Components](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) for additional context on Vue support for custom elements.



## Starter Templates 🔰

To help bootstrap a development project, we offer the following application starter template repositories:

* [HTML Starter](https://github.com/capitec/template-pwa-html) - For HTML-based (plain) SPA development.
* [Lit Starter](https://github.com/capitec/template-pwa-lit) - For [Lit](https://lit.dev)-based SPA development.
* [Vue Starter](https://github.com/capitec/template-pwa-vue) - For [Vue](https://vuejs.org/)-based SPA development.
* [React Starter](https://github.com/capitec/template-pwa-react) - For [React](https://react.dev/)-based SPA development.
