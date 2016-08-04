/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import { List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import type { Issue, Record } from '../../types'

type WeekViewProps = {
  records: List<Record>
}
export default function WeekView ({
  records = List()
}: WeekViewProps) {
  return (
    <View>
      <Text>Greetings from WeekView</Text>
    </View>
  )
}
