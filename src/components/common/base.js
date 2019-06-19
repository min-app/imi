import Taro from '@tarojs/taro'
import { withQuery } from 'taro-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { mutation } from '@utils/graphql'

class BaseComponent extends Taro.Component {

  componentWillMount () {
  }

  onPullDownRefresh () {
  }
  
  onReachBottom () {
  }

  async mutation (query, variables, refetchQueries) {
    return mutation(query, variables, refetchQueries)
  }
  
  loadMore (after = '0', first = 10) {
    const { fetchMore } = this.props
    after = String(after)

    fetchMore({
      variables: {
        first,
        after
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        _.forOwn(fetchMoreResult, (value, key) => {
          const newEdges = value.edges
          const pageInfo = value.pageInfo
          const count = value.count
          if (newEdges.length > 0) {
            previousResult[key] = {
              __typename: value.__typename,
              edges: [...previousResult[key].edges, ...newEdges],
              count,
              pageInfo
            }
          }
        })

        return previousResult
      }
    })
  }

  render () {
    return (
      <View>Component Base</View>
    )
  }
}

export default BaseComponent