/* @flow */
import type { Dispatch } from 'redux'
import type { Action, ApiKey, AppState } from '../types'

import {
  AsyncStorage
} from 'react-native'

export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  switch (lastAction.type) {
    case 'load-connection':
      AsyncStorage.multiGet(['@Connection:endpoint', '@Connection:apiKey'])
        .then((conn) => {
          const  [[, endpoint], [, apiKey]] = conn
          if (endpoint === null || endpoint.length === 0 || apiKey === null || apiKey.length === 0) {
            dispatch({
              type: 'load-connection-done',
              success: false
            })
          } else {
            dispatch({ type: 'api-endpoint-set', endpoint: endpoint })
            dispatch({ type: 'api-key-set', key: apiKey })
            dispatch({
              type: 'load-connection-done',
              success: true
            })
          }
        })
        .catch((error) => dispatch({
          type: 'load-connection-done',
          success: false
        }))
      break

    case 'api-key-set':
      AsyncStorage.multiSet([
        ['@Connection:endpoint', state.endpoint.url],
        ['@Connection:apiKey', lastAction.key]
      ])
      break
  }
}
