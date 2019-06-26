import _ from 'lodash'

import { ADDPLAN, PLANS, PLANINFO, ADDPLANLOG } from '../constants/plan'

const INITIAL_STATE = {
  plans: {
    edges: []
  },
  plan: {},
  planLogs: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDPLAN:
    case PLANINFO:
    case ADDPLANLOG:
    return action
      break
    case PLANS:
      return {
        plans: {
          ...action.plans,
          edges: [
            ..._.get(state, 'plans.edges', []),
            ..._.get(action, 'plans.edges', []),
          ]
        }
      }
      break
    default:
      return state
  }
}
