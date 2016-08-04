/* @flow */
import type { Dispatch } from 'redux'
import type { Action, ApiKey, AppState } from '../types'

import * as client from '../redmine/client'

export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  let url = state.endpoint.url
  let key = state.apiKey.key
  if (!state.endpoint.valid) { return }

  switch (lastAction.type) {
    case 'api-login-request':
      client.getKey(
        url,
        lastAction.login.username,
        lastAction.login.password)
        .then((k) => {
          dispatch({
            type: 'api-login-request-success'
          })
          dispatch({
            type: 'api-key-set',
            key: k
          })
        })
        .catch((error) => dispatch({
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
        })})
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
        .catch((error) => dispatch({
          type: 'issues-load-done',
          success: false,
          issues: []
        }))
      break

    case 'issues-load-single':
      break
      loadIssue(
        dispatch,
        url,
        key,
        lastAction.issueId
      )
      break
  }
}
