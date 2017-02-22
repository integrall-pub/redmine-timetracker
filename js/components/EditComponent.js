/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Picker,
  Text,
  TextInput
} from 'react-native'
import { List } from 'immutable'

import type {
  Issue,
  Project,
  RecordEdit
} from '../types'

import KeyboardAdaptiveScroll from './common/KeyboardAdaptiveScroll'
// $FlowFixMe
import DatePicker from './common/DatePicker'

import styles from './styles/fullscreen-form'

import {
  recordEditActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type EditComponentProps = {
  projects: List<Project>,
  recordEdit: RecordEdit,
  actions: {
    recordEdit: {
      editComment: (comment: string) => void,
      search: (val: string) => void,
      selectIssue: (issue: Issue) => void,
      clear: () => void
    }
  }
}
class EditComponent extends Component {
  props: EditComponentProps;

  render () {
    let {
      projects = List(),
      recordEdit
    } = this.props
    return (
      <KeyboardAdaptiveScroll style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={styles.title}>Edit</Text>

        <Text style={styles.subtitle}>Project</Text>
        <Picker
          selectedValue={recordEdit.record.projectId}>
          {projects.flatMap(itemizeProject)}
        </Picker>

        <Text style={styles.subtitle}>Issue select</Text>
        <Picker
          selectedValue={'asd'}>
          <Picker.Item label='Issue1' value='asd' />
          <Picker.item label='Issue2' value='qwe' />
        </Picker>

        <Text style={styles.subtitle}>Comment edit</Text>
        <TextInput
          ref='comment'
          value={recordEdit.record.comment}
          onChangeText={this.props.actions.recordEdit.editComment}
          style={styles.multilineInput}
          multiline />

        <Text style={styles.subtitle}>Start time</Text>
        <DatePicker
          value={recordEdit.record.startTime}
          onChange={(newVal) => console.log(newVal.format())} />

        <Text style={styles.subtitle}>End time</Text>
        <DatePicker value={recordEdit.record.endTime} />
      </KeyboardAdaptiveScroll>
    )
  }
}

export default connect(
  ({ projects, recordEdit }) => ({ projects, recordEdit }),
  (dispatch) => ({
    actions: {
      recordEdit: bindActionCreators(recordEditActions, dispatch)
    }
  })
)(EditComponent)

const itemizeProject = (project: Project): List<any> => {
  let children = (project.children || List()).map(itemizeProject)
  if (project.hasTracking) {
    return List.of(
      <Picker.Item
        label={project.name}
        value={project.id} />
    ).concat(children)
  } else {
    return children
  }
}
