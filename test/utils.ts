import path from 'path'
import alias from '@rollup/plugin-alias'
import { build } from 'vite'
import { JSDOM, VirtualConsole } from 'jsdom'
import { transformI18n } from '../src/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function bundle(fixture: string, options: Record<string, unknown> = {}) {
  const results = await build({
    emitAssets: false,
    emitIndex: false,
    write: false,
    minify: false,
    silent: true,
    rollupInputOptions: {
      input: path.resolve(__dirname, './fixtures/entry.ts'),
      plugins: [
        alias({
          entries: {
            '~target': path.resolve(__dirname, './fixtures', fixture)
          }
        })
      ]
    },
    vueCustomBlockTransforms: {
      i18n: transformI18n()
    }
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
