import { t } from '@/core';
import Layout from '@/layout/index.vue';

export default {
    path: '/retention',
    component: Layout,
    redirect: 'noredirect',
    name: 'retention',
    meta: {
        title: t('route.retention'),
        icon: 'chart',
    },
    children: [
        {
            path: 'differ',
            name: 'differ',
            meta: { title: t('route.retention-differ') },
            component: () => import('./differ/differ.vue'),
        },
        {
            path: 'optimum',
            name: 'optimum',
            meta: { title: t('route.retention-optimum') },
            component: () => import('./optimum/optimum.vue'),
        },
        {
            path: 'retention-preduction',
            name: 'preduction',
            meta: { title: t('route.retention-preduction') },
            component: () => import('./retention-preduction/retention-preduction.vue'),
        },
    ]
};
