const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html'
})

// eslint begin
const ESLintPlugin = require('eslint-webpack-plugin')
const options = {
    exclude: 'node_modules',
    extensions: ['js', 'jsx', 'ts', 'tsx'],
    failOnWarning: true, // 当设置为 true 时，任何警告都会导致模块构建（module build）失败。 （找了好久）
}
const eslintPlugin = new ESLintPlugin(options)
// eslint 



const webpackConfig = {
    entry: {
        index: path.resolve(__dirname, '../src/index.tsx')
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src')
        },
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '/' // 服务将哪个目录暴露出去配合devServer.contentBase一起返回到客户端
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: { // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /.(js|ts|tsx)$/,
                exclude: [path.resolve(__dirname, '../node_modules')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['react-app', { flow: false, typescript: true }]],
                            plugins: [
                                '@babel/transform-runtime',
                                ['@babel/plugin-proposal-class-properties', { "loose": true }],
                            ]
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, '../node_modules')],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            sourceMap: false, // 源映射生成
                        }
                    },
                ]
            },
            {
                test: /\.scss$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    esModule: true,
                                    sourceMap: false, // 源映射生成
                                    importLoaders: 1, // 设置在css加载器之前应用的加载器数量
                                    modules: {
                                        localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                        localIdentHashSalt: "my-custom-hash",
                                    }
                                }
                            },
                            {
                                loader: 'postcss-loader', // 配置postcss-loader 自动加上兼容后缀
                                options: {
                                    sourceMap: false,
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: false,
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    esModule: true,
                                    importLoaders: 1, // 设置在css加载器之前应用的加载器数量
                                    modules: {
                                        localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                        localIdentHashSalt: "my-custom-hash",
                                    }
                                }
                            },
                            {
                                loader: 'postcss-loader', // 配置postcss-loader 自动加上兼容后缀
                            },
                            {
                                loader: 'sass-loader',
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        htmlPlugin,
        eslintPlugin
    ]
}

module.exports = webpackConfig
