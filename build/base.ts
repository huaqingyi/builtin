import { join } from 'path';
import { cpus } from 'os';

export default {
    lintOnSave: false,
    productionSourceMap: false,
    pwa: {
        name: process.env.VUE_PROJECT_NAME,
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: join(__dirname, '../src/core/middlewares/pwa/service-worker.js')
        }
    },
    parallel: cpus().length > 1,
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};
