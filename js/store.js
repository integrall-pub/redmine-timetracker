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
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { bind } from './actor'

const Store = createStore(
  reducer,
  applyMiddleware((store) => (dispatch) => (action) => {
    console.log('Dispatching', action.type, JSON.stringify(action))
    return dispatch(action)
  })
)
Store.subscribe(bind(Store))

export default Store
