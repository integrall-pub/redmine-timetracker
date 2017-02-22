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
import type { Store, Dispatch } from 'redux'

import dataAccessActor from './dataAccessActor'
import * as dao from '../dao'

type Actor = (store: Store, dispatch: Dispatch) => void

const createBind = (
  ...actors: Array<Actor>
) => (
  store: Store
) => {
  let acting = false
  return () => {
    if (!acting) {
      acting = true
      let state = store.getState()
      let dispatch = store.dispatch
      actors.forEach((a) => a(state, dispatch))
      acting = false
    }
  }
}

export const bind = createBind(
  dataAccessActor(dao)
)
