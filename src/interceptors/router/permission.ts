import Vue from 'vue';
import { Route, RawLocation, RouteConfig } from 'vue-router';
import NProgress from 'nprogress';
import { map } from 'lodash';
import { PermissionModule } from '@/store/modules/permission';
import { Message } from 'element-ui';
import { resetRouter } from '@/router';

export enum PermissionErrorType {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
    DONE = 'done',
}

export default class {
    constructor(
        private to: Route,
        private from: Route,
        private next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void,
    ) { }

    public async actionPermission(): Promise<PermissionErrorType> {
        // if (location.href.indexOf('code=') !== -1) location.href = '/';
        if (true === await PermissionModule.isLogin()) {
            try {
                if (PermissionModule.roles.length === 0) {
                    await PermissionModule.getRoles();
                    const roles = PermissionModule.roles;
                    PermissionModule.generateRoutes(roles);
                    await resetRouter();
                    Vue.prototype._router.addRoutes(PermissionModule.dynamicRoutes);
                    // this.next({ ...(this.to as any), replace: true });
                    // console.log({ ...PermissionModule.dynamicRoutes[0] });
                    // console.log({ ...PermissionModule.dynamicRoutes[0], replace: true });
                    this.next({ ...(this.to as any), replace: true });
                    return await PermissionErrorType.DONE;
                } else {
                    return await PermissionErrorType.SUCCESS;
                }
            } catch (err) {
                // Remove token and redirect to login page
                PermissionModule.resetToken('', '');
                Message.error(err || '权限验证出错 .');
                return PermissionErrorType.ERROR;
            }
        } else {
            return await PermissionErrorType.FAIL;
        }
    }

    public async restPermission() {
        await this.next();
        return true;
    }

    public async notPermission() {
        // await this.next(`/401`) // 否则全部重定向到登录页
        await this.next();
        await NProgress.done();
    }

    public async errorPermission() {
        // await this.next(`/404`) // 否则全部重定向到登录页
        await this.next();
        await NProgress.done();
    }

    public async hasPermission(roles: string[], route: RouteConfig) {
        if (route.meta && route.meta.roles) {
            return roles.some(role => route.meta.roles.includes(role));
        } else {
            return true;
        }
    }

    public async filterAsyncRoutes(
        routes: RouteConfig[], roles: string[]
    ): Promise<RouteConfig[]> {
        const res: RouteConfig[] = [];
        await Promise.all(map(routes, async route => {
            const r = { ...route }
            if (this.hasPermission(roles, r)) {
                if (r.children) {
                    r.children = await this.filterAsyncRoutes(r.children, roles);
                }
                res.push(r);
            }
            return await route;
        }));
        return res;
    }
}
