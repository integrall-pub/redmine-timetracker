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

export const setUsername = (username: string): Action => ({
  type: 'login-set',
  login: {
    username: username,
    valid: false,
    progress: false,
    fail: false
  }
})

export const setPassword = (password: string): Action => ({
  type: 'login-set',
  login: {
    password: password,
    valid: false,
    progress: false,
    fail: false
  }
})

export const tryLogin = (login: Login): Action => ({
  type: 'login-request',
  username: login.username || '',
  password: login.password || ''
})

export const dismissFail = () => ({
  type: 'login-dismiss-fail'
})
