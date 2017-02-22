/* @flow */
'use strict'

import type {
  Action,
  InitState
} from '../types'

const initialState = 'waiting'

export default function loginReducer (
  state?: InitState = initialState,
  action: Action
) {
  switch (action.type) {
    case 'prop-test':
      return action.success
        ? 'success'
        : 'fail'

    default:
      return state
  }
}
