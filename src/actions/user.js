import { USERINFO, ENCRYPTUSERINFO } from "../constants/user"
import { sendMutation, sendQuery } from "../utils/graphql"

import { encryptUserInfoQuery } from '@mutations/user'

export const getUser = async (query, variables) => {
  return async dispatch => {
    dispatch({
      type: USERINFO,
      ...await sendQuery(query, variables),
    })
  }
}

export const encryptUser = async (variables) => {
  return async dispatch => {
    dispatch({
      type: ENCRYPTUSERINFO,
      ...await sendMutation(encryptUserInfoQuery, variables),
    })
  }
}