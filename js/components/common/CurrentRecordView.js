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
import Icon from 'react-native-vector-icons/FontAwesome'

type CurrentRecordViewProps = {
  currentRecord?: Record,
  onEdit?: (record: Record) => void,
  onStop?: (record: Record) => void
}
export default function CurrentRecordView ({
  currentRecord = null,
  onEdit = () => {},
  onStop = () => {}
}: CurrentRecordViewProps) {
  if (currentRecord === null) {
    return (<Text>No tracking in progress</Text>)
  } else {
    return (
      <View style={{ alignSelf: 'stretch', flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>Project</Text>
          <Text>#133 Task: Do the thing</Text>
          <Text>{currentRecord.comment}</Text>
          <Text>Development</Text>
        </View>
        <View style={{ paddingTop: 8, paddingRight: 8 }}>
          <Text>Start: 8:05</Text>
          <Text>1.32h</Text>
        </View>
        <View>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor='gray'
            style={{ padding: 7 }}
            onPress={() => onStop(currentRecord)}>
            <Icon name='stop-circle' size={22} />
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.8}
            underlayColor='gray'
            style={{ padding: 7 }}
            onPress={() => onEdit(currentRecord)}>
            <Icon name='pencil' size={22} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
