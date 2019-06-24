import Taro from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtTextarea, AtButton, AtMessage } from 'taro-ui'
import moment from 'moment'
import _ from 'lodash'

import { addPlan } from '@actions/plan'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'

@connect(
  ({ plan }) => (plan),
  (dispatch) => ({
    addPlan(variables) {
      variables.userId = Taro.getStorageSync('userId')
      dispatch(addPlan(variables))
    }
  })
)
class AddPlanComponent extends BaseComponent {

  config = {
    navigationBarTitleText: '个人中心'
  }

  componentWillReceiveProps (nextProps) {
    const id = _.get(nextProps, 'addPlan.addedPlanEdge.node.id')
    if (id) {
      Taro.redirectTo({
        url: '/pages/plan/index'
      })
    }
  }

  onDateChange (e) {
    const value = _.get(e, 'currentTarget.value')
    const id = _.get(e, 'currentTarget.dataset.id')
    let { startTime, endTime } = this.state
    id === 'startTime' ? startTime = value : endTime = value
    let message = ''
    
    if (startTime && endTime) {
      const diff = moment(endTime).diff(moment(startTime), 'd')
      if (diff < 0) {
        message = '开始时间不能晚于结束时间'
      } else if (diff < 3) {
        message = '计划周期不得小于3天'
      } else if (diff > 60) {
        message = '计划周期不得大于60天'
      }
    }
    
    if (startTime && moment(startTime).diff(moment().startOf('d'), 'd') < 1) {
      message = '计划开始时间不得小于第二天'
    }
    
    if (message) {
      Taro.atMessage({
        message,
        type: 'error',
      })
    } else {
      this.setState({
        [id]: value
      })
    }
  }

  submit () {
    this.props.addPlan(this.state)
  }

  render () {
    const { title, detail, startTime, endTime } = this.state
    return (
      <View>
        <AtForm>
          <AtMessage />
          <AtInput
            name='title'
            title='标题'
            type='text'
            placeholder='计划标题'
            value={title}
            onChange={title => this.setState({ title })}
          />
          <AtInput
            title='开始日期'
          >
            <Picker
              mode='date'
              start={moment().add(1, 'd').format('YYYY-MM-DD')}
              data-id='startTime'
              onChange={this.onDateChange.bind(this)}
            >
              <View className='margin-right-l color-gray-0'>
                {startTime ? startTime : '请选择'}
              </View>
            </Picker>
          </AtInput>
          <AtInput
            title='结束日期'
          >
            <Picker
              mode='date'
              start={moment().add(4, 'd').format('YYYY-MM-DD')}
              data-id='endTime'
              onChange={this.onDateChange.bind(this)}
            >
              <View className='margin-right-l color-gray-0'>
                {endTime ? endTime : '请选择'}
              </View>
            </Picker>
          </AtInput>
          <AtTextarea
            value={detail}
            onChange={e => this.setState({ detail: _.get(e, 'target.value') })}
            maxLength={200}
            placeholder='计划内容'
          />
          <View className='box-fixed'>
            <Button className='box-fixed-item primary' onClick={this.submit}>保存</Button>
          </View>
        </AtForm>
      </View>
    )
  }
}

export default AddPlanComponent