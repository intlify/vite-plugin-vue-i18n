;(async () => {
  try {
    await import('vue-i18n')
  } catch (e) {
    throw new Error(
      '@intlify/vite-plugin-vue-i18n requires vue-i18n to be present in the dependency tree.'
    )
  }
})()

import { promises as fs } from 'fs'
import path from 'path'
import { isBoolean, isEmptyObject, isString } from '@intlify/shared'
import { createFilter } from '@rollup/pluginutils'
import { generateJSON, generateYAML } from '@intlify/cli'
import { debug as Debug } from 'debug'
import { parseVueRequest } from './query'

import type { Plugin, ResolvedConfig } from 'vite'
import type { CodeGenOptions, DevEnv } from '@intlify/cli'
import type { VitePluginVueI18nOptions } from './options'

const debug = Debug('vite-plugin-vue-i18n')

function pluginI18n(
  options: VitePluginVueI18nOptions = { forceStringify: false }
): Plugin {
  debug('plugin options:', options)

  const filter = createFilter(options.include)
  const runtimeOnly = isBoolean(options.runtimeOnly)
    ? options.runtimeOnly
    : true
  const compositionOnly = isBoolean(options.compositionOnly)
    ? options.compositionOnly
    : true
  const fullIinstall = isBoolean(options.fullInstall)
    ? options.fullInstall
    : true
  let config: ResolvedConfig | null = null

  return {
    name: 'vite-plugin-vue-i18n',

    config() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const partialConfig: any = { define: {}, alias: {} }

      if (runtimeOnly) {
        partialConfig.alias['vue-i18n'] =
          'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
        debug('set vue-i18n alias')
      }

      if (compositionOnly) {
        partialConfig.define['__VUE_I18N_LEGACY_API__'] = false
        debug('set __VUE_I18N_LEGACY_API__ is `false`')
      }
      if (!fullIinstall) {
        partialConfig.define['__VUE_I18N_FULL_INSTALL__'] = false
        debug('set __VUE_I18N_FULL_INSTALL__ is `false`')
      }

      return partialConfig
    },

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

      const parseOptions = getOptions(
        filename,
        config != null ? config.isProduction : false,
        query as Record<string, unknown>,
        options.forceStringify
      ) as CodeGenOptions
      debug('parseOptions', parseOptions)

      let langInfo = 'json'
      if (!query.vue) {
        if (/\.(json5?|ya?ml)$/.test(id) && filter(id)) {
          langInfo = path.parse(filename).ext
          // NOTE:
          // `.json` is handled default in vite, and it's transformed to JS object.
          let _source = code
          if (langInfo === '.json') {
            _source = await getRawJSON(id)
          }
          const generate = /\.?json5?/.test(langInfo)
            ? generateJSON
            : generateYAML
          const { code: generatedCode } = generate(_source, parseOptions)
          debug('generated code', generatedCode)
          // TODO: error handling & sourcempa
          return Promise.resolve(generatedCode)
        } else {
          return Promise.resolve(code)
        }
      } else {
        // for Vue SFC
        if (isCustomBlock(query as Record<string, unknown>)) {
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
          const { code: generatedCode } = generate(code, parseOptions)
          debug('generated code', generatedCode)
          // TODO: error handling & sourcempa
          return Promise.resolve(generatedCode)
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
  forceStringify = false
): Record<string, unknown> {
  const mode: DevEnv = isProduction ? 'production' : 'production'

  const baseOptions = {
    filename,
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

// overwrite for cjs require('...')() usage
export default pluginI18n
export const vueI18n = pluginI18n
