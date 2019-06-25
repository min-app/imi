import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAvatar, AtButton, AtList, AtListItem } from 'taro-ui'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import _ from 'lodash'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'
import { getUser, encryptUser } from '@actions/user'

import './index.scss'

const query = gql`
  query User ($userId: UserId!) {
    user (id: $userId) {
      id
      wxUser {
        id
        avatarUrl
        nickName
      }
    }
  }
`
@connect(
  ({ user }) => (user),
  (dispatch) => ({
    getUser(userId) {
      if (userId) dispatch(getUser(query, { userId }))
    },
    encryptUser(variables) {
      dispatch(encryptUser(variables))
    }
  })
)
class UserComponent extends BaseComponent {
  config = {
    navigationBarTitleText: '个人中心'
  }
  jsCode = ''

  componentWillReceiveProps (nextProps) {
    const userId = _.get(nextProps, 'encryptUserInfo.wxUser.userId', null)
    if (userId) {
      Taro.setStorageSync('userId', userId)
    }
  }

  componentWillMount () {
    this.props.getUser(Taro.getStorageSync('userId'))
    // this.props.getUser('VXNlcjo2')
    // this.checkSession()
  }
  
  checkSession () {
    const self = this
    Taro.checkSession({
      success: (res) => {
        console.log('res-->', res)
      },
      fail: () => {
        Taro.login({
          success: function(res) {
            self.jsCode = res.code
          }
        })
      }
    })
  }

  async onGetUserInfo (res) {
    const { encryptedData, iv } = res.detail
    const { code: jsCode } = await Taro.login()

    this.props.encryptUser({
      jsCode,
      encryptedData,
      iv
    })
  }

  handleClick (e, click) {
    const action = _.get(click, 'currentTarget.dataset.action', '')
    
    switch (action) {
      case 'addPlan':
        Taro.navigateTo({
          url: '/pages/plan/add/index'
        })
        break
    }
  }

  render () {
    const userInfo = _.get(this.props, 'user.wxUser', _.get(this.props, 'encryptUserInfo.wxUser', {}))
    return (
      <Body
        current={1}
      >
        <View className='top'>
          <Image
            className='avatar'
            src={userInfo.avatarUrl}
          />
          {userInfo.avatarUrl ? <Text className='name'>{userInfo.nickName}</Text> : <AtButton
              className='btn'
              size='small'
              circle
              onGetUserInfo={this.onGetUserInfo}
              openType='getUserInfo'
            >
            求真相...
            </AtButton>}
        </View>
        <View>
          <AtList>
            <AtListItem title='我关注的' arrow='right' data-action='attend' onClick={this.handleClick} />
            <AtListItem title='我点赞的' arrow='right' data-action='liked' onClick={this.handleClick} />
            <AtListItem title='新计划' arrow='right' data-action='addPlan' onClick={this.handleClick} />
          </AtList>
        </View>
      </Body>
    )
  }
}

export default UserComponent