/* @flow */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux'

type Props = {
  router: any,
  initial: string,
  actions: any,
  children?: any
}
export function RouterStatic ({
  router,
  initial,
  actions,
  children = null
}: Props) {
  return (
    <Router router={router} actions={actions.routerActions} initial={initial}>
      {children}
    </Router>
  )
}

export default connect(
  ({ router }) => ({ router }),
  (dispatch) => ({ actions: { routerActions: bindActionCreators(routerActions, dispatch) } } )
)(RouterStatic)
