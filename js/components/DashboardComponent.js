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
import ProjectView from './common/ProjectView'
import RecordView from './common/RecordView'

import {
  issueActions,
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
    return (
      <View>
        <Navbar active={'dashboard'} onHistory={() => this.props.onNavigate('history')} />
        <RecordView
          record={this.props.records.current}
          onStop={this.props.actions.record.stopRecording} />
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
  ({ issues, projects, projectExpand, records }) => ({ issues, projects, projectExpand, records }),
  (dispatch) => ({
    actions: {
      project: bindActionCreators(projectActions, dispatch),
      record: bindActionCreators(recordActions, dispatch),
      issue: bindActionCreators(issueActions, dispatch)
    }
  })
)(DashboardComponent)
