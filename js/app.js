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

import type {
  InitState
} from './types'

import Store from './store'

import {
  SplashComponent,
  EndpointComponent,
  LoginComponent,
  DashboardComponent,
  StartRecComponent,
  HistoryComponent,
  EditComponent
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
        console.log('nav tgt', target)
        switch (target) {
          case 'startRec':
            // falls through
          case 'history':
            // falls through
          case 'edit':
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
      <HistoryComponent onNavigate={(target: string) => {
        switch (target) {
          case 'dashboard':
            navigator.pop()
            break;

          case 'edit':
            navigator.push(routes['edit'])
        }
      }} />
    )
  },
  edit: {
    attach: (navigator) => (
      <EditComponent onNavigate={() => navigator.pop()} />
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
  _update: () => void;

  constructor (props: any) {
    super(props)
    this.state = {
      init: Store.getState().init,
      unsubscribe: () => {}
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
