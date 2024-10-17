import {createVueI18nAdapter} from 'vuetify/locale/adapters/vue-i18n'
import {createI18n, useI18n} from 'vue-i18n'

// Translations provided by Vuetify
import {en, zhHans} from 'vuetify/locale';

import en_US from '@/../public/language/en_US.json'
import zh_CN from '@/../public/language/zh_CN.json'
import {lang, storage} from "@/assets/js";

let langData = storage.get('lang');
let currLang = lang.default;

if (langData.code == 0) currLang = langData.data.value;

const messages = {
    'zh-CN': Object.assign({$vuetify: zhHans}, zh_CN),
    'en-US': Object.assign({$vuetify: en}, en_US)
};
const i18n = new createI18n({
    legacy: false,
    locale: currLang,
    fallbackLocale: 'zh-CN',
    messages,
})

export default {
    i18n,
    locale: {
        adapter: createVueI18nAdapter({i18n, useI18n}),
    }
}
