/* @flow */
'use strict'
import { List } from 'immutable'
import type { Action, InitState } from '../types'

const initialState = List()

export default function projectExpandReducer (
  state?: List<number> = initialState,
  action: Action
) {
  switch (action.type) {
    case 'project-expand':
      return state.includes(action.projectId)
        ? state.filter((e) => e !== action.projectId)
        : state.push(action.projectId)

    default:
      return state
  }
}
