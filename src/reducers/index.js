import { combineReducers } from 'redux'

import counter from './counter'
import user from './user'
import plan from './plan'

export default combineReducers({
  counter,
  user,
  plan,
})
