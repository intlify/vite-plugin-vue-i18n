import type { UserConfig } from 'vite'
import { transformI18n } from '@intlify/vite-plugin-vue-i18n'

const config: UserConfig = {
  vueCustomBlockTransforms: {
    i18n: transformI18n()
  }
}

export default config
