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

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  actions as routerActions,
  Router
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
  (dispatch) => ({ actions: { routerActions: bindActionCreators(routerActions, dispatch) } })
)(RouterStatic)
