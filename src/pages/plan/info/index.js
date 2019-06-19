import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTimeline, AtModal, AtModalContent, AtModalAction, AtTextarea } from 'taro-ui'
import moment from 'moment'
import _ from 'lodash'

import '../index.scss'
import './index.scss'

import BaseComponent from '@components/common/base'

class PlanInfo extends BaseComponent {

  state = {
    isOpened: false,
    logContent: ''
  }
  items = [
    { title: '刷牙洗脸', content: ['2019-04-25'], icon: 'clock' }, 
    { title: '吃早餐', content: ['2019-04-24'], icon: 'clock' }, 
    { title: '上班', content: ['2019-04-23'], icon: 'clock' }, 
    { title: '睡觉', content: ['2019-04-22'], icon: 'clock' }
  ]

  initItems (item = null) {
    const items = this.items
    if (item) {
      items.push(item)
    }
    return this.items = items
  }

  onClickStatus () {
    console.log('set status')
  }

  onClickLog () {
    this.setState({
      isOpened: true
    })
  }

  onLogging (e) {
    const logContent = _.get(e, 'detail.value', '')
    console.log('logContent', logContent)
    this.setState({
      logContent
    })
  }

  onClose () {
    this.setState({
      isOpened: false
    })
  }

  onConfirm () {
    const { logContent } = this.state
    this.initItems({
      title: logContent,
      content: [moment().format('YYYY-MM-DD HH:mm:ss')],
      icon: 'clock'
    })
    this.setState({
      logContent: '',
      isOpened: false
    })
  }

  render () {
    const items = this.items
    const { isOpened, logContent } = this.state
    return (
      <View>
        {/* <View className='main'>
          <View className='title'>3个月读完基础</View>
          <View className='desc'>3个月读完基础3个月读完基础3个月读完基础</View>
        </View> */}
        <View className='list-box'>
          <View className='list-box-item'>
            <View className='list-box-item-main'>
              <View className='list-box-item-main-title'>3个月读完基础</View>
              <View className='list-box-item-main-desc'>3个月读完基础3个月读完基础3个月读完基础</View>
            </View>
            <View className='list-box-item-minor error' onClick={this.onClickStatus}>暂停</View>
          </View>
        </View>
        <View className='minor'>
          <AtTimeline 
            pending
            items={items}
          >
          </AtTimeline>
        </View>
        <AtModal
          isOpened={isOpened}
        >
          <AtModalContent>
            <AtTextarea
              value={logContent}
              fixed
              showConfirmBar
              onChange={this.onLogging}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.onClose}>取消</Button>
            <Button onClick={this.onConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
        <View className='box-fixed'>
          <View className='box-fixed-item primary' onClick={this.onClickLog}>新增日志</View>
        </View>
      </View>
    )
  }
}

export default PlanInfo