import { ADDPLAN, PLANS, PLANINFO, ADDPLANLOG } from '../constants/plan'
import { sendMutation, sendQuery } from "../utils/graphql"

import { addPlanMutation } from '@mutations/plan'
import { addPlanLogMutation } from '@mutations/planLog'

export const plans = async (query, variables = {}) => {
  return async dispatch => {
    dispatch({
      type: PLANS,
      ...await sendQuery(query, variables),
    })
  }
}

export const getPlan = async (query, variables = {}) => {
  return async dispatch => {
    dispatch({
      type: PLANINFO,
      ...await sendQuery(query, variables),
    })
  }
}

export const addPlanLog = async (variables = {}) => {
  return async dispatch => {
    dispatch({
      type: ADDPLANLOG,
      ...await sendMutation(addPlanLogMutation, variables),
    })
  }
}

export const addPlan = async (variables) => {
  return async dispatch => {
    dispatch({
      type: ADDPLAN,
      ...await sendMutation(addPlanMutation, variables),
    })
  }
}