import { sendMutation as send } from 'taro-apollo'

import client from '../client'

export const mutation = async (query, variables, refetchQueries) => {
  return send(query, variables, refetchQueries)
}

export async function sendQuery(query, variables, ignoreCache) {
  const params = { query, variables }
  if (ignoreCache) {
      params.fetchPolicy = "network-only"
  }
  const { data, errors } = await client.query(params)
  if (errors) {
      throw errors
  }
  return data
}

export async function sendMutation(mutation, variables, refetchQueries) {
  const params = { mutation, variables, refetchQueries }
  const { data, errors } = await client.mutate(params)
  if (errors) {
      throw errors
  }
  return data
}