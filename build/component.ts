import { join } from 'path';
import { readdirSync } from 'fs';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const packages: any = {};
const pngs: any[] = [];

readdirSync(join(__dirname, '../components')).forEach((p: string) => {
    packages[p] = join(__dirname, '../components', p, 'index.ts');
    pngs.push({
        from: join(__dirname, '../components', p, 'cover.png'), to: join(__dirname, '../packages', p, 'cover.png'),
    });
    pngs.push({
        from: join(__dirname, '../components', p, 'config.ts'), to: join(__dirname, '../packages', p, 'config.ts'),
    });
});

export default (env: any = {}): Configuration => ({
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
    entry: packages,
    output: {
        path: join(__dirname, '../packages'),
        filename: '[name]/index.js',
        publicPath: '../'
    },
    resolve: {
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            vue: '@vue/runtime-dom',
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/.vue$/],
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: { limit: 8192 }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: !env.prod }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin(pngs),
    ],
});
