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
  type: 'api-login-request',
  login: login
})

export const dismissFail = () => ({
  type: 'login-dismiss-fail'
})
