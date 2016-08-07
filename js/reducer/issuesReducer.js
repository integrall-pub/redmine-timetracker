/* @flow */
'use strict'
import { List } from 'immutable'

import type {
  Action,
  Issue
} from '../types'

const initialState =  List()

export default function issuesReducer (
  state?: List<Issue> = initialState,
  action: Action
) {
  switch (action.type) {
    case 'issues-load-done':
      return action.success
        ? List(action.issues)
        : initialState

    default:
      return state
  }
}
