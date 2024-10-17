// Plugins
import vuetify from './vuetify'
import router from '../router'
import languageConfig from './i18n';

// Types
import type {App} from 'vue'

export function registerPlugins(app: App) {
    app
        .use(languageConfig.i18n)
        .use(vuetify)
        .use(router)
}
