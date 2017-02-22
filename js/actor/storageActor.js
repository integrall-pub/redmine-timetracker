/**
   Copyright 2017 Vilppu Vuorinen

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 * /
/* @flow */
import type { Dispatch } from 'redux'
import type { AppState } from '../types'

import {
  AsyncStorage
} from 'react-native'

export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  switch (lastAction.type) {
    case 'load-connection':
      AsyncStorage.multiGet(['@Connection:endpoint', '@Connection:apiKey'])
        .then((conn) => {
          const [[, endpoint], [, apiKey]] = conn
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
        .catch(() => dispatch({
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
