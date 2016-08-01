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

import { projectActions } from '../actionCreators'
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
      <View style={{ flex: 1}}>
        <View style={{ flex: 1, borderWidth: 1, borderRadius: 3, margin: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Dashboard</Text>
        </View>
        <View style={{ borderBottomWidth: 1, paddingLeft: 8 }}>
          <Text>Projects</Text>
        </View>
        <ScrollView style={{ flex: 4 }}>
          {this.props.projects.map((p) => (
            <ProjectView
              key={p.id}
              project={p}
              expandedIds={this.props.projectExpand}
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
  ({ projects, projectExpand }) => ({ projects, projectExpand }),
  (dispatch) => ({
    actions: {
      project: bindActionCreators(projectActions, dispatch)
    }
  })
)(DashboardComponent)
