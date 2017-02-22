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
