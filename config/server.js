process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const shelljs = require('shelljs');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');


// webpack dev server begin
const config = require('./webpack.config.dev.js')
const options = {
    // contentBase: '../dist', 新版的webpack-dev-server删除了这个参数
    hot: true,
    open: true,
    host: 'localhost',
    historyApiFallback: true, // 解决html5 history api browserRouter 刷新页面404问题，帮助重定向到'/'路径，再由前端路由去寻找
}

const compiler = webpack(config)
const server = new WebpackDevServer(options, compiler)

const result = shelljs.exec('kill-port 3001', {
    silent: false,
    env: {
        ...process.env,
        FORCE_COLOR: true
    }
})

server.start(3001, 'localhost', () => {
    console.log('dev server listening on port 3001 ...')
})
// webpack dev server end