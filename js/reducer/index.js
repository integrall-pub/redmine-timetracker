/* @flow */
import { combineReducers } from 'redux'

import lastActionReducer from './lastActionReducer'
import initReducer from './initReducer'
import endpointReducer from './endpointReducer'
import apiKeyReducer from './apiKeyReducer'
import loginReducer from './loginReducer'

import projectsReducer from './projectsReducer'
import projectExpandReducer from './projectExpandReducer'

export default combineReducers({
  lastAction: lastActionReducer,
  init: initReducer,
  endpoint: endpointReducer,
  apiKey: apiKeyReducer,
  login: loginReducer,
  projects: projectsReducer,
  projectExpand: projectExpandReducer
})
