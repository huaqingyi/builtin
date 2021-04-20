import Layout from '@/layout/index.vue';
import chartsRouter from '@/pages/charts/router';
import toolsRouter from '@/pages/tools/router';
import retentionRouter from '@/pages/retention/router';
import permissionRouter from '@/pages/permission/router';
import { t } from '@/core';

export default [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: t('route.dashboard'),
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
    chartsRouter,
    permissionRouter,
    {
        path: '/preduct-vs-real',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () =>
                    import(
                        /* webpackChunkName: "icons" */ '@/pages/preduct-vs-real/preduct-vs-real.vue'
                    ),
                name: 'Icons',
                meta: {
                    title: t('route.preduct-vs-real'),
                    icon: 'icon',
                    noCache: true,
                    alwaysShow: true // will always show the root menu
                },
            },
        ],
    },
    retentionRouter,
    toolsRouter,
    // {
    //     path: '/editor',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/editor/index.vue'),
    //             // component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/test/index'),
    //             name: 'Dashboard',
    //             meta: {
    //                 title: t('editor.title'),
    //                 icon: 'dashboard',
    //                 affix: true
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/test',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/test/index.vue'),
    //             // component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/test/index'),
    //             name: 'Dashboard',
    //             meta: {
    //                 title: t('route.test'),
    //                 icon: 'dashboard',
    //                 affix: true
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/buitlin',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/buitlin/index.vue'),
    //             // component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/test/index'),
    //             name: 'Dashboard',
    //             meta: {
    //                 title: t('route.buitlin'),
    //                 icon: 'dashboard',
    //                 affix: true
    //             }
    //         }
    //     ]
    // },
    {
        path: '/attrs',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/attrs/index.vue'),
                // component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/test/index'),
                name: 'Dashboard',
                meta: {
                    title: t('route.attrs'),
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
];
