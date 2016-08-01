/* @flow */
'use strict'
import { List } from 'immutable'

import type { Action, Issue } from '../types'

const initialState = {
  search: '',
  active: true
}

export default function issueSearchReducer (
  state?: List<Issue> = initialState,
  action: Action
) {
  switch (action.type) {
    case 'issue-search':
      return {
        search: action.search,
        active: true
      }

    case 'issue-select':
      console.log(action)
      return {
        search: '#' + action.issueId,
        active: false
      }

    default:
      return state
  }
}
