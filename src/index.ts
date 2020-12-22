import { isEmptyObject, isString } from '@intlify/shared'
import { generateJSON, generateYAML } from './generator'
import { debug as Debug } from 'debug'

import type { CodeGenOptions, DevEnv } from './generator/codegen'
import type { Transform } from 'vite'
import type { TransformContext } from 'vite/dist/node/transform'

const debug = Debug('vite-plugin-vue-i18n')

export type VitePluginVueI18nOptions = {
  forceStringify?: boolean
}
type TransformFn = Transform['transform']

function transformI18n(
  options: VitePluginVueI18nOptions = { forceStringify: false }
): TransformFn {
  return (context: TransformContext) => {
    const { path, code: source, query } = context
    debug('vueSFCTransform: path', path)
    debug('vueSFCTransform: query', JSON.stringify(query))

    const parseOptions = getOptions(
      context,
      options.forceStringify
    ) as CodeGenOptions
    const langInfo = !isEmptyObject(query)
      ? isString(query.lang)
        ? query.lang
        : 'json'
      : 'json'

    const generate = /json5?/.test(langInfo) ? generateJSON : generateYAML
    const { code } = generate(source, parseOptions)
    // console.log('code', code)

    // TODO: error handling
    return new Promise<string>(resolve => {
      resolve(code)
    })
  }
}

function getOptions(
  context: TransformContext,
  forceStringify = false
): Record<string, unknown> {
  const { path: filename, query, isBuild } = context
  const mode: DevEnv = isBuild ? 'production' : 'development'

  const baseOptions = {
    filename,
    forceStringify,
    env: mode as DevEnv,
    onWarn: (msg: string): void => {
      console.warn(`[vite-plugin-vue-i18n]: ${filename} ${msg}`)
    },
    onError: (msg: string): void => {
      console.error(`[vite-plugin-vue-i18n]: ${filename} ${msg}`)
    }
  }

  if (!isEmptyObject(query)) {
    return Object.assign(baseOptions, {
      type: 'sfc',
      locale: isString(query.locale) ? query.locale : '',
      isGlobal: query.global != null
    })
  } else {
    return Object.assign(baseOptions, {
      type: 'plain',
      isGlobal: false
    })
  }
}

export { transformI18n }
