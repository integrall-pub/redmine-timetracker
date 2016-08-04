/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'


import { initActions, recordActions } from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type SplashComponentProps = {
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  onLogin: () => void
}
class SplashComponent extends Component {
  props: SplashComponentProps;

  constructor (props: SplashComponentProps) {
    super(props)
  }

  componentDidMount () {
    this.props.actions.init.load()
    setTimeout(() => this.props.actions.record.migrate(), 1000) // TODO: Timeout...
  }

  render () {
    return (
      <View><Text>Splash</Text></View>
    )
  }
}

export default connect(
  ({ endpoint, apiKey }) => ({ endpoint, apiKey }),
  (dispatch) => ({
    actions: {
      init: bindActionCreators(initActions, dispatch),
      record: bindActionCreators(recordActions, dispatch)
    }
  })
)(SplashComponent)
