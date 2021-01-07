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
      // store config
      config = _config

      // json transform handling
      const jsonPlugin = config.plugins.find(p => p.name === 'json')
      if (jsonPlugin) {
        const orgTransform = jsonPlugin.transform // backup @rollup/plugin-json
        jsonPlugin.transform = async function (code: string, id: string) {
          if (!/\.json$/.test(id)) {
            return null
          }
          if (filter(id)) {
            const map = this.getCombinedSourcemap()
            debug('override json plugin', code, map)
            return Promise.resolve({
              code,
              map
            })
          } else {
            debug('org json plugin')
            return orgTransform!.apply(this, [code, id])
          }
        }
      }
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
            map: (sourceMap ? map : { mappings: '' }) as any
          })
        } else {
          return Promise.resolve({
            code,
            map: sourceMap ? this.getCombinedSourcemap() : { mappings: '' }
          })
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
            map: (sourceMap ? map : { mappings: '' }) as any
          })
        } else {
          return Promise.resolve({
            code,
            map: sourceMap ? this.getCombinedSourcemap() : { mappings: '' }
          })
        }
      }
    }
  }
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
