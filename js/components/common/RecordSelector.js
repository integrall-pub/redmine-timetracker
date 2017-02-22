/* @flow */
'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { List } from 'immutable'
import Icon from 'react-native-vector-icons/FontAwesome'

import type {
  Record,
  RecordDetails
} from '../../types'

type RecordSelectorProps = {
  records: List<Record>,
  selected?: RecordDetails|null,
  onSelect: (record: Record) => void
}
export default function RecordSelector ({
  records,
  selected,
  onSelect = () => {}
}: RecordSelectorProps) {
  let selectedId = selected ? selected.id : -1
  let selectedIndex = selectedId !== -1
    ? records.findIndex((r) => r.id === selectedId)
    : -1
  let previous = selectedIndex > 0
    ? records.get(selectedIndex - 1)
    : null
  let next = selectedIndex < records.size - 1
    ? records.get(selectedIndex + 1)
    : null

  return (
    <View style={styles.container}>
      <IconButton
        icon='chevron-left'
        disabled={!selected || !previous}
        onPress={() => {
          if (previous) {
            onSelect(previous)
          }
        }} />
      <View style={styles.textContainer}>
        <Text
          style={styles.text}>
          {selected
            ? ('#' + selected.issue.id + ' ' + selected.issue.tracker.name)
            : ''}
        </Text>
      </View>
      <IconButton
        icon='chevron-right'
        disabled={!selected || !next}
        onPress={() => {
          if (next) {
            onSelect(next)
          }
        }} />
    </View>
  )
}

type IconButtonProps = {
  icon: string,
  disabled?: boolean,
  onPress?: () => void
}
const IconButton = ({
  icon,
  disabled = false,
  onPress = () => {}
}: IconButtonProps) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor='gray'
    disabled={disabled}
    style={styles.iconButton}
    onPress={onPress}>
    <Icon
      name={icon}
      size={18}
      style={{ padding: 5, opacity: disabled ? 0.4 : 1.0 }} />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
