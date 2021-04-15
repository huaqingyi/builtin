import { VueConstructor } from 'vue';

export async function ueprototypes(Vue: VueConstructor) {
    const Router = (await import('vue-router')).default;
    const Axios = (await import('axios')).default;
    const { httpConfig } = await import('@/config/http');
    const { Service } = await import('@/core');
    const VXETable = (await import('vxe-table')).default;
    const { checkPermission } = await import('@/utils/permission');
    const interceptor = (await import('@/interceptors/request')).default;

    const http = interceptor(Axios.create(httpConfig));
    Vue.prototype.$http = http;
    Service.prototype.http = http;

    const routerPush = Router.prototype.push;
    Router.prototype.push = function push(location: any) {
        return (routerPush.call(this, location) as any).catch(
            (error: any) => error
        );
    };
    Vue.prototype.$modal = VXETable.modal;
    Vue.prototype.checkPermission = checkPermission;
    return Vue;
}