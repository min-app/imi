const path = require('path')

const config = {
  projectName: 'imi',
  date: '2019-4-6',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    sass: {
      importer: function(url) {   // 设置样式的引入别名styles
        const reg = /^@styles\/(.*)/
        return {
          file: reg.test(url) ? path.resolve(__dirname, '..', 'src/styles', url.match(reg)[1]) : url
        }
      }
    }
  },
  defineConstants: {
  },
  alias: {
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@actions': path.resolve(__dirname, '..', 'src/actions'),
    '@mutations': path.resolve(__dirname, '..', 'src/mutations'),
    '@constants': path.resolve(__dirname, '..', 'src/constants')
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
