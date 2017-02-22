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

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from 'immutable'

import type {
  Project
} from '../../types'

type ProjectViewProps = {
  project: Project,
  expandedIds?: List<number>,
  disabled?: boolean,
  onExpand?: (id: number) => void,
  onRec?: (id: number) => void
}
export default function ProjectView ({
  project,
  expandedIds = List(),
  disabled = false,
  onExpand = () => {},
  onRec = () => {}
}: ProjectViewProps) {
  return (
    <View>
      <View style={[
        styles.projectRow,
        depthStyles(project.depth || 0)
      ]}>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='gray'
          disabled={!project || !project.children || project.children.size === 0}
          style={styles.projectButton}
          onPress={() => onExpand(project.id)}>
          <View style={{ flexDirection: 'row', flex: 1 }}>

            <ExpandCaret
              project={project}
              expanded={expandedIds.includes(project.id)} />

            <Text style={styles.projectName}>
              {Array(project.depth).join('  ')}{project.name}
            </Text>

          </View>
        </TouchableHighlight>
        <RecButton
          project={project}
          disabled={disabled}
          onPress={() => onRec(project.id)} />
      </View>

      {(expandedIds.includes(project.id)
        ? project.children || List()
        : List()).map((c) => (
          <ProjectView
            key={c.id}
            project={c}
            expandedIds={expandedIds}
            disabled={disabled}
            onExpand={onExpand}
            onRec={onRec} />
      ))}

    </View>
  )
}

const ExpandCaret = ({ project, expanded }: { project: Project, expanded: boolean }) => (
  <View style={styles.expandCaret}>
    {project && project.children && project.children.size > 0
      ? <Icon name={expanded ? 'angle-up' : 'angle-down'} size={18} color='#333333' />
      : null}
  </View>
)

type RecButtonProps = {
  project: Project,
  disabled?: boolean,
  onPress?: () => void
}
const RecButton = ({
  project,
  disabled = false,
  onPress = () => {}
}: RecButtonProps) => (
  project && project.hasTracking
    ? (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor='gray'
        style={styles.recButton}
        disabled={disabled}
        onPress={onPress}>
        <Icon name='play' size={18} color='#333333' style={{ opacity: disabled ? 0.4 : 1.0 }} />
      </TouchableHighlight>
    ) : null
)

const depthStyles = (depth: number) => ({
  backgroundColor: depth % 2 === 0
    ? 'rgba(255,255,255,0)'
    : '#F0F0F1',
  paddingLeft: 2 + depth * 15
})

const styles = StyleSheet.create({
  projectRow: {
    borderBottomWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    flex: 1
  },
  projectButton: {
    flex: 5,
    padding: 10
  },
  projectName: {
    fontSize: 18,
    flexDirection: 'row',
    flex: 1
  },
  expandCaret: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25
  },
  recButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  }
})
