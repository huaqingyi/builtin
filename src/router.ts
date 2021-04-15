import Layout from '@/layout/index.vue';
import { RouteConfig } from 'vue-router';
import Router from 'vue-router';
import Vue from 'vue';

const routes: RouteConfig[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import(/* webpackChunkName: "redirect" */ '@/pages/redirect/index.vue')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/pages/error-page/404.vue'),
        meta: { hidden: true },
    },
    {
        path: '/401',
        component: () => import('@/pages/error-page/401.vue'),
        meta: { hidden: true },
    },
    {
        path: '*',
        component: () => import('@/pages/error-page/404.vue'),
        meta: { hidden: true },
    },
];

export function createRouter() {
    return new Router({
        mode: 'history', routes, base: process.env.BASE_URL,
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
    });
}

export function resetRouter() {
    const newRouter = createRouter();
    Vue.prototype._router.matcher = (newRouter as any).matcher // reset router
}

export default routes;
