import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale:'jp', //选择默认语言
    messages:{
        ch:require('./ch'),
        en:require('./en'),
        jp:require('./jp'),
    }
})


export default i18n;