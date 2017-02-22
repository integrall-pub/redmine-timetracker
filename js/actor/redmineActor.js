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

import * as client from '../dao/redmine/client'

export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  let url = state.endpoint.url
  let key = state.apiKey.key
  if (!state.endpoint.valid) { return }

  switch (lastAction.type) {
    case 'api-login-request':
      client.getKey(
        url,
        lastAction.login.username || '',
        lastAction.login.password || '')
        .then((k) => {
          dispatch({
            type: 'api-login-request-success'
          })
          dispatch({
            type: 'api-key-set',
            key: k
          })
        })
        .catch(() => dispatch({
          type: 'api-login-request-fail'
        }))
      break

    case 'projects-load':
      client.getProjects(
        url,
        key)
        .then((ps) => dispatch({
          type: 'projects-load-done',
          success: true,
          projects: ps
        }))
        .catch((error) => {
          console.log(error)
          dispatch({
            type: 'projects-load-done',
            success: false,
            projects: []
          })
        })
      break

    case 'issues-load':
      client.getIssues(
        url,
        key,
        state.projectSelect)
        .then((is) => dispatch({
          type: 'issues-load-done',
          success: true,
          issues: is
        }))
        .catch(() => dispatch({
          type: 'issues-load-done',
          success: false,
          issues: []
        }))
      break
  }
}
