import Taro from '@tarojs/taro'
import { withQuery } from 'taro-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { mutation } from '@utils/graphql'

class BaseComponent extends Taro.Component {

  after = '0'
  first = 10
  hasNextPage = true

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
    this.hasNextPage = _.get(nextProps, 'lists.pageInfo.hasNextPage', true)
  }

  onPullDownRefresh () {
    this.after = '0'
    this.loadMore()
    setTimeout(Taro.stopPullDownRefresh, 1500)
  }
  
  onReachBottom () {
    if (this.hasNextPage) {
      this.after = (parseInt(this.after) + this.first) + ''
      this.loadMore()
    }
  }

  async mutation (query, variables, refetchQueries) {
    return mutation(query, variables, refetchQueries)
  }
  
  loadMore () {
  }

  render () {
    return (
      <View>Component Base</View>
    )
  }
}

export default BaseComponent