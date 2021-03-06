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

import React from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import type {
  Record,
  RecordDetails
} from '../../types'

type RecordViewProps = {
  record?: RecordDetails|null,
  onEdit?: (record: RecordDetails) => void,
  onStop?: (record: Record) => void,
  onDelete?: (record: Record) => void
}
export default function RecordView ({
  record,
  onEdit = () => {},
  onStop = () => {},
  onDelete = () => {}
}: RecordViewProps) {
  if (!record) {
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
              <Text>{issue ? ('#' + issue.id + ' ' + issue.tracker.name + ':') : ('#' + record.issue.id)}</Text>
              <View style={{ paddingRight: 2, flex: 1 }}>
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
              onPress={() => {
                if (record) {
                  if (isRecording) {
                    onStop(record.base)
                  } else {
                    onDelete(record.base)
                  }
                }
              }}>
              <Icon name={isRecording ? 'stop-circle' : 'trash'} size={22} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor='gray'
              disabled={isSynced}
              style={{
                padding: 7,
                flex: 1,
                opacity: isSynced ? 0.5 : 1.0
              }}
              onPress={() => {
                if (record) {
                  onEdit(record)
                }
              }}>
              <Icon name='pencil' size={22} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
