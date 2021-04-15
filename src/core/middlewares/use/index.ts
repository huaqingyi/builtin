
import { VueConstructor } from 'vue';

export * from './i18n';
export * from './router';

export async function ueimports(Vue: VueConstructor) {
    const VXETable = (await import('vxe-table')).default;
    const ElementUI = (await import('element-ui')).default;
    const { AppModule } = await import('@/store/modules/app');
    const SvgIcon = (await import('vue-svgicon')).default;

    Vue.use(VXETable);

    Vue.use(ElementUI, {
        size: AppModule.size, // Set element-ui default size
        i18n: (key: string, value: string) => Vue.prototype._i18n.t(key, value),
    });

    Vue.use(SvgIcon, {
        tagName: 'svg-icon',
        defaultWidth: '1em',
        defaultHeight: '1em',
    });

    return Vue;
}