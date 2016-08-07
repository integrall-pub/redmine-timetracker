/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Dimensions
} from 'react-native'

type StyleProp = number|string

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
