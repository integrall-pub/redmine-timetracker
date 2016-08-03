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
import { List } from 'immutable'

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
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor='gray'
        disabled={!project || !project.children || project.children.size === 0}
        style={[
          styles.projectRow,
          depthStyles(project.depth)
          ]}
        onPress={() => onExpand(project.id)}>
        <View style={{ flexDirection: 'row', flex: 1 }}>

          <ExpandCaret project={project} />

          <Text style={styles.projectName}>
            {Array(project.depth).join('  ')}{project.name}
          </Text>

          <RecButton
            project={project}
            disabled={disabled}
            onPress={() => onRec(project.id)} />

        </View>
      </TouchableHighlight>

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

const ExpandCaret = ({ project }: { project: Project }) => (
  <View style={styles.expandCaret}>
    {project && project.children && project.children.size > 0
      ? <Icon name='angle-down' size={18} color='#333333' />
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
    ): null
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
    flex: 1,
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
    paddingRight: 10
  }
})
