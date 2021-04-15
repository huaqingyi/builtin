import { t } from '@/core';
import Layout from '@/layout/index.vue';

export default {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
        title: t('route.charts'),
        icon: 'chart'
    },
    children: [
        {
            path: 'bar-chart',
            component: () => import(/* webpackChunkName: "bar-chart" */ '@/pages/charts/bar-chart.vue'),
            name: 'BarChartDemo',
            meta: {
                title: t('route.barChart'),
                noCache: true
            }
        },
        {
            path: 'line-chart',
            component: () => import(/* webpackChunkName: "line-chart" */ '@/pages/charts/line-chart.vue'),
            name: 'LineChartDemo',
            meta: {
                title: t('route.lineChart'),
                noCache: true
            }
        },
        {
            path: 'mixed-chart',
            component: () => import(/* webpackChunkName: "mixed-chart" */ '@/pages/charts/mixed-chart.vue'),
            name: 'MixedChartDemo',
            meta: {
                title: t('route.mixedChart'),
                noCache: true
            }
        }
    ]
};