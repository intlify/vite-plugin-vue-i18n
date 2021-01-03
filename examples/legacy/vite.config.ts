import path from 'path'
import vue from '@vitejs/plugin-vue'
import { pluginI18n } from '@intlify/vite-plugin-vue-i18n'

import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [
    vue(),
    pluginI18n({
      include: path.resolve(__dirname, './locales/**')
    })
  ]
}

export default config
