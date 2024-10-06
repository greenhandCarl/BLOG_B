process.env.NODE_ENV = 'production'
process.env.BABEL_ENV = 'production'

const webpack = require('webpack')

const config = require('./webpack.config.prod.js')
const compiler = webpack(config)

compiler.run()