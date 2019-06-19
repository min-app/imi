import moment from 'moment'

export const fromNow = (time, suffix = false) => {
  return moment(time).fromNow(suffix)
}