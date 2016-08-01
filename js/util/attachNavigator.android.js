/* @flow */
'use strict'

import {
  BackAndroid,
  Navigator
} from 'react-native'

export default function bind (navigator: () => Navigator) {
  let callback = () => {
    let nav = navigator()
    if (nav && nav.getCurrentRoutes().length > 1) {
      nav.pop()
      return true
    }
    return false
  }
  BackAndroid.addEventListener('hardwareBackPress', callback)
  return () => BackAndroid.removeEventListener('hardwareBackPress', callback)
}
