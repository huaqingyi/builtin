// import { join } from 'path';
// import { readdirSync } from 'fs';
// import { VueLoaderPlugin } from 'vue-loader';
// import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
// import { Configuration, DefinePlugin, LoaderOptionsPlugin } from 'webpack';

// const packages: any = {};
// const pngs: any[] = [];

// readdirSync(join(__dirname, '../components')).forEach((p: string) => {
//     packages[p] = join(__dirname, '../components', p, 'index.ts');
//     pngs.push({
//         from: join(__dirname, '../components', p, 'cover.png'), to: join(__dirname, '../packages', p, 'cover.png'),
//     });
// });

// export default (env: any = {}): Configuration => ({
//     mode: 'production',
//     devtool: 'source-map',
//     entry: packages,
//     output: {
//         path: join(__dirname, '../packages'),
//         publicPath: '../',
//         filename: '[name]/index.js',
//         // library 指定的是引入项目的模块名
//         // library: 'index', 
//         // libraryTarget 会生成不同 umd 的代码,可以只是 commonjs 标准的
//         // 也可以是指amd标准的，也可以只是通过 script 标签引入的（必须加上）
//         libraryTarget: 'commonjs',
//         // 会对 UMD 的构建过程中的 AMD 模块进行命名
//         // 否则就使用匿名的 define（必须加上）
//         umdNamedDefine: true, 
//     },
//     resolve: {
//         alias: { 'vue$': 'vue/dist/vue.esm.js' },
//         extensions: ['*', '.js', '.vue', '.json', '.ts', '.tsx'],
//     },
//     performance: {
//         hints: false
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [ 'vue-style-loader', 'css-loader' ],
//             },
//             {
//                 test: /\.scss$/,
//                 use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ],
//             },
//             {
//                 test: /\.sass$/,
//                 use: [ 'vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax' ],
//             },
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader',
//                 options: {
//                     loaders: {
//                         // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
//                         // the 'scss' and 'sass' values for the lang attribute to the right configs here.
//                         // other preprocessors should work out of the box, no loader config like this necessary.
//                         'scss': [ 'vue-style-loader', 'css-loader', 'sass-loader' ],
//                         'sass': [ 'vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax' ],
//                     }
//                     // other vue-loader options go here
//                 }
//             },
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.ts$/,
//                 exclude: /node_modules/,
//                 enforce: 'pre',
//                 loader: 'tslint-loader',
//             },
//             {
//                 test: /\.tsx?$/,
//                 loader: 'ts-loader',
//                 exclude: [/node_modules/],
//                 options: { appendTsSuffixTo: [/\.vue$/] }
//             },
//             {
//                 test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//                 loader: 'url-loader',
//                 options: { limit: 10000, name: join(__dirname, '../packages/img/[name].[hash:7].[ext]') },
//             },
//             {
//                 test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
//                 loader: 'url-loader',
//                 options: { limit: 10000, name: join(__dirname, '../packages/media/[name].[hash:7].[ext]') },
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//                 loader: 'url-loader',
//                 options: { limit: 10000, name: join(__dirname, '../packages/fonts/[name].[hash:7].[ext]') },
//             },
//         ]
//     },
//     // optimization: {
//     //     minimizer: [
//     //         new UglifyJsPlugin({
//     //             sourceMap: true, uglifyOptions: {
//     //                 compress: { warnings: false },
//     //             },
//     //         }),
//     //     ],
//     // },
//     plugins: [
//         new VueLoaderPlugin(),
//         new DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
//         new LoaderOptionsPlugin({ minimize: true }),
//         new CopyWebpackPlugin(pngs),
//     ],
// });
import { join } from 'path';
import { readdirSync } from 'fs';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, DefinePlugin, LoaderOptionsPlugin } from 'webpack';

const packages: any = {};
const pngs: any[] = [];

readdirSync(join(__dirname, '../components')).forEach((p: string) => {
    packages[p] = join(__dirname, '../components', p, 'index.ts');
    pngs.push({
        from: join(__dirname, '../components', p, 'cover.png'), to: join(__dirname, '../packages', p, 'cover.png'),
    });
    // pngs.push({
    //     from: join(__dirname, '../components', p, 'config.ts'), to: join(__dirname, '../packages', p, 'config.ts'),
    // });
});

export default (env: any = {}): Configuration => ({
    mode: 'development',
    devtool: 'source-map',
    entry: packages,
    output: {
        path: join(__dirname, '../packages'),
        publicPath: './',
        filename: '[name]/index.js',
        // library 指定的是引入项目的模块名
        // library: 'oss-component/[name]', 
        // libraryTarget 会生成不同 umd 的代码 可以只是 commonjs 标准的
        // 也可以是指amd标准的，也可以只是通过 script 标签引入的（必须加上）
        // libraryTarget: 'commonjs',
        libraryTarget: 'commonjs2',
        // 会对 UMD 的构建过程中的 AMD 模块进行命名
        // 否则就使用匿名的 define（必须加上）
        umdNamedDefine: true,
    },
    resolve: {
        alias: { 'vue$': 'vue/dist/vue.esm.js' },
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    },
    performance: { hints: false },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)?$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'ts-loader', options: {
                        appendTsSuffixTo: [/.vue$/],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 8192 },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 10000 },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 10000 },
            },
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true, uglifyOptions: {
                    compress: { warnings: false },
                },
            }),
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
        new MiniCssExtractPlugin({ filename: '[name]/index.css' }),
        new LoaderOptionsPlugin({ minimize: true }),
        new CopyWebpackPlugin(pngs),
    ],
});
