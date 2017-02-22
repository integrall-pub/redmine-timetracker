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
import { combineReducers } from 'redux'

import { reducer as router } from 'react-native-router-redux'

import lastActionReducer from './lastActionReducer'
import initReducer from './initReducer'
import endpointReducer from './endpointReducer'
import apiKeyReducer from './apiKeyReducer'
import loginReducer from './loginReducer'

import projectsReducer from './projectsReducer'
import projectExpandReducer from './projectExpandReducer'
import projectSelectReducer from './projectSelectReducer'

import issuesReducer from './issuesReducer'

import recordReducer from './recordReducer'
import recordEditReducer from './recordEditReducer'
import recordDetailsReducer from './recordDetailsReducer'

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
  records: recordReducer,
  recordEdit: recordEditReducer,
  recordDetails: recordDetailsReducer,
  router: router
})
