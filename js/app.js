/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'

import Store from './store'

import {
  SplashComponent,
  EndpointComponent,
  LoginComponent,
  DashboardComponent,
  StartRecComponent,
  HistoryComponent
} from './components'

import NavTitle from './components/common/NavTitle'
import attachNavigator from './util/attachNavigator'

const routes = {
  endpoint: {
    attach: (navigator) => (
      <EndpointComponent onContinue={() => navigator.push(routes.login)} />
    )
  },
  login: {
    attach: (navigator) => (
      <LoginComponent onContinue={() => navigator.resetTo(routes.dashboard)} />
    )
  },
  dashboard: {
    attach: (navigator) => (
      <DashboardComponent onNavigate={(target: string) => {
        console.log(target)
        switch (target) {
          case 'startRec':
            // falls through
          case 'history':
            navigator.push(routes[target])
            break
        }
      }} />
    )
  },
  startRec: {
    attach: (navigator) => (
      <StartRecComponent />
    )
  },
  history: {
    attach: (navigator) => (
      <HistoryComponent onNavigate={() => navigator.pop()} />
    )
  }
}

type RTTState = {
  init: InitState,
  unsubscribe: () => void
}
export default class RedmineTimeTracker extends Component {
  state: RTTState;
  _detachNavigator: () => void;

  constructor (props: any2) {
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
    this._detachNavigator = attachNavigator(() => this.refs.navigator)
  }

  componentWillUnmount () {
    this.state.unsubscribe()
    this._detachNavigator()
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
              ref='navigator'
              initialRoute={this.state.init === 'success'
                ? routes.dashboard
                : routes.endpoint}
              renderScene={(route, navigator) => route.attach(navigator)} />
          )}
      </Provider>
    )
  }
}
