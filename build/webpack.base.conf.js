'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {   //webpack을 이용해서 bundle하고, build할 애플리케이션의 시작점을 설정하는 옵션. (depencenty tree 그래프를 만들때의 시작점을 이곳에서 설정)
    app: './src/main.js'
  },
  output: {  //entry로 지정된 파일로부터 bundling을 진행하고, 그 결과를 어떻게 할지를 설정한다.
    //bundling된 결과파일의 이름을 filename으로 어디에 생성할지에 대한 정보를 path에 설정해준다.
    //path에는 절대경로를 통해 설정해 주어야 한다. 그렇기 때문에 __dirname을 사용할 수 있다.
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {   //webpack을 통해 bundling을 진행할 때 처리해야 하는 task들을 실행할 때 사용한다.
              //ES5문법을 사용하기 위해 먼저 babel을 통해 transpile을 해야하는데, 이 작업을 babel-loader를 통해 설정해 줄 수 있다.
              //또 javascript파일 뿐만 아니라 css파일을 load해야하는 경우에는 css-loader를 사용할 수 있다.
    rules: [  //각종 loader들을 등록할 수 있다.
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,     //test를 통해 load할 파일을 지정한다.
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
