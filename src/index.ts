import { friendlyJSONstringify } from 'vue-i18n'
import yaml from 'js-yaml'
import JSON5 from 'json5'

import { debug as Debug } from 'debug'
const debug = Debug('vite-plugin-vue-i18n')

type Query = Record<string, string>

export default function i18n(source: string, query: Query) {
  debug('vueSFCTransform: query', JSON.stringify(query))

  return new Promise<string>(resolve => {
    const code = `export default Comp => {
  Comp.__i18n = Comp.__i18n || []
  Comp.__i18n.push(${stringify(parse(source.trim(), query), query)})
}`.trim()
    resolve(code)
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
      return yaml.safeLoad(value)
    case 'json5':
      return JSON5.parse(value)
    default:
      return JSON.parse(value)
  }
}
