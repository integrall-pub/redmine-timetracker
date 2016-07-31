/* @flow */

import type { Action, ApiKey } from '../types'

const initialState = () => ({ key: '', empty: true})

export default function apiKeyReducer (
  state: ApiKey = initialState(),
  action: Action
) {
  switch (action.type) {
    case 'api-key-set':
      return { key: action.key, empty: action.key.length === 0 }

    default:
      return state
  }
}
