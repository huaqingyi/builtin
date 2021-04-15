import { VueConstructor } from 'vue';
import messages, { getLocale } from '@/lang';

export async function usi18ns(Vue: VueConstructor) {
    const VueI18n = (await import('vue-i18n')).default;
    Vue.use(VueI18n);
    const i18n = new VueI18n({
        locale: getLocale(),
        messages,
    })
    Vue.prototype._i18n = i18n;
    return Vue;
}