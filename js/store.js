/* @flow */
import { createStore } from 'redux'
import reducer from './reducer'
import { bind } from './actor'

const Store = createStore(reducer)
Store.subscribe(bind(Store))

export default Store
