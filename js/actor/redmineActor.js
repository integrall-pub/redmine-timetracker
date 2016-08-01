/* @flow */
import type { Dispatch } from 'redux'
import { encode } from 'base-64'
import type { Action, ApiKey, AppState } from '../types'


export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  let url = state.endpoint.url
  let key = state.apiKey.key
  if (!state.endpoint.valid) { return }

  switch (lastAction.type) {
    case 'api-login-request':
      login(
        dispatch,
        url,
        lastAction.login.username,
        lastAction.login.password
      )
      break

    case 'projects-load':
      loadProjects(
        dispatch,
        url,
        key
      )
      break

    case 'issues-load':
      loadIssues(
        dispatch,
        url,
        key,
        state.projectSelect
      )
      break
  }
}

const login = (
  dispatch: Dispatch,
  url: string,
  username: string,
  password: string
): Action => (
  fetch(
    path(url, 'users', 'current.json'),
    baseParams(username, password))
    .then((r) => r.json())
    .then((r) => {
      dispatch({
        type: 'api-login-request-success'
      })
      dispatch({
        type: 'api-key-set',
        key: r.user.api_key
      })
    })
    .catch((error) => dispatch({
      type: 'api-login-request-fail'
    }))
)

const loadProjects = (
  dispatch,
  url: string,
  key: string
): Action => (
  fetch(
    path(url, 'projects.json?include=enabled_modules'),
    baseParams(key))
    .then((r) => r.json())
    .then((r) => dispatch({
        type: 'projects-load-done',
        success: true,
        projects: r.projects
      }))
    .catch((error) => {
      console.log(error)
      dispatch({
        type: 'projects-load-done',
        success: false,
        projects: []
    })})
)

const loadIssues = (
  dispatch,
  url: string,
  key: string,
  projectId: number
) => (
  fetch(
    path(url, 'issues.json?project_id=' + projectId),
    baseParams(key))
    .then((r) => { console.log(r); return r })
    .then((r) => r.json())
    .then((r) => dispatch({
      type: 'issues-load-done',
      success: true,
      issues: r.issues
    }))
    .catch((error) => dispatch({
      type: 'issues-load-done',
      success: false,
      issues: []
    })
  )
)

const path = (...parts: Array<string>) => parts.join('/')

const baseParams = (usernameOrKey: string, password?: string = 'X') => ({
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + encode(usernameOrKey + ':' + password)
  }
})
