
const path = require('path');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'myAppChild2', //模块name 唯一性标识
                //暴露出去生成的文件名称，被引用的，生产构建时会多出一个文件
                filename: 'remoteEntry.js',
                // 暴露出去的模块，被其他应用引用
                exposes: {
                    './App': './src/App'
                },

                //引入外部模块 上线后根据上线地址做区分即可！
                // remotes: {},
                shared: {
                    react: {
                        singleton: true
                    },
                    'react-dom': {
                        singleton: true
                    }
                }
            }),
        ],
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
        port: 7003
    }
}