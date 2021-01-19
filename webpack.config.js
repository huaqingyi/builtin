const path = require("path");
const webpack = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => ({
    mode: env.prod ? "production" : "development",
    devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",
    entry: [
        'webpack-hot-middleware/client?noInfo=true&reload=true',
        path.resolve(__dirname, "./src/main.ts")
    ].filter(Boolean),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
    },
    resolve: {
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            vue: "@vue/runtime-dom"
        },
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/.vue$/],
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
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
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        ...env.prod ? [new webpack.HotModuleReplacementPlugin()] : [],
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject: 'body',
            // title: ''
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            inject: 'body',
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: "minimal",
        contentBase: __dirname,
        overlay: true,
        injectClient: false,
        disableHostCheck: true
    }
});