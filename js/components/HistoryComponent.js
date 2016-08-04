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

import Navbar from './common/Navbar'
import RecordView from './common/RecordView'
import WeekView from './common/WeekView'

import {
  issueActions,
  projectActions,
  recordActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type HistoryComponentProps = {
}
class HistoryComponent extends Component {
  props: HistoryComponentProps;

  constructor (props: HistoryComponentProps) {
    super(props)
  }

  render () {
    return (
      <View>
        <Navbar active={'history'} onDashboard={() => this.props.onNavigate()} />
        <View>
          <WeekView records={this.props.records} />
        </View>
        <RecordView record={this.props.records.current} />
        <View>
          <Text>Upload controls here</Text>
        </View>
      </View>
    )
  }
}

export default connect(
  ({ records }) => ({ records }),
  (dispatch) => ({})
)(HistoryComponent)
