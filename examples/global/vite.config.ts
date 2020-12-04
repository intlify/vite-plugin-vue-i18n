import type { UserConfig } from 'vite'
import i18n from '../../lib/index'

const config: UserConfig = {
  vueCustomBlockTransforms: {
    i18n
  }
}

export default config
