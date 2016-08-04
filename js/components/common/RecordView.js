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
import moment from 'moment'

import type { Issue, Record } from '../../types'

type RecordViewProps = {
  record?: Record,
  onEdit?: (record: Record) => void,
  onStop?: (record: Record) => void,
  onDelete?: (record: Record) => void
}
export default function RecordView ({
  record = null,
  onEdit = () => {},
  onStop = () => {},
  onDelete = () => {}
}: RecordViewProps) {
  if (record === null) {
    return (
      <View style={{ borderWidth: 1, borderRadius: 3, margin: 5, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tracking in progress</Text>
      </View>
    )
  } else {
    let issue = record.issue
    let isRecording = record.endTime === ''
    let isSynced = record.remoteId !== -1
    let endTime = isRecording ? moment() : moment(record.endTime)
    return (
      <View style={{ borderWidth: 1, borderRadius: 3, margin: 5, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignSelf: 'stretch', flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text>{record.project ? record.project.name : 'Project'}</Text>
                <Text>Development</Text>
              </View>
              <View style={{ paddingRight: 8 }}>
                <Text style={{ textAlign: 'right' }}>{moment(record.startTime).format('H:mm')}</Text>
                <Text style={{ textAlign: 'right' }}>
                  {moment.duration(endTime.diff(moment(record.startTime))).asHours().toFixed(2)}h
                  </Text>
              </View>
            </View>
            <View style={{ paddingTop: 3, flexDirection: 'row' }}>
              <Text>{issue ? ('#' + issue.id + ' ' + issue.tracker.name + ':') : ('#' + record.issueId)}</Text>
              <View  style={{ paddingRight: 2, flex: 1 }}>
                <Text>{issue ? (issue.subject) : ''}</Text>
                <Text style={{ paddingTop: 2 }}>{record.comment}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor='gray'
              style={{ padding: 7, flex: 1 }}
              onPress={() => (
                (isRecording ? onStop : onDelete)(record)
              )}>
              <Icon name={isRecording ? 'stop-circle' : 'trash'} size={22} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor='gray'
              disabled={isSynced}
              style={{
                padding: 7,
                flex: 1,
                opacity: isSynced? 0.5 : 1.0
              }}
              onPress={() => onEdit(record)}>
              <Icon name='pencil' size={22} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
