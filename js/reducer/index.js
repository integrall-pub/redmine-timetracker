/* @flow */
import { combineReducers } from 'redux'

import lastActionReducer from './lastActionReducer'
import initReducer from './initReducer'
import endpointReducer from './endpointReducer'
import apiKeyReducer from './apiKeyReducer'
import loginReducer from './loginReducer'

import projectsReducer from './projectsReducer'
import projectExpandReducer from './projectExpandReducer'
import projectSelectReducer from './projectSelectReducer'

import issuesReducer from './issuesReducer'
import issueSearchReducer from './issueSearchReducer'

export default combineReducers({
  lastAction: lastActionReducer,
  init: initReducer,
  endpoint: endpointReducer,
  apiKey: apiKeyReducer,
  login: loginReducer,
  projects: projectsReducer,
  projectExpand: projectExpandReducer,
  projectSelect: projectSelectReducer,
  issues: issuesReducer,
  issueSearch: issueSearchReducer
})
