import type { UserConfig } from 'vite'
import { pluginI18n } from '@intlify/vite-plugin-vue-i18n'

const config: UserConfig = {
  plugins: [
    pluginI18n()
  ]
}

export default config
