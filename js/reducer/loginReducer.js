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
'use strict'

import type { Action, Login } from '../types'

const initialState = () => ({
  username: '',
  password: '',
  valid: false,
  progress: false,
  fail: false
})

export default function loginReducer (
  state?: Login = initialState(),
  action: Action
) {
  switch (action.type) {
    case 'api-login-request':
      return {
        ...state,
        progress: true,
        fail: false
      }

    case 'api-login-request-success':
      return {
        username: '',
        password: '',
        valid: false,
        progress: false,
        fail: false
      }

    case 'api-login-request-fail':
      return {
        ...state,
        progress: false,
        fail: true
      }

    case 'login-set':
      let username: string = action.login.username
        ? action.login.username
        : state.username || ''
      let password: string = action.login.password
        ? action.login.password
        : state.password || ''
      return {
        ...state,
        username: username,
        password: password,
        valid: username && username.length > 0 && password && password.length > 0
      }

    case 'login-dismiss-fail':
      return {
        ...state,
        fail: false
      }

    default:
      return state
  }
}
