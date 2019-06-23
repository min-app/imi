import { ADDPLAN } from '../constants/plan'

const INITIAL_STATE = {
  plans: [],
  plan: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDPLAN:
      return action
      break
    default:
      return state
  }
}
