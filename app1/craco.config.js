
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { merge } = require('webpack-merge');

const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;

// https://blog.csdn.net/u010074572/article/details/136767305
// https://juejin.cn/post/7122114817581645832#heading-3

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'myAppChild1', //模块name 唯一性标识
                //暴露出去生成的文件名称，被引用的，生产构建时会多出一个文件
                filename: 'remoteEntry.js',
                // library: { type: 'var', name: 'myAppChild1' },

                remotes: {
                    childApp1: `myAppChild2@//localhost:7003/remoteEntry.js?v=${Date.now()}`
                },
                // 暴露出去的模块，被其他应用引用
                exposes: {
                    './App': './src/App.jsx'
                },

                //引入外部模块 上线后根据上线地址做区分即可！
                // remotes: {},
                shared: {
                    react: {
                        // requiredVersion: false,
                        singleton: true
                    },
                    'react-dom': {
                        // requiredVersion: false,
                        singleton: true
                    }
                }
            }),
            // new HtmlWebpackPlugin({
            //     template: './public/index.html',
            // }),
        ],

        // 以下两个configure二选一，否则后者覆盖前者
        // configure: {
        //     output: {
        //         publicPath: 'auto',
        //     },
        // },
        configure: (webpackConfig, { env, paths }) => {
            const config = {
                output: {
                    publicPath: 'auto',
                },
            };
            return merge(webpackConfig, config);
        }
    },
    plugins: [],
    devServer: {
        port: 7002
    }
}