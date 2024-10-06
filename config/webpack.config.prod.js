const webpackConfigBase = require('./webpack.config.base.js')
const { merge } = require('webpack-merge')

const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = merge(webpackConfigBase, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false, // 是否注释掉console
                        dead_code: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false,
                    },
                    mangle: true,
                },
                parallel:  true
            })
        ]
    }

})

module.exports = webpackConfig
