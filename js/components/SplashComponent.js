/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

import { initActions } from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type SplashComponentProps = {
  actions: {
    init: {
      load: () => void
    }
  }
}
class SplashComponent extends Component {
  props: SplashComponentProps;

  componentDidMount () {
    this.props.actions.init.load()
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
      init: bindActionCreators(initActions, dispatch)
    }
  })
)(SplashComponent)
