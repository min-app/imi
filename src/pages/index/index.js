import Taro from '@tarojs/taro'
import { withQuery } from 'taro-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'

const query = gql`
    query Users($first: Float, $after: String){
        users(
          first: $first
          after: $after
        ) {
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
          count
          edges {
            node {
              id
              username
            }
          }
        }
    }
`

@withQuery({
    query,
    fetchPolicy: 'network-only"',
    ignoreCache: true, // 设置 fetchPolicy = "network-only"， 为了省事。。 
    variables: (props, state) => {
        return {
          first: props.first,
          after: props.after
        };
    }
})
export default class MyComponent extends BaseComponent {
  config = {
    navigationBarTitleText: '个人中心'
  }

  componentWillMount () {
    this.init()
  }

  init () {
    let i = 0
    let int = setInterval(() => {
      i ++
      if (i >= 3) {
        int = null
        return
      }
      const after = _.get(this.props, 'data.users.edges.length', 0)
      this.loadMore(after, this.props.first)
      
    }, 3000)
  }

  render() {
    const { data, loading, error, fetchMore, refetch } = this.props
    const users = _.get(data, 'users.edges', [])
    return (
      <Body
        current={0}
      >
        <View>
          {loading && <View>加载中</View>}
          {error && <View>出错啦</View>}
          {data && users.map((node, index) => (
            <View taroKey={index}>{node.node.id} - {node.node.username}</View>
          ))}
        </View>
      </Body>
    );
  }
}