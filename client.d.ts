declare module '@intlify/vite-plugin-vue-i18n/messages' {
  import { LocaleMessages } from '@intlify/core-base'
  import { VueMessageType } from 'vue-i18n'
  export interface BundleLocaleMessages
    extends LocaleMessages<VueMessageType> {}
  const messages: BundleLocaleMessages
  export default messages
}
