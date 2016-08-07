/* @flow */
'use strict'
import { List } from 'immutable'

import type {
  Action,
  Record
} from '../types'

const initialState = List()

export default function recordReducer (
  state: List<Record> = initialState,
  action: Action
): List<Record> {
  switch (action.type) {
    case 'record-load-done':
      // falls through
    case 'record-create-done':
      // falls through
    case 'record-edit-done':
      // falls through
    case 'record-delete-done':
      if (!action.success) { return state }
      return (action.records || List()).sort(
        (a, b) => a.startTime.localeCompare(b.startTime)
      )

    default:
      return state
  }
}
