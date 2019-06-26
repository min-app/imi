import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTimeline, AtModal, AtModalContent, AtModalAction, AtTextarea } from 'taro-ui'
import gql from 'graphql-tag'
import moment from 'moment'
import _ from 'lodash'

import '../index.scss'
import './index.scss'

import BaseComponent from '@components/common/base'

import { getPlan, addPlanLog } from '@actions/plan'

const query = gql`
  query Plan($id: PlanId!) {
    plan(
      id: $id
    ) {
      id
      title
      detail
      status
      startTime
      endTime
      planLogs {
        edges {
          node {
            id
            content
            createdAt
          }
        }
      }
    }
  }
`
@connect(
  ({ plan }) => (plan),
  (dispatch) => ({
    getPlan(id) {
      dispatch(getPlan(query, { id }))
    },
    addPlanLogFn(planId, content) {
      dispatch(addPlanLog({ planId, content }))
    },
  })
)
class PlanInfo extends BaseComponent {
  
  state = {
    isOpened: false,
    logContent: '',
    addedItems: []
  }
  id = ''

  componentWillMount () {
    const id = _.get(this.$router, 'params.id')
    this.id = id
    this.props.getPlan(id)
  }
  
  componentWillReceiveProps (nextProps) {
    const log = _.get(nextProps, 'addPlanLog.addedPlanLogEdge.node')
    const addedItems = this.state.addedItems
    this.setState({
      addedItems: [...addedItems, this.planLog2Item(log)]
    })

    return nextProps
  }

  planLog2Item (planLog) {
    return {
      title: planLog.content,
      content: [moment(planLog.createdAt).format('YYYY-MM-DD HH:mm')],
      icon: 'clock'
    }
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
    this.props.addPlanLogFn(this.id, logContent)

    this.setState({
      logContent: '',
      isOpened: false
    })
  }

  render () {
    const plan = _.get(this.props, 'plan', {})
    const { id, title, detail, status, planLogs = {} } = plan

    const planLogsItems = _.get(plan, 'planLogs.edges', []).map(log => this.planLog2Item(log.node))
    const addedItems = this.state.addedItems
    const items = [...planLogsItems, ...addedItems]
    const { isOpened, logContent } = this.state
    return (
      <View>
        <View className='list-box' style={{ paddingBottom: 0 }}>
          <View className='list-box-item'>
            <View className='list-box-item-main'>
              <View className='list-box-item-main-title'>{title}</View>
              <View className='list-box-item-main-desc'>{detail}</View>
            </View>
            {status === 'underway' && <View className='list-box-item-minor error' onClick={this.onClickStatus}>暂停</View>}
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
        {status === 'underway' && <View className='box-fixed'>
          <View className='box-fixed-item primary' onClick={this.onClickLog}>新增日志</View>
        </View>}
      </View>
    )
  }
}

export default PlanInfo