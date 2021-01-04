import { promises as fs } from 'fs'
import path from 'path'
import { isEmptyObject, isString } from '@intlify/shared'
import { createFilter } from '@rollup/pluginutils'
import { generateJSON, generateYAML } from '@intlify/cli'
import { SourceMapGenerator, SourceMapConsumer, RawSourceMap } from 'source-map'
import { debug as Debug } from 'debug'
import { parseVueRequest } from './query'

import type { Plugin, ResolvedConfig } from 'vite'
import type { CodeGenOptions, DevEnv } from '@intlify/cli'
import type { VitePluginVueI18nOptions } from './options'

const debug = Debug('vite-plugin-vue-i18n')

export function pluginI18n(
  options: VitePluginVueI18nOptions = { forceStringify: false }
): Plugin {
  debug('plugin options:', options)

  const forceStringify = !!options.forceStringify
  const filter = createFilter(options.include)
  let config: ResolvedConfig | null = null

  return {
    name: 'vite-plugin-vue-i18n',

    configResolved(_config: ResolvedConfig) {
      config = _config
      debug('configResolved', config)
    },

    async transform(code: string, id: string) {
      const { filename, query } = parseVueRequest(id)
      debug('transform', id, JSON.stringify(query))
      const sourceMap =
        config != null
          ? config.isProduction
            ? isString(config.build.sourcemap)
              ? true
              : config.build.sourcemap
            : true
          : false
      let inSourceMap: RawSourceMap | undefined
      debug('sourcemap', sourceMap, id)

      let langInfo = 'json'
      if (!query.vue) {
        if (/\.(json5?|ya?ml)$/.test(id) && filter(id)) {
          if (sourceMap) {
            const map = this.getCombinedSourcemap()
            console.log(map)
            inSourceMap = (map as unknown) as RawSourceMap
          }
          langInfo = path.parse(filename).ext
          // NOTE:
          // `.json` is handled default in vite, and it's transformed to JS object.
          let _source = code
          if (langInfo === '.json') {
            _source = await getRawJSON(id)
            console.log('raw json', _source)
          }

          const generate = /\.?json5?/.test(langInfo)
            ? generateJSON
            : generateYAML

          const parseOptions = getOptions(
            filename,
            config != null ? config.isProduction : false,
            query as Record<string, unknown>,
            sourceMap,
            inSourceMap,
            forceStringify
          ) as CodeGenOptions
          debug('parseOptions', parseOptions)

          const { code: generatedCode, map } = generate(_source, parseOptions)
          debug('generated', map)

          // TODO: error handling & sourcempa
          return Promise.resolve({
            code: generatedCode,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map: (sourceMap ? map : inSourceMap) as any
          })
        } else {
          return Promise.resolve(code)
        }
      } else {
        // for Vue SFC
        if (isCustomBlock(query as Record<string, unknown>)) {
          if (sourceMap) {
            const map = this.getCombinedSourcemap()
            console.log(map)
            // const s = new SourceMapConsumer((map as any).toJSON())
            // const s = new SourceMapConsumer(map as any)
            // s.eachMapping(m => {
            //   console.log('sourcemap json', m)
            // })
            inSourceMap = (map as unknown) as RawSourceMap
          }

          if ('src' in query) {
            if (isString(query.lang)) {
              langInfo = query.lang === 'i18n' ? 'json' : query.lang
            }
          } else {
            if (isString(query.lang)) {
              langInfo = query.lang
            }
          }

          const generate = /\.?json5?/.test(langInfo)
            ? generateJSON
            : generateYAML

          const parseOptions = getOptions(
            filename,
            config != null ? config.isProduction : false,
            query as Record<string, unknown>,
            sourceMap,
            inSourceMap,
            forceStringify
          ) as CodeGenOptions
          debug('parseOptions', parseOptions)

          const { code: generatedCode, map } = generate(code, parseOptions)
          debug('generated', map)

          // TODO: error handling & sourcempa
          return Promise.resolve({
            code: generatedCode,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map: (sourceMap ? map : inSourceMap) as any
          })
        } else {
          return Promise.resolve(code)
        }
      }
    }
  }
}

async function getRawJSON(path: string): Promise<string> {
  return fs.readFile(path, { encoding: 'utf-8' })
}

function isCustomBlock(query: Record<string, unknown>): boolean {
  // NOTE: should be more improvement. difference query type and blocktype in some environment ...
  return (
    !isEmptyObject(query) &&
    'vue' in query &&
    (query['type'] === 'custom' ||
      query['type'] === 'i18n' ||
      query['blockType'] === 'i18n')
  )
}

function getOptions(
  filename: string,
  isProduction: boolean,
  query: Record<string, unknown>,
  sourceMap: boolean,
  inSourceMap: RawSourceMap | undefined,
  forceStringify: boolean
): Record<string, unknown> {
  const mode: DevEnv = isProduction ? 'production' : 'production'

  const baseOptions = {
    filename,
    sourceMap,
    inSourceMap,
    forceStringify,
    env: mode,
    onWarn: (msg: string): void => {
      console.warn(`[vite-plugin-vue-i18n]: ${filename} ${msg}`)
    },
    onError: (msg: string): void => {
      console.error(`[vite-plugin-vue-i18n]: ${filename} ${msg}`)
    }
  }

  if (isCustomBlock(query)) {
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
