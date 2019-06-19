import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import _ from 'lodash'

import './index.scss'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'

class PlanComponent extends BaseComponent {

  onClick (e) {
    const id = _.get(e, 'currentTarget.dataset.id')
    Taro.navigateTo({
      url: `/pages/plan/info/index?id=${id}`
    })
  }

  render () {
    return (
      <Body
        current={1}
      >
        <View className='list-box'>
          <View className='list-box-item' data-id='a1' onClick={this.onClick}>
            <View className='list-box-item-main'>
              <View className='list-box-item-main-title'>3个月读完基础</View>
              <View className='list-box-item-main-desc'>3个月读完基础3个月读完基础3个月读完基础</View>
            </View>
            <View className='list-box-item-minor error'>暂停</View>
          </View>
          <View className='list-box-item' data-id='a2' onClick={this.onClick}>
            <View className='list-box-item-main'>
              <View className='list-box-item-main-title'>3个月读完基础</View>
              <View className='list-box-item-main-desc'>3个月读完基础3个月读完基础3个月读完基础</View>
            </View>
            <View className='list-box-item-minor info'>进行中</View>
          </View>
          <View className='list-box-item' data-id='a3' onClick={this.onClick}>
            <View className='list-box-item-main'>
              <View className='list-box-item-main-title'>3个月读完基础</View>
              <View className='list-box-item-main-desc'>3个月读完基础3个月读完基础3个月读完基础</View>
            </View>
            <View className='list-box-item-minor'>已完成</View>
          </View>
        </View>
      </Body>
    )
  }
}

export default PlanComponent