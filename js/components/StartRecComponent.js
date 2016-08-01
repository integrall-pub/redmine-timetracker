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
  issueSearchActions
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

  render () {
    return (
      <KeyboardAdaptive style={[styles.container]}>
        <Text style={styles.title}>No! What are you doing, yes?</Text>
        <Text style={styles.subtitle}>Issue</Text>
        <Typeahead
          value={this.props.issueSearch.search}
          style={styles.input}
          onChange={this.props.actions.search.search}
          onSelect={this.props.actions.search.select}
          suggest={this.props.issueSearch.active}
          options={this.props.issues}
          keys={['id', 'tracker.name', 'subject']}
          container={({ option }) => (<Text>{'#' + option.id + ' ' + option.tracker.name + ': ' + option.subject}</Text>)}>

            <Text style={styles.subtitle}>Description (optional)</Text>
            <TextInput style={styles.multilineInput} multiline />

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <View style={{ flex: 0.5, flexDirection: 'row' }}>
                <Icon.Button
                  name='play'
                  size={18}>
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
  ({ projects, issues, issueSearch }) => ({ projects, issues, issueSearch }),
  (dispatch) => ({
    actions: {
      issue: bindActionCreators(issueActions, dispatch),
      search: bindActionCreators(issueSearchActions, dispatch)
    }
  })
)(StartRecComponent)
