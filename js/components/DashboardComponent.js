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
import { List } from 'immutable'

import type {
  Project,
  Record,
  RecordDetailsState
} from '../types'

import Navbar from './common/Navbar'
import ProjectView from './common/ProjectView'
import RecordView from './common/RecordView'

import {
  issueActions,
  projectActions,
  recordActions,
  recordEditActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type DashboardComponentProps = {
  recordDetails: RecordDetailsState,
  projects: List<Project>,
  projectExpand: List<number>,
  onNavigate: (target: string) => void,
  actions: {
    project: {
      loadProjects: () => void,
      expandProject: (id: number) => void,
      selectProject: (id: number) => void
    },
    record: {
      stopRecording: (record: Record) => void
    },
    recordEdit: {
      load: (record: Record) => void
    }
  }
}
class DashboardComponent extends Component {
  props: DashboardComponentProps;

  componentDidMount () {
    this.props.actions.project.loadProjects()
  }

  render () {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Navbar active={'dashboard'} onHistory={() => this.props.onNavigate('history')} />
        <RecordView
          record={this.props.recordDetails.current}
          onEdit={() => {
            let current = this.props.recordDetails.current
            if (current) {
              this.props.actions.recordEdit.load(current.base)
              this.props.onNavigate('edit')
            }
          }}
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
              disabled={this.props.recordDetails.current !== null}
              onExpand={(id) => this.props.actions.project.expandProject(id)}
              onRec={(id) => {
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
  ({ projects, projectExpand, records, recordDetails }) => ({ projects, projectExpand, recordDetails }),
  (dispatch) => ({
    actions: {
      project: bindActionCreators(projectActions, dispatch),
      record: bindActionCreators(recordActions, dispatch),
      recordEdit: bindActionCreators(recordEditActions, dispatch),
      issue: bindActionCreators(issueActions, dispatch)
    }
  })
)(DashboardComponent)
