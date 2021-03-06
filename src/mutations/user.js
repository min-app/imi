import gql from 'graphql-tag'

export const encryptUserInfoMutation = gql`
  mutation EncryptUserInfo ($jsCode: String, $sessionKey: String, $iv: String!, $encryptedData: String!) {
    encryptUserInfo(input: {
      jsCode: $jsCode
      sessionKey: $sessionKey
      iv: $iv
      encryptedData: $encryptedData
      clientMutationId: "123"
    }) {
      wxUser {
        id
        userId
        avatarUrl
        nickName
      }
    }
  }
`
