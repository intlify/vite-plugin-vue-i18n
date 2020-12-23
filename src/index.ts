import { debug as Debug } from 'debug'
import { transformCustomBlock, transformResource } from './transform'
import { serverPluginResource } from './server'

import type { Plugin } from 'vite'
import type { VitePluginVueI18nOptions } from './options'

const debug = Debug('vite-plugin-vue-i18n')

export function pluginI18n(options?: VitePluginVueI18nOptions): Plugin {
  debug('plugin options:', options)

  return {
    vueCustomBlockTransforms: {
      i18n: transformCustomBlock(options)
    },
    transforms: [transformResource(options)],
    configureServer: [serverPluginResource(options)]
  }
}
