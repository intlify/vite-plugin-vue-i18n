import { debug as Debug } from 'debug'
import { transform } from './transform'

import type { Plugin } from 'vite'
import type { VitePluginVueI18nOptions } from './options'

const debug = Debug('vite-plugin-vue-i18n')

export function pluginI18n(options?: VitePluginVueI18nOptions): Plugin {
  debug('plugin options:', options)

  return {
    name: 'vite-plugin-vue-i18n',
    ...transform(options)
  }
}
