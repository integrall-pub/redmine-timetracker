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
