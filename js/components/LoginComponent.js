/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Alert,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

import type {
  ApiKey,
  Login
} from '../types'

import KeyboardAdaptive from './common/KeyboardAdaptive'
import styles from './styles/fullscreen-form'

import { loginActions } from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type LoginComponentProps = {
  login: Login,
  apiKey: ApiKey,
  actions: {
    dismissFail: () => void,
    setUsername: (username: string) => void,
    setPassword: (password: string) => void,
    tryLogin: (login: Login) => void
  },
  // onLogin: () => void
}
class LoginComponent extends Component {
  props: LoginComponentProps;

  constructor (props: LoginComponentProps) {
    super(props)
  }

  render () {
    if (this.props.login.fail) {
      Alert.alert(
        'Login failed',
        'Please try again',
        [
          { text: 'Ok', onPress: () => this.props.actions.dismissFail() }
        ]
      )
    }
    return (
      <KeyboardAdaptive style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Enter your Redmine credentials
          </Text>

          <Text style={styles.subtitle}>
            Username
          </Text>
          <TextInput
            ref='usernameInput'
            editable={!this.props.login.progress && this.props.apiKey.empty}
            value={this.props.login.username}
            style={styles.input}
            placeholder='username'
            onChangeText={(text) => this.props.actions.setUsername(text)} />

          <Text style={styles.subtitle}>
            Password
          </Text>
          <TextInput
            ref='passwordInput'
            secureTextEntry
            editable={!this.props.login.progress && this.props.apiKey.empty}
            value={this.props.login.password}
            style={styles.input}
            placeholder='*********'
            onChangeText={(text) => this.props.actions.setPassword(text)} />

          <TouchableHighlight
            disabled={this.props.login.progress}
            activeOpacity={0.99}
            underlayColor='gray'
            style={[
              styles.buttonContainer,
              { marginTop: 30 }
            ]}
            onPress={() => {
              this.refs.usernameInput.blur()
              this.refs.passwordInput.blur()
              this.props.actions.tryLogin(this.props.login)
            }}>
            <Text style={styles.button}>
              {this.props.apiKey.empty
                ? 'Tap to login'
                : 'Continue'}
            </Text>
          </TouchableHighlight>
        </View>
      </KeyboardAdaptive>
    )
  }
}

export default connect(
  ({ login, apiKey }) => ({ login, apiKey }),
  (dispatch) => ({
    actions: bindActionCreators(loginActions, dispatch)
  })
)(LoginComponent)
