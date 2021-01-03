# :globe_with_meridians: @intlify/vite-plugin-vue-i18n

![Test](https://github.com/intlify/vite-plugin-vue-i18n/workflows/Test/badge.svg)
[![npm](https://img.shields.io/npm/v/@intlify/vite-plugin-vue-i18n.svg)](https://www.npmjs.com/package/@intlify/vite-plugin-vue-i18n)

Vite plugin for i18n resource pre-compilation and custom blocks

## :cd: Installation

### NPM

```sh
$ npm i --save-dev @intlify/vite-plugin-vue-i18n
```

### YARN

```sh
$ yarn add -D @intlify/vite-plugin-vue-i18n
```

## :rocket: Usages

### i18n resource pre-compilation

Since vue-i18n@v9.0, The locale messages are handled with message compiler, which converts them to javascript functions after compiling. After compiling, message compiler converts them into javascript functions, which can improve the performance of the application.

However, with the message compiler, the javascript function conversion will not work in some environments (e.g. CSP). For this reason, vue-i18n@v9.0 and later offer a full version that includes compiler and runtime, and a runtime only version.

If you are using the runtime version, you will need to compile before importing locale messages by managing them in a file such as `.json`.

#### Vite Config

the below example that `examples/composition/vite.config.ts`:

```ts
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { pluginI18n } from '@intlify/vite-plugin-vue-i18n'

import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
    vue(), // you need to install `@vitejs/plugin-vue`
    pluginI18n({
      // you need to set i18n resource including paths !
      include: path.resolve(__dirname, './path/to/src/locales/**')
    })
  ]
}

export default config
```

### `i18n` custom block

the below example that `examples/composition/App.vue` have `i18n` custom block:

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

### `forceStringify` options

Whether pre-compile number and boolean values as message functions that return the string value, default `false`

```ts
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { pluginI18n } from '@intlify/vite-plugin-vue-i18n'

import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
    vue(),
    pluginI18n({
      forceStringify: true,
      include: path.resolve(__dirname, './path/to/src/locales/**')
    })
  ]
}

export default config
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/intlify/vite-plugin-vue-i18n/blob/master/CHANGELOG.md).


## :exclamation: Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/inlitify/vite-plugin-vue-i18n/blob/master/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
