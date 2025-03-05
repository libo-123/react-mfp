
const path = require('path');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'myApp', //模块name 唯一性标识
                // filename: 'remoteEntry.js',//暴露出去生成的文件名称，被引用的

                // 暴露出去的模块，被其他应用引用
                // exposes: {
                //     './App': './src/App'
                // },

                //引入外部模块 上线后根据上线地址做区分即可！
                remotes: {
                    app1: `myAppChild1@//localhost:7002/remoteEntry.js?v=${Date.now()}`,
                    app2: `myAppChild2@//localhost:7003/remoteEntry.js?v=${Date.now()}`,

                    //vite项目引入webpack失败！！！！  https://github.com/originjs/vite-plugin-federation/tree/main/packages/examples
                    // viteRemote: `promise import("http://localhost:7004/assets/remoteEntry.js")`,
                    // viteRemote: `promise new Promise(async resolve => {
                    //     const remoteUrlWithVersion = 'http://localhost:7004/assets/remoteEntry.js?v=${Date.now()}';
                    //     const script = document.createElement('script')
                    //     script.defer = true
                    //     script.src = remoteUrlWithVersion
                    //     script.onload = () => {
                    //         const proxy = {
                    //             get: (request) => window.viteRemote.get(request),
                    //             init: (arg) => {
                    //                 try {
                    //                     return window.viteRemote.init(arg)
                    //                 } catch(e) {
                    //                     console.log('remote container already initialized')
                    //                 }
                    //             }
                    //         }
                    //         resolve(proxy)
                    //      }
                    //     document.head.appendChild(script);
                    // })`,
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: '^18.2.0'
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: '^18.2.0'
                    }
                },
            }),
            new ExternalTemplateRemotesPlugin(),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
        ],
        configure: (webpackConfig, { env, paths }) => {
            const config = {
                // target: 'web',
            };
            return merge(webpackConfig, config);
        }
    },
    plugins: [

    ],
    devServer: {
        port: 7001,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    }
}