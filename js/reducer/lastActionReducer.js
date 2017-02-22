/* @flow */
import type { Action } from '../types'

export default function lastActionReducer (
  state: Action|null = null,
  action: Action
): Action|null {
  return action
}
