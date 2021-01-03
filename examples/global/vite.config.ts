import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pluginI18n } from '@intlify/vite-plugin-vue-i18n'

const config: UserConfig = {
  plugins: [
    vue(),
    pluginI18n()
  ]
}

export default config
