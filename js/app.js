/* @flow */
'use strict'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  NavBar,
  Route,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux'

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

import Router from './components/common/Router'
// $FlowFixMe
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
            break

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

// define your routes
const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18
  },
  statusStyle: 'light-content',
  tabBar: TabBar
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

  render () {
    /* return (
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
    ) */

    return (
      <Provider store={Store}>
        <Router initial={'splash'}>
          <Schema name='default' {...defaultSchema} />

          <Route name='splash' component={SplashComponent} type='reset' hideNavBar />
          <Route name='endpoint' component={EndpointComponent} hideNavBar />
          <Route name='login' component={LoginComponent} hideNavBar />
          <Route name='start-rec' component={StartRecComponent} hideNavBar />

          <TabRoute name='tab-bar'>
            <Route name='dashboard' component={DashboardComponent} />
            <Route name='history' component={HistoryComponent} />
          </TabRoute>
        </Router>
      </Provider>
    )
  }
}
