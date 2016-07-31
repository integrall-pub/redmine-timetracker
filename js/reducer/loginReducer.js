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
      let username = action.username !== undefined
        ? action.username
        : state.username
      let password = action.password !== undefined
        ? action.password
        : state.password
      return {
        ...state,
        username: username,
        password: password,
        valid: username.length > 0 && password.length > 0
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
