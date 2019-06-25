import Taro from '@tarojs/taro'
import { sendMutation as send } from 'taro-apollo'

import client from '../client'

export const mutation = async (query, variables, refetchQueries) => {
  return send(query, variables, refetchQueries)
}

export async function sendQuery(query, variables, ignoreCache = true) {
  const params = { query, variables }
  if (ignoreCache) {
      params.fetchPolicy = "network-only"
  }
  try {
    const { data } = await client.query(params)
    return data
  } catch (error) {
    Taro.atMessage({
      message: errors.message ? errors.message.replace('GraphQL error: ', '') : '系统异常',
      type: 'error',
    })
  }
}

export async function sendMutation(mutation, variables, refetchQueries) {
  const params = { mutation, variables, refetchQueries }
  try {
    const { data } = await client.mutate(params)
    return data
  } catch (errors) {
    Taro.atMessage({
      message: errors.message ? errors.message.replace('GraphQL error: ', '') : '系统异常',
      type: 'error',
    })
  }
}