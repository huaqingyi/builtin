import { join } from 'path';
import { DefinePlugin } from 'webpack';
import base from './base';

export default Object.assign({}, base, {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                join(__dirname, '../src/styles/_variables.scss'),
                join(__dirname, '../src/styles/_mixins.scss'),
            ],
        },
    },
    chainWebpack(config) {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        config.set('name', process.env.VUE_PROJECT_NAME);

        // https://webpack.js.org/configuration/devtool/#development
        config.when(process.env.NODE_ENV === 'development', config =>
            config.devtool('cheap-eval-source-map')
        );

        // remove vue-cli-service's progress output
        config.plugins.delete('progress');
        // replace with another progress output plugin to solve the this bug:
        // https://github.com/vuejs/vue-cli/issues/4557
        config
            .plugin('simple-progress-webpack-plugin')
            .use(require.resolve('simple-progress-webpack-plugin'), [{
                format: 'compact',
            },]);

        config.when(process.env.NODE_ENV !== 'development', config => {
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial', // only package third parties that are initially dependent
                    },
                    antd: {
                        name: 'chunk-antd', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
                    },
                    antdIcon: {
                        name: 'chunk-antd-icon', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?@ant-design(.*)/, // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: join(__dirname, '../src/components'),
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            });
            config.optimization.runtimeChunk('single');
        });
    },
    configureWebpack: config => {
        config.plugins.push(
            new DefinePlugin({
                PRODUCTION: process.env.NODE_ENV === 'production' ? true : false,
                // TOKEN: `'这里可以和后端协商免验证的令牌, 用于dev开发模式'`
                LOCAL: `'${process.env.NODE_ENV}'`,
                DEBUGTOKEN: `'${process.env.NODE_ENV === 'development' ? '0LVgVPwwIs60pmAmJy2OrjdooRROKwSO' : ''}'`,
                VUE_APP_API_BASE_URL: `'${process.env.VUE_APP_API_BASE_URL}'`,
            })
        );
    },
});
