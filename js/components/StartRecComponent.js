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
import Icon from 'react-native-vector-icons/FontAwesome'

import KeyboardAdaptive from './common/KeyboardAdaptive'
import styles from './styles/fullscreen-form'
import Typeahead from './common/Typeahead'
import ProjectView from './common/ProjectView'

import {
  issueActions,
  recordEditActions,
  recordActions
} from '../actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

type StartRecComponentProps = {
  onNavigate: (target: string) => void
}
class StartRecComponent extends Component {
  props: StartRecComponentProps;

  constructor (props: StartRecComponentProps) {
    super(props)
  }

  componentDidMount () {
    this.props.actions.issue.loadIssues()
  }

  componentWillUnmount () {
    this.props.actions.recordEdit.clear()
    // this.refs.search.blur() // TODO: Make blurrable
    this.refs.comment.blur()
  }

  render () {
    return (
      <KeyboardAdaptive style={[styles.container]}>
        <Text style={styles.title}>No! What are you doing, yes?</Text>
        <Text style={styles.subtitle}>Issue</Text>
        <Typeahead
          ref='search'
          value={this.props.recordEdit.search}
          style={styles.input}
          onChange={this.props.actions.recordEdit.search}
          onSelect={this.props.actions.recordEdit.selectIssue}
          suggest={this.props.recordEdit.searchActive}
          options={this.props.issues}
          keys={['id', 'tracker.name', 'subject']}
          container={({ option }) => (<Text>{'#' + option.id + ' ' + option.tracker.name + ': ' + option.subject}</Text>)}>

            <Text style={styles.subtitle}>Description (optional)</Text>
            <TextInput
              ref='comment'
              value={this.props.recordEdit.record.comment}
              onChangeText={this.props.actions.recordEdit.editComment}
              style={styles.multilineInput}
              multiline />

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <View style={{ flex: 0.5, flexDirection: 'row' }}>
                <Icon.Button
                  name='play'
                  size={18}
                  onPress={() => this.props.actions.record.startRecording(
                    this.props.recordEdit.record.projectId,
                    this.props.recordEdit.record.issueId,
                    this.props.recordEdit.record.comment
                  )}>
                  Start
                </Icon.Button>
              </View>
            </View>

          </Typeahead>
      </KeyboardAdaptive>
    )
  }
}

export default connect(
  ({ projects, projectSelect, issues, recordEdit }) => ({ projects, projectSelect, issues, recordEdit }),
  (dispatch) => ({
    actions: {
      issue: bindActionCreators(issueActions, dispatch),
      recordEdit: bindActionCreators(recordEditActions, dispatch),
      record: bindActionCreators(recordActions, dispatch)
    }
  })
)(StartRecComponent)
