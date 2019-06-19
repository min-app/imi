import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'

class HomeComponent extends BaseComponent {
  render () {
    return (
      <Body
        current={0}
      >
        HomeComponent
      </Body>
    )
  }
}

export default HomeComponent