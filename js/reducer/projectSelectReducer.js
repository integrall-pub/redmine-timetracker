/* @flow */
'use strict'
import type { Action } from '../types'

const initialState = -1

export default function projectSelectReducer (
  state?: number = initialState,
  action: Action
) {
  switch (action.type) {
    case 'project-select':
      return action.projectId

    default:
      return state
  }
}
