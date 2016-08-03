/* @flow */
'use strict'
import { List } from 'immutable'

import type { Action, Issue, Record } from '../types'

const initialState = () => ({
  search: '',
  searchActive: true,
  record: {
    id: -1,
    projectId: -1,
    issueId: -1,
    comment: '',
    startTime: '',
    endTime: '',
    synced: false
  }
})

export default function recordEditReducer (
  state?: List<Issue> = initialState(),
  action: Action
) {
  switch (action.type) {
    case 'rec-edit-issue-search':
      return {
        ...state,
        search: action.search,
        searchActive: true
      }

    case 'rec-edit-issue-select':
      return {
        ...state,
        search: '#' + action.issueId,
        searchActive: false,
        record: {
          ...state.record,
          issueId: action.issueId
        }
      }

    case 'project-select':
      return {
        ...state,
        record: {
          ...state.record,
          projectId: action.projectId
        }
      }

    case 'rec-edit-comment':
      return {
        ...state,
        record: {
          ...state.record,
          comment: action.comment
        }
      }

    case 'record-create-done':
      // falls through
    case 'record-edit-done':
      if (!action.success) {
        return state
      }
      // falls through
    case 'rec-edit-clear':
      return initialState()

    default:
      return state
  }
}
