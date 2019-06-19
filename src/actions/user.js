import { USERINFO, ENCRYPTUSERINFO } from "../constants/user"
import { sendMutation, sendQuery } from "../utils/graphql"

import { encryptUserInfo } from '@mutations/user'

export const getUser = async (query, variables) => {
  // const data = await sendQuery(query, variables)
  return async dispatch => {
    dispatch({
      type: USERINFO,
      ...await sendQuery(query, variables),
    })
  }
}

export const encryptUser = async (variables) => {
  // const data = await sendMutation(encryptUserInfo, variables)
  return async dispatch => {
    dispatch({
      type: ENCRYPTUSERINFO,
      ...await sendMutation(encryptUserInfo, variables),
    })
  }
}