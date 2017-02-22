/* @flow */
import type { Dispatch } from 'redux'
import { List } from 'immutable'

import * as Dao from '../dao'

import type {
  AppState,
  Issue,
  Project
} from '../types'

import {
  actions as routerActions
} from 'react-native-router-redux'

export default function (dao: typeof Dao) {
  return (state: AppState, dispatch: Dispatch) => {
    let action = state.lastAction
    switch (action.type) {
      // Property
      // ************************************************************
      case 'prop-test-request':
        dao.getConnection()
          .then((c) => dispatch({
            type: routerActions.actionTypes.ROUTER_REPLACE,
            payload: {
              name: 'dashboard'
            }
          }))
          .catch(() => dispatch({
            type: routerActions.actionTypes.ROUTER_REPLACE,
            payload: {
              name: 'endpoint'
            }
          }))
        break

      case 'url-set-request':
        dao.setUrl(action.url)
          .then((url) => {
            dispatch({
              type: routerActions.actionTypes.ROUTER_PUSH,
              payload: {
                name: 'login'
              }
            })
            dispatch({
              type: 'url-set',
              url: url,
              success: true
            })
          })
          .catch(() => dispatch({
            type: 'url-set',
            url: '',
            success: false
          }))
        break

      case 'login-request':
        dao.getNewKey(action.username, action.password)
          .then((key) => {
            dispatch({
              type: routerActions.actionTypes.ROUTER_PUSH,
              payload: {
                name: 'dashboard'
              }
            })
            dispatch({
              type: 'login',
              success: true
            })
          })
          .catch((error) => {
            console.error(error)
            dispatch({
              type: 'login',
              success: false
            })
          })
        break

      case 'logout-request':
        throw new Error(action.type + ' not implemented')
        // break

      // Project
      // ************************************************************
      case 'projects-load-request':
        dispatchProjects(dispatch, dao.getProjects())
          .then(() => dispatchProjects(dispatch, dao.syncProjects()))
        break

      // Issue
      // ************************************************************
      case 'issues-load-request':
        if (state.projectSelect <= 0) { break }
        dispatchIssues(dispatch, dao.getIssuesForProject(state.projectSelect))
        dispatchIssues(dispatch, dao.syncIssuesForProject(state.projectSelect))
        break

      /* case 'issues-load-single-request':
        if (!state.recordDetails.selected) { break }
        dispatchIssue(dispatch, dao.getIssue(state.recordDetails.selected.base.issueId))
        dispatchIssue(dispatch, dao.syncIssue(state.recordDetails.selected.base.issueId))
        break */

      // Record
      // ************************************************************
      case 'record-load-request':
        break

      case 'record-create-request':
        break

      case 'record-start-request':
        break

      case 'record-edit-request':
        break

      case 'record-delete-request':
        break

      case 'record-upload-request':
        break
    }
  }
}

function dispatchProjects (
  dispatch: Dispatch,
  promised: Promise<List<Project>>
) {
  return promised
    .then((p) => dispatch({
      type: 'projects-load',
      success: true,
      projects: p
    }))
    .catch((error) => {
      console.error(error)
      dispatch({
        type: 'projects-load',
        success: false,
        projects: List()
      })
    })
}

function dispatchIssues (
  dispatch: Dispatch,
  promised: Promise<List<Issue>>
) {
  return promised
    .then((i) => dispatch({
      type: 'issues-load',
      success: true,
      issues: i
    }))
    .catch((error) => {
      console.error(error)
      dispatch({
        type: 'issues-load',
        success: false,
        issues: List()
      })
    })
}
