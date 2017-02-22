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
  ScrollView,
  Keyboard
} from 'react-native'

export type KeyboardAdaptiveScrollProps = {
  style: any,
  children?: any
}
type KeyboardAdaptiveScrollState = {
  kbHeight: number
}
export default class KeyboardAdaptiveScroll extends Component {
  props: KeyboardAdaptiveScrollProps;
  state: KeyboardAdaptiveScrollState;
  _keyboardShow: (e: any) => void;
  _keyboardHide: (e: any) => void;
  _keyboardShowSubscription: any;
  _keyboardHideSubscription: any;

  constructor (props: KeyboardAdaptiveScrollProps) {
    super(props)
    this.state = {
      kbHeight: 0
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
      kbHeight: 0
    })
  }

  componentWillUnmount () {
    this._keyboardShowSubscription.remove()
    this._keyboardHideSubscription.remove()
  }

  _keyboardShow (e: { endCoordinates: { height: number } }) {
    this.setState({
      kbHeight: e.endCoordinates.height
    })
  }

  _keyboardHide () {
    this.setState({
      kbHeight: 0
    })
  }

  render () {
    return (
      <ScrollView style={[ this.props.style, { marginBottom: this.state.kbHeight } ]}>
        {this.props.children}
      </ScrollView>
    )
  }
}
