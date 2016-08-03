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

import KeyboardAdaptive from './common/KeyboardAdaptive'
import ProjectView from './common/ProjectView'
import CurrentRecordView from './common/CurrentRecordView'

import {
  projectActions,
  recordActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type DashboardComponentProps = {
  onNavigate: (target: string) => void
}
class DashboardComponent extends Component {
  props: DashboardComponentProps;

  constructor (props: DashboardComponentProps) {
    super(props)
  }

  componentDidMount () {
    this.props.actions.project.loadProjects()
  }

  render () {
    console.log('dashboard', this.props.records.current)
    return (
      <View>
        <View style={{ borderWidth: 1, borderRadius: 3, margin: 5, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
          <CurrentRecordView
            currentRecord={this.props.records.current}
            onStop={this.props.actions.record.stopRecording} />
        </View>
        <View style={{ borderBottomWidth: 1, paddingLeft: 8 }}>
          <Text>Projects</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {this.props.projects.map((p) => (
            <ProjectView
              key={p.id}
              project={p}
              expandedIds={this.props.projectExpand}
              disabled={this.props.records.current !== null}
              onExpand={(id) => this.props.actions.project.expandProject(id)}
              onRec={(id) => {
                console.log('rec', id)
                this.props.actions.project.selectProject(id)
                this.props.onNavigate('startRec')
              }} />
          ))}
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  ({ projects, projectExpand, records }) => ({ projects, projectExpand, records }),
  (dispatch) => ({
    actions: {
      project: bindActionCreators(projectActions, dispatch),
      record: bindActionCreators(recordActions, dispatch)
    }
  })
)(DashboardComponent)
