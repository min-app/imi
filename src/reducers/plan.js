import { ADDPLAN, PLANS, PLANINFO, ADDPLANLOG } from '../constants/plan'

const INITIAL_STATE = {
  plans: [],
  plan: {},
  planLogs: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDPLAN:
    case PLANINFO:
    case PLANS:
    case ADDPLANLOG:
      return action
      break
    default:
      return state
  }
}
