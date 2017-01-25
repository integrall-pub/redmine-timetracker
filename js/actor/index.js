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
