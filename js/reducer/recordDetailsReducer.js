/* @flow */
'use strict'
import { List } from 'immutable'

import type {
  Action,
  Record,
  RecordDetails,
  RecordDetailsState
} from '../types'

const initialState = () => ({})

export default function recordDetailsReducer (
  state: RecordDetailsState = initialState(),
  action: Action
): RecordDetailsState {
  switch (action.type) {
    case 'record-details-current':
      return {
        ...state,
        current: action.record
      }

    case 'record-details-selected':
      return {
        ...state,
        selected: action.record
      }

    case 'record-select':
      return {
        ...state,
        selected: undefined
      }

    default:
      return state
  }
}
