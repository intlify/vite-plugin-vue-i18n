# :globe_with_meridians: @intlify/vite-plugin-vue-i18n

![Test](https://github.com/intlify/vite-plugin-vue-i18n/workflows/Test/badge.svg)
[![npm](https://img.shields.io/npm/v/@intlify/vite-plugin-vue-i18n.svg)](https://www.npmjs.com/package/@intlify/vite-plugin-vue-i18n)

Vite plugin for Vue I18n


## :star: Features
- i18n resources pre-compilation
- i18n custom block
- Static bundle importing
- Bundling optimizations

## :cd: Installation

### NPM

```sh
$ npm i --save-dev @intlify/vite-plugin-vue-i18n
```

### YARN

```sh
$ yarn add -D @intlify/vite-plugin-vue-i18n
```

## :warning: Notice

When this plugin is installed, Vue I18n can only use the Composition API, and if you want to use the Legacy API, you need to set the `compositionOnly` option to `false`.

Also, if you do a production build with vite, Vue I18n will automatically bundle the runtime only module. If you need on-demand compilation with Message compiler, you need to set the `runtimeOnly` option to `false`.

## :rocket: Usage

### i18n resources pre-compilation

Since vue-i18n@v9.0, The locale messages are handled with message compiler, which converts them to javascript functions after compiling. After compiling, message compiler converts them into javascript functions, which can improve the performance of the application.

However, with the message compiler, the javascript function conversion will not work in some environments (e.g. CSP). For this reason, vue-i18n@v9.0 and later offer a full version that includes compiler and runtime, and a runtime only version.

If you are using the runtime version, you will need to compile before importing locale messages by managing them in a file such as `.json`.

#### Vite Config

the below example that `examples/composition/vite.config.ts`:

```ts
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  plugins: [
    vue(), // you need to install `@vitejs/plugin-vue`
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './path/to/src/locales/**')
    })
  ]
})
```

### i18n custom block

the below example that `examples/composition/App.vue` have i18n custom block:

```vue
<template>
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ja">ja</option>
    </select>
  </form>
  <p>{{ t('hello') }}</p>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  setup() {
    const { locale, t } = useI18n({
      inheritLocale: true
    })

    return { locale, t }
  }
}
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
```

### Locale Messages formatting

You can be used by specifying the following format in the `lang` attribute:

- json (default)
- yaml
- json5

example `yaml` foramt:

```vue
<i18n lang="yaml">
en:
  hello: "Hello World!"
ja:
  hello: "こんにちは、世界！"
</i18n>
```

### Static bundle importing

vite-plugin-vue-i18n allows you to statically bundle i18n resources such as `json` or `yaml` specified by the [`include` option](#include) of the plugin described below as locale messages with the `import` syntax.

In this case, only one i18n resource can be statically bundled at a time with `import` syntax, so the these code will be redundant for multiple locales.

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
/*
 * The i18n resources in the path specified in the plugin `include` option can be read
 * as vue-i18n optimized locale messages using the import syntax
 */
import en from './src/locales/en.json'
import ja from './src/locales/ja.yaml'
import fr from './src/locales/fr.json5'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    ja,
    fr
  }
})

const app = createApp()
app.use(i18n).mount('#app)
```

vite-plugin-vue-i18n can use the vite (rollup) mechanism to import all locales at once, using the special identifier `@intlify/vite-plugin-vue-i18n/messages`, as the bellow:

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'en',
  messages
})

const app = createApp()
app.use(i18n).mount('#app)
```

### Client Types

If you want type definition of `@intlify/vite-plugin-vue-i18n/messages`, add `vite-plugin-vue-i18n/client` to `compilerOptions.types` of your tsconfig:

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-vue-i18n/client"]
  }
}
```

### Bundle optimizations

vite-plugin-vue-i18n allows you to support bundle size optimization provided by vue-i18n.

## :package: Automatic Vue I18n bundling

As noted [here](https://vue-i18n.intlify.dev/installation.html#explanation-of-different-builds), NPM provides many different builds of Vue I18n.

vite-plugin-vue-i18n will automatically select and bundle Vue I18n build according to the following vite behavior:

- vite dev: `vue-i18n.esm-bundler.js`
- vite build: `vue-i18n.runtime.esm-bundler.js`

About details, See the [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#improve-performance-and-reduce-bundle-size-with-runtime-build-only)

## :wrench: Options

You can specify options in the plugin option to support bundle size optimization provided by vue-i18n.

The same thing can be [configured](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags) with the `define` option, but the plugin option is more friendly. Especially if you are using typescript, you can use intelisense.

About details, See the below section

### `include`

- **Type:** `string | string[] | undefined`
- **Default:** `undefined`

  A [minimatch](https://github.com/isaacs/minimatch) pattern, or array of patterns, you can specify a path to pre-compile i18n resources files. The extensions of i18n resources to be precompiled are as follows:

  ```
  - json
  - json5
  - yaml
  - yml
  ```

  Note `json` resources matches this option, it will be handled **before the internal json plugin of Vite, and will not be processed afterwards**, else the option doesn't match, the Vite side will handle.

### `runtimeOnly`
- **Type:** `boolean`
- **Default:** `true`

  Whether or not to automatically use Vue I18n **runtime-only** in production build, set in the `vue-i18n` field of Vite `resolve.alias` option.
  If `false` is specified, Vue I18n (vue-i18n) package.json `module` field will be used.

  For more details, See [here](#package-automatic-vue-i18n-bundling)

### `compositionOnly`

- **Type:** `boolean`
- **Default:** `true`

  Whether to make vue-i18n's API only composition API. **By default the legacy API is tree-shaken.**

  For more details, See [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

### `fullInstall`

- **Type:** `boolean`
- **Default:** `true`

  Whether to install the full set of APIs, components, etc. provided by Vue I18n. By default, all of them will be installed.

  If `false` is specified, **buld-in components and directive will not be installed in vue and will be tree-shaken.**

  For more details, See [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

### `forceStringify`

- **Type:** `boolean`
- **Default:** `false`

  Whether pre-compile number and boolean values as message functions that return the string value.

  for example, the following json resources:

  ```json
  {
    "trueValue": true,
    "falseValue": false,
    "nullValue": null,
    "numberValue": 1
  }
  ```

  after pre-compiled (development):

  ```js
  export default {
    "trueValue": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["true"])};fn.source="true";return fn;})(),
    "falseValue": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["false"])};fn.source="false";return fn;})(),
    "nullValue": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["null"])};fn.source="null";return fn;})(),
    "numberValue": (()=>{const fn=(ctx) => {const { normalize: _normalize } = ctx;return _normalize(["1"])};fn.source="1";return fn;})()
  }
  ```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/intlify/vite-plugin-vue-i18n/blob/master/CHANGELOG.md).


## :exclamation: Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/inlitify/vite-plugin-vue-i18n/blob/master/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
