/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator
} from 'react-native'
import { Provider, connect } from 'react-redux'

import Store from './store'

import {
  SplashComponent,
  EndpointComponent,
  LoginComponent,
  DashboardComponent
} from './components'

const routes = {
  endpoint: {
    attach: (navigator) => (
      <EndpointComponent onContinue={() => navigator.push(routes.login)} />
    )
  },
  login: {
    attach: (navigator) => (
      <LoginComponent onContinue={() => navigator.push(routes.dashboard)} />
    )
  },
  dashboard: {
    attach: (navigator) => (
      <DashboardComponent />
    )
  }
}

type RTTState = {
  init: InitState,
  unsubscribe: () => void
}
export default class RedmineTimeTracker extends Component {
  state: RTTState;

  constructor (props: any) {
    super(props)
    this.state = {
      init: Store.getState().init
    }

    this._update = this._update.bind(this)
  }
  componentDidMount () {
    this.setState({
      unsubscribe: Store.subscribe(this._update)
    })
  }

  componentWillUnmount () {
    this.state.unsubscribe()
  }

  _update () {
    this.setState({
      init: Store.getState().init
    })
  }

  render() {
    return (
      <Provider store={Store}>
        {this.state.init === 'waiting'
          ? (<SplashComponent />)
          : (
            <Navigator
              initialRoute={this.state.init === 'success'
                ? routes.dashboard
                : routes.endpoint}
              renderScene={(route, navigator) => route.attach(navigator)} />
          )}
      </Provider>
    )
  }
}
