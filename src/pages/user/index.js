import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAvatar, AtButton, AtList, AtListItem } from 'taro-ui'
import PropTypes from 'prop-types'
import { withQuery } from 'taro-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import BaseComponent from '@components/common/base'
import Body from '@components/common/body'
// import { encryptUser } from '@mutations/encryptUser'
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
  state = {
    // userInfo: {}
  }
  jsCode = ''

  componentWillMount () {
    this.props.getUser('VXNlcjo2')
    console.log('this.state', this.state, this.props)
    // Taro.setStorageSync('userId', 'VXNlcjo2')
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

    // console.log('r', r)
    console.log('props', this.props)
    const userId = _.get(this.props, 'encryptUserInfo.wxUser.userId', null)
    console.log('this.state-->', this.props.encryptUserInfo)
    if (userId) {
      const rr = Taro.setStorageSync('userId', userId)
      console.log('rr', rr)
      // this.props.refetch()
    }
    // this.setState({
    //   userInfo: res.detail.userInfo
    // })
  }

  handleClick (e) {
    console.log('e', e)
  }

  render () {
    const userInfo = _.get(this.props, 'data.user.wxUser', {})
    console.log('userInfo..', userInfo)
    return (
      <Body
        current={2}
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
            <AtListItem title='我关注的' arrow='right' data-cus='as' onClick={this.handleClick} />
            <AtListItem title='我点赞的' arrow='right' data-cus='ds' onClick={this.handleClick} />
          </AtList>
        </View>
      </Body>
    )
  }
}

UserComponent.propTypes = {
  user: PropTypes.object,
  encryptUserInfo: PropTypes.object,
};

export default UserComponent