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
      let projectId = action.projectId
      return state.includes(projectId)
        ? state.filter((e) => e !== projectId)
        : state.push(projectId)

    default:
      return state
  }
}
