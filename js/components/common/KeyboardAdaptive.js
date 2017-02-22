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
'use strict'

import React, { Component } from 'react'
import {
  View,
  Keyboard,
  Dimensions
} from 'react-native'

export type KeyboardAdaptiveProps = {
  style: any,
  children?: any
}
type KeyboardAdaptiveState = {
  visibleHeight: number
}
export default class KeyboardAdaptive extends Component {
  props: KeyboardAdaptiveProps;
  state: KeyboardAdaptiveState;
  _keyboardShow: (e: any) => void;
  _keyboardHide: (e: any) => void;
  _keyboardShowSubscription: any;
  _keyboardHideSubscription: any;

  constructor (props: KeyboardAdaptiveProps) {
    super(props)
    this.state = {
      visibleHeight: 0
    }

    this._keyboardShow = this._keyboardShow.bind(this)
    this._keyboardHide = this._keyboardHide.bind(this)
  }

  componentDidMount () {
    this._keyboardShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardShow
    )
    this._keyboardHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardHide
    )
    this.setState({
      visibleHeight: Dimensions.get('window').height
    })
  }

  componentWillUnmount () {
    this._keyboardShowSubscription.remove()
    this._keyboardHideSubscription.remove()
  }

  _keyboardShow (e: { endCoordinates: { height: number } }) {
    this.setState({
      visibleHeight: Dimensions.get('window').height - e.endCoordinates.height
    })
  }

  _keyboardHide () {
    this.setState({
      visibleHeight: Dimensions.get('window').height
    })
  }

  render () {
    return (
      <View style={[ this.props.style, { height: this.state.visibleHeight } ]}>
        {this.props.children}
      </View>
    )
  }
}
