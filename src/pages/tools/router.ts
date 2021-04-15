import { t } from '@/core';
import Layout from '@/layout/index.vue';

export default {
    path: '/tools',
    component: Layout,
    redirect: 'noRedirect',
    name: 'tool',
    meta: {
        title: t('route.tools'),
        icon: 'hamburger',
    },
    children: [
        {
            path: 'calc',
            name: 'calc',
            meta: { title: t('route.tools-calc') },
            component: () => import('./calc/calc.vue'),
        },
        {
            path: 'dau',
            name: 'dau',
            meta: { title: t('route.tools-dau') },
            component: () => import('./dau/dau.vue'),
        },
    ],
};
