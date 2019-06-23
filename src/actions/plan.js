import { ADDPLAN, PLANS } from '../constants/plan'
import { sendMutation, sendQuery } from "../utils/graphql"

import { addPlanQuery } from '@mutations/plan'

export const plans = async (query, variables) => {
  return async dispatch => {
    dispatch({
      type: PLANS,
      ...await sendQuery(query, variables),
    })
  }
}

export const addPlan = async (variables) => {
  console.log('variables', variables)
  return async dispatch => {
    dispatch({
      type: ADDPLAN,
      ...await sendMutation(addPlanQuery, variables),
    })
  }
}