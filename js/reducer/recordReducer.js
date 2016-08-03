/* @flow */
'use strict'
import { List } from 'immutable'

import type { Action, Record, RecordState } from '../types'

const initialState = () => ({
  current: null,
  all: List()
})

export default function recordReducer (
  state: RecordState = initialState(),
  action: Action
): RecordState {
  switch (action.type) {
    case 'record-load-done':
      // falls through
    case 'record-create-done':
      // falls through
    case 'record-edit-done':
      // falls through
    case 'record-delete-done':
      if (!action.success) { return state }
      return {
        current: (action.records || List())
          .filter((r) => r.endTime === '')
          .first() || null,
        all: action.records || List()
      }

    default:
      return state
  }
}
