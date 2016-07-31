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

class DashboardComponent extends Component {

  componentDidMount () {
    this.props.actions.project.loadProjects()
  }

  render () {
    return (
      <View style={{ flex: 1}}>
        <Text>Dashboard</Text>
        <ScrollView>
          {this.props.projects.map((p) => (
            <ProjectView
              key={p.id}
              project={p}
              expandedIds={this.props.projectExpand}
              onExpand={(id) => this.props.actions.project.expandProject(id)}
              onRec={(id) => console.log('rec', id)} />
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
