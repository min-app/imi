import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem } from 'taro-ui'
import gql from 'graphql-tag'
import classNames from 'classnames'
import _ from 'lodash'

import './index.scss'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'

import { plans } from '@actions/plan'

const statusObj = {
  'waiting': '未开始',
  'underway': '进行中',
  'finished': '已完成',
}

const query = gql`
  query Plans {
    plans(
      sort: [
        { field: "id", order: DESC }
      ]
    ) {
      edges {
        node {
          id
          title
          detail
          status
          startTime
          endTime
        }
      }
    }
  }
`
@connect(
  ({ plan }) => (plan),
  (dispatch) => ({
    plans() {
      dispatch(plans(query))
    },
  })
)
class PlanComponent extends BaseComponent {

  componentWillMount () {
    this.props.plans()
  }

  onClick (e) {
    const id = _.get(e, 'currentTarget.dataset.id')
    Taro.navigateTo({
      url: `/pages/plan/info/index?id=${id}`
    })
  }

  render () {
    const plans = _.get(this.props, 'plans.edges', []).map(({ node }) => node)
    return (
      <Body
        current={0}
      >
        <View className='list-box'>
          {plans.map(item => {
            const { id, title, detail, status } = item
            return (
              <View className='list-box-item' taroKey={id} data-id={id} onClick={this.onClick}>
                <View className='list-box-item-main'>
                  <View className='list-box-item-main-title'>{title}</View>
                  <View className='list-box-item-main-desc'>{detail}</View>
                </View>
                <View
                  className={classNames('list-box-item-minor', {
                    info: ['waiting', 'underway'].indexOf(status) > -1,
                    error: status === 'pause',
                  })}
                >{statusObj[status]}</View>
              </View>
            )
          })}
        </View>
      </Body>
    )
  }
}

export default PlanComponent