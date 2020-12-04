import { friendlyJSONstringify } from 'vue-i18n'
import yaml from 'js-yaml'
import JSON5 from 'json5'
import type { Transform } from 'vite'

import { debug as Debug } from 'debug'
const debug = Debug('vite-plugin-vue-i18n')

type Query = Record<string, string | string[] | undefined>
type TransformFn = Transform['transform']

const i18n: TransformFn = function ({ code, query }) {
  debug('vueSFCTransform: query', JSON.stringify(query))

  return new Promise<string>(resolve => {
    const variableName = query.global ? '__i18nGlobal' : '__i18n'
    const result = `export default Comp => {
  Comp.${variableName} = Comp.${variableName} || []
  Comp.${variableName}.push(${stringify(parse(code.trim(), query), query)})
}`.trim()
    resolve(result)
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringify(data: any, query: Query): string {
  const { locale } = query
  if (locale) {
    return friendlyJSONstringify(
      Object.assign({}, { [locale as string]: data })
    )
  } else {
    return friendlyJSONstringify(data)
  }
}

function parse(source: string, query: Query): string {
  const value = source.trim()
  const { lang } = query
  switch (lang) {
    case 'yaml':
    case 'yml':
      return yaml.safeLoad(value) as string
    case 'json5':
      return JSON5.parse(value)
    default:
      return JSON.parse(value)
  }
}

export default i18n
