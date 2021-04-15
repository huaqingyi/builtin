import NProgress from 'nprogress';
import VueRouter, { Route } from 'vue-router';
import Auth, { PermissionErrorType } from './permission';
import { isFunction } from 'lodash';
import { PermissionModule } from '@/store/modules/permission';
import settings from '@/config/settings';
import Vue from 'vue';

export function getPageTitle(key: string) {
    const hasKey = Vue.prototype._i18n.te(`route.${key}`);
    if (hasKey) {
        const pageName = Vue.prototype._i18n.t(`route.${key}`);
        return `${pageName} - ${settings.title}`;
    }
    return `${settings.title}`;
};

export default async function (router: VueRouter) {
    NProgress.configure({ showSpinner: false });
    router.beforeEach(async (to: Route, _: Route, next: any) => {
        // Start progress bar
        NProgress.start();
        console.log(to.path);
        const auth = new Auth(to, _, next);
        const permission = await auth.actionPermission();
        switch (permission) {
            case PermissionErrorType.SUCCESS:
                if (auth.restPermission && isFunction(auth.restPermission))
                    return auth.restPermission();
                else return next();
            case PermissionErrorType.FAIL:
                if (auth.notPermission && isFunction(auth.notPermission))
                    return auth.notPermission();
                else return next(`/401?redirect=${PermissionModule.dynamicRoutes[0].path}`);
            case PermissionErrorType.ERROR:
                if (auth.errorPermission && isFunction(auth.errorPermission))
                    return auth.errorPermission();
                else return next(`/404?redirect=${PermissionModule.dynamicRoutes[0].path}`);
            case PermissionErrorType.DONE: return await false;
            default: return auth.notPermission();
        }
    });
    return router;
}
