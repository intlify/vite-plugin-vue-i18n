import { isBoolean } from '@intlify/shared'
import path from 'path'
import alias from '@rollup/plugin-alias'
import { build } from 'vite'
import { JSDOM, VirtualConsole } from 'jsdom'
import { pluginI18n } from '../src/index'

async function bundle(fixture: string, options: Record<string, unknown> = {}) {
  const input = (options.input as string) || './fixtures/entry.ts'
  const target = (options.target as string) || './fixtures'
  const include = (options.include as string[]) || []
  const silent = isBoolean(options.silent) ? options.silent : true
  const results = await build({
    emitAssets: false,
    emitIndex: false,
    write: false,
    minify: false,
    silent,
    mode: 'development',
    rollupInputOptions: {
      input: path.resolve(__dirname, input),
      plugins: [
        alias({
          entries: {
            '~target': path.resolve(__dirname, target, fixture)
          }
        })
      ]
    },
    ...pluginI18n({ include })
  })
  return { code: results[0].assets[0].code }
}

export async function bundleAndRun(
  fixture: string,
  options: Record<string, unknown> = {}
) {
  const { code } = await bundle(fixture, options)

  let dom: JSDOM | null = null
  let jsdomError
  try {
    dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {
      runScripts: 'outside-only',
      virtualConsole: new VirtualConsole()
    })
    dom.window.eval(code)
  } catch (e) {
    console.error(`JSDOM error:\n${e.stack}`)
    jsdomError = e
  }

  if (!dom) {
    return Promise.reject(new Error('Cannot assigned JSDOM instance'))
  }

  const { window } = dom
  const { module, exports } = window

  return Promise.resolve({
    window,
    module,
    exports,
    jsdomError
  })
}
