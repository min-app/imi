import { USERINFO, ENCRYPTUSERINFO } from "../constants/user";
import { sendMutation } from "../utils/graphql";

const INITIAL_STATE = {
  user: {},
  encryptUserInfo: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERINFO:
    case ENCRYPTUSERINFO:
      return action
      break
    default:
      return state
  }
}
