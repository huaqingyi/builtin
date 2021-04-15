import { t } from '@/core';
import Layout from '@/layout/index.vue';

export default {
    path: '/permission',
    component: Layout,
    redirect: '/permission/directive',
    meta: {
        title: t('route.permission'),
        icon: 'lock',
        roles: ['admin', 'editor'], // you can set roles in root nav
        alwaysShow: true // will always show the root menu
    },
    children: [
        {
            path: 'page',
            component: () => import(/* webpackChunkName: "permission-page" */ '@/pages/permission/page.vue'),
            name: 'PagePermission',
            meta: {
                title: t('route.pagePermission'),
                roles: ['admin'] // or you can only set roles in sub nav
            }
        },
        {
            path: 'directive',
            component: () => import(/* webpackChunkName: "permission-directive" */ '@/pages/permission/directive.vue'),
            name: 'DirectivePermission',
            meta: {
                title: t('route.directivePermission'),
                // if do not set roles, means: this page does not require permission
            }
        },
        {
            path: 'role',
            component: () => import(/* webpackChunkName: "permission-role" */ '@/pages/permission/role.vue'),
            name: 'RolePermission',
            meta: {
                title: t('route.rolePermission'),
            }
        }
    ]
};
