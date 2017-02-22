/* @flow */
'use strict'

import React from 'react'
import {
  Text,
  View
} from 'react-native'

export default function NavTitle ({ children }: { children?: any }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>{children}</Text>
    </View>
  )
}
