const webpackConfigBase = require('./webpack.config.base')
const { merge } = require('webpack-merge')

const webpackConfigDev = merge(webpackConfigBase, {
    mode: 'development',
    devtool: 'inline-source-map'
})

module.exports = webpackConfigDev
