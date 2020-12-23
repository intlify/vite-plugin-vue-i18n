import { debug as Debug } from 'debug'
import { isImportRequest, readBody } from 'vite'

const debug = Debug('vite-plugin-vue-i18n:server')

import type { ServerPlugin } from 'vite'
import type { VitePluginVueI18nOptions } from './options'

export function serverPluginResource(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: VitePluginVueI18nOptions
): ServerPlugin {
  return ({ app }): void => {
    app.use(async (ctx, next) => {
      debug('type before:', ctx.type)
      await next()
      if (
        /\.(json5?|ya?ml)/.test(ctx.path) &&
        isImportRequest(ctx) &&
        ctx.body
      ) {
        const b = await readBody(ctx.body)
        debug('type after:', ctx.type)
        ctx.type = 'js'
        ctx.body = b
      }
    })
  }
}
