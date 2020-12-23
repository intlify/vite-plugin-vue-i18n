import path from 'path'
import { isEmptyObject, isString } from '@intlify/shared'
import { createFilter } from '@rollup/pluginutils'
import { generateJSON, generateYAML } from './generator'
import { debug as Debug } from 'debug'

import type { Transform } from 'vite'
import type { TransformContext } from 'vite/dist/node/transform'
import type { CodeGenOptions, DevEnv } from './generator/codegen'
import type { VitePluginVueI18nOptions } from './options'

const debug = Debug('vite-plugin-vue-i18n:transform')

type TransformFn = Transform['transform']

function transform(
  options: VitePluginVueI18nOptions = { forceStringify: false }
): TransformFn {
  return (ctx: TransformContext) => {
    const { path: _path, code: source, query } = ctx
    debug('transform: path', _path)
    debug('transform: query', JSON.stringify(query))

    const parseOptions = getOptions(
      ctx,
      options.forceStringify
    ) as CodeGenOptions
    const langInfo = isCustomBlock(ctx)
      ? isString(query.lang)
        ? query.lang
        : 'json'
      : path.parse(_path).ext

    debug('langInfo', langInfo)
    const generate = /json5?/.test(langInfo) ? generateJSON : generateYAML
    const { code } = generate(source, parseOptions)
    debug('code', code)

    // TODO: error handling
    return new Promise<string>(resolve => {
      resolve(code)
    })
  }
}

function transformResource(options: VitePluginVueI18nOptions = {}): Transform {
  const filter = createFilter(options.include)
  const _transform: Transform = {
    test: ({ id, path, query }): boolean => {
      debug('test id:', id)
      debug('test path:', path)
      debug('test query:', query)
      return /\.(json5|ya?ml)$/.test(path) && filter(path)
    },
    transform: transform(options)
  }

  return _transform
}

function isCustomBlock({ query }: TransformContext): boolean {
  // NOTE: should be more improvement. difference query type and blocktype in some environment ...
  return (
    !isEmptyObject(query) &&
    (query['type'] === 'custom' ||
      query['type'] === 'i18n' ||
      query['blockType'] === 'i18n')
  )
}

function getOptions(
  ctx: TransformContext,
  forceStringify = false
): Record<string, unknown> {
  const { path: filename, query, isBuild } = ctx
  const mode: DevEnv = isBuild ? 'production' : 'development'
  debug('getOptions', ctx)

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

  if (isCustomBlock(ctx)) {
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

export { transform as transformCustomBlock, transformResource }
