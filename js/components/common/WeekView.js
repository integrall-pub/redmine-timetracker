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
  week: moment,
  records?: {
    current?: Record,
    all: List<Record>
  }
}
export default function WeekView ({
  week,
  records = {
    current: null,
    all: List()
  }
}: WeekViewProps) {
  let start = week.clone().startOf('isoWeek')
  let end = week.clone().endOf('isoWeek')
  let weekRecords = records.all.filter(
    (r) => (
      r.endTime !== '' &&
      moment(r.startTime).isBetween(start, end)
    )
  )
  return (
    <View style={{ flexDirection: 'row', marginTop: 3 }}>
      <DayView records={weekRecords} day={start} />
      <DayView records={weekRecords} day={start.clone().add(1, 'day')} />
      <DayView records={weekRecords} day={start.clone().add(2, 'day')} />
      <DayView records={weekRecords} day={start.clone().add(3, 'day')} />
      <DayView records={weekRecords} day={start.clone().add(4, 'day')} />
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <DayView records={weekRecords} day={start.clone().add(5, 'day')} />
        <DayView records={weekRecords} day={start.clone().add(6, 'day')} />
      </View>
    </View>
  )
}

type DayViewProps = {
  day: moment,
  records?: List
}
const DayView = ({
  day,
  records = List()
}: DayViewProps) => (
  <View style={{ flex: 1, flexDirection: 'column', borderLeftWidth: 1 }}>
    <Text style={{ textAlign: 'center' }}>{day.format('dd')}</Text>
    <Text style={{ textAlign: 'center' }}>{day.format('D.M.')}</Text>
    <View style={{ flexDirection: 'row', height: 100 }}>
      {records.filter((r) => moment(r.startTime).isBetween(day.clone().startOf('day'), day.clone().endOf('day'))).map((r) => (
        <EntryView key={r.id} start={r.startTime} end={r.endTime} />
      ))}
    </View>
  </View>
)

type EntryViewProps = {
  start: string,
  end: string
}
const EntryView = ({
  start,
  end
}: EntryViewProps) => {
  let startAsHours = moment.duration(moment(start).diff(moment(start).startOf('day'))).asHours()
  let durationAsHours = moment.duration(moment(end).diff(moment(start))).asHours()
  return (
    <View style={{
      position: 'absolute',
      left: 0,
      top: startAsHours / 24 * 100,
      right: 0,
      height: durationAsHours / 24 * 100,
      backgroundColor: 'lightblue',
      borderWidth: 1,
      borderRadius: 2,
      margin: 3
    }} />
  )
}
