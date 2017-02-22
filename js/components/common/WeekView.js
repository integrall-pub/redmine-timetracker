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
import { List } from 'immutable'
// import ViewPager from 'react-native-viewpager'
import ViewPager from './ViewPager'
// import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import type {
  Record,
  RecordDetails
} from '../../types'

type WeekViewProps = {
  week: moment,
  records: List<Record>,
  selected?: RecordDetails
}
export default function WeekView ({
  records,
  selected
}: WeekViewProps) {
  return (
    <ViewPager
      initialPage={0}
      dataSource={buildDataSource(records)}
      renderPage={renderWeek({ records, selected })}
      isLoop={false}
      autoPlay={false} />
  )
}

const buildDataSource = (records: List<Record>) => {
  let ds = new ViewPager.DataSource(
    (idx: number) => (moment(records.last() ? records.last().startTime : moment())).add(idx, 'week')
  )
  console.log('data', ds.getPageData(0))
  return ds
}

type DataProps = {
  records: List<Record>,
  selected?: RecordDetails
}
const renderWeek = ({
  records = List(),
  selected
}: DataProps) => (week) => {
  console.log('renderWeek called')
  let start = week.clone().startOf('isoWeek')
  let end = week.clone().endOf('isoWeek')
  let weekRecords = records.filter(
    (r) => (
      r.endTime !== '' &&
      moment(r.startTime).isBetween(start, end)
    )
  )
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 3 }}>
      <DayView records={weekRecords} day={start} selected={selected} />
      <DayView records={weekRecords} day={start.clone().add(1, 'day')} selected={selected} />
      <DayView records={weekRecords} day={start.clone().add(2, 'day')} selected={selected} />
      <DayView records={weekRecords} day={start.clone().add(3, 'day')} selected={selected} />
      <DayView records={weekRecords} day={start.clone().add(4, 'day')} selected={selected} />
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <DayView records={weekRecords} day={start.clone().add(5, 'day')} selected={selected} />
        <DayView records={weekRecords} day={start.clone().add(6, 'day')} selected={selected} />
      </View>
    </View>
  )
}

type DayViewProps = {
  day: moment,
  records?: List<Record>,
  selected?: RecordDetails
}
const DayView = ({
  day,
  records = List(),
  selected
}: DayViewProps) => (
  <View style={{ flex: 1, flexDirection: 'column', borderLeftWidth: 1 }}>
    <Text style={{ textAlign: 'center' }}>{day.format('dd')}</Text>
    <Text style={{ textAlign: 'center' }}>{day.format('D.M.')}</Text>
    <View style={{ flexDirection: 'row', height: 100 }}>
      {records.filter((r) => moment(r.startTime).isBetween(day.clone().startOf('day'), day.clone().endOf('day'))).map((r) => (
        <EntryView key={r.id} record={r} selected={selected && r.id === selected.id} />
      ))}
    </View>
  </View>
)

type EntryViewProps = {
  record: Record,
  selected?: boolean,
  onPress?: (id: number) => void
}
const EntryView = ({
  record,
  selected = false,
  onPress = () => {}
}: EntryViewProps) => {
  let startAsHours = moment.duration(
    moment(record.startTime).diff(
      moment(record.startTime).startOf('day')
    )
  ).asHours()
  let durationAsHours = moment.duration(
    moment(record.endTime).diff(
      moment(record.startTime)
    )
  ).asHours()
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor='gray'
      onPress={() => onPress(record.id)}
      style={{
        position: 'absolute',
        left: 0,
        top: startAsHours / 24 * 100,
        right: 0,
        height: durationAsHours / 24 * 100,
        backgroundColor: 'lightblue',
        borderColor: selected ? 'gray' : 'lightblue',
        borderWidth: selected ? 2 : 1,
        borderRadius: 3,
        margin: 3
      }}>
      <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
    </TouchableHighlight>
  )
}
