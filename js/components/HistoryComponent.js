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
  Text,
  View
} from 'react-native'
import moment from 'moment'
import { List } from 'immutable'

import type {
  Record,
  RecordDetailsState
} from '../types'

import Navbar from './common/Navbar'
import RecordView from './common/RecordView'
import WeekView from './common/WeekView'
import RecordSelector from './common/RecordSelector'

import {
  recordActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type HistoryComponentProps = {
  records: List<Record>,
  recordDetails: RecordDetailsState,
  actions: {
    record: {
      select: (record: Record) => void
    }
  },
  onNavigate: () => void
}
class HistoryComponent extends Component {
  props: HistoryComponentProps;

  componentDidMount () {
    if (this.props.records.size > 0) {
      this.props.actions.record.select(this.props.records.last())
    }
  }

  render () {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Navbar active={'history'} onDashboard={this.props.onNavigate} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <WeekView
              week={moment().startOf('isoWeek')}
              records={this.props.records} />
          </View>
          <RecordSelector
            records={this.props.records}
            selected={this.props.recordDetails.selected}
            onSelect={this.props.actions.record.select} />
          <RecordView
            record={this.props.recordDetails.selected}
            onEdit={this.props.onNavigate('edit')} />
          <View>
            <Text>Upload controls here</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  ({ records, recordDetails }) => ({ records, recordDetails }),
  (dispatch) => ({
    actions: {
      record: bindActionCreators(recordActions, dispatch)
    }
  })
)(HistoryComponent)
