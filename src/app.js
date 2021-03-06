import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { Provider } from '@tarojs/redux'

require('./client')
import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      // 'pages/index/index',
      'pages/user/index',
      'pages/plan/index',
      'pages/plan/add/index',
      'pages/plan/info/index',
      'pages/home/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#ddd',
      navigationBarBackgroundColor: '#ddd',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      onReachBottomDistance: 55
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <AtMessage />
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
