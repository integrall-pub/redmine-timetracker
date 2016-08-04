/* @flow */
'use strict'

import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from 'immutable'
import Fuse from 'fuse.js'

type TypeaheadProps = {
  value?: string,
  style: any,
  suggest?: boolean,
  options?: List<string>,
  keys?: Array<string>,
  container: any,
  children: any,
  onChange?: (search: string) => void,
  onSelect?: (selected: any) => void
}
type TypeaheadState = {
  left: number
}
export default class Typeahead extends Component {
  props: TypeaheadProps;
  state: TypeaheadState;

  constructor (props: TypeaheadProps) {
    super(props)
    this.state = {
      left: 0,
      width: Dimensions.get('window').width
    }
  }

  componentDidMount () {
    setTimeout(() => (
      this.refs.text.measure(
        (fx, fy, width, height, px, py) => this.setState({
          left: px
        })
      )
    ), 100)
  }

  render () {
    let {
      value = '',
      style = null,
      suggest = true,
      options = List(),
      keys = null,
      container = null,
      children,
      onChange = () => {},
      onSelect = () => {}
    } = this.props

    let filtered = filterOptions(
      value,
      options,
      keys
    )
    return (
      <View>
        <TextInput
          ref='text'
          value={value}
          style={[ style, { height: 52}]}
          onChangeText={onChange} />

        {/* workaround for missing z-index until react-native 0.31-ish */}
        {children}

        {suggest && filtered.size > 0
          ? (
            <View
              style={{
                backgroundColor: '#F6F6F6',
                borderWidth: 1,
                borderRadius: 3,
                marginLeft: 8,
                marginRight: 8,
                position: 'absolute',
                left: -this.state.left,
                top: 52,
                width: this.state.width - 16
              }}>
              {filterOptions(value, options, keys).map((s, i) => (
                <TouchableHighlight
                  key={i}
                  activeOpacity={0.8}
                  underlayColor='gray'
                  onPress={() => onSelect(s)}
                  style={[styles.suggestion, { borderTopWidth: i === 0 ? 0 : 1}]}>
                  {container({ option: s })}
                </TouchableHighlight>
              ))}
            </View>
          )
          : null}

      </View>
    )
  }
}

const filterOptions = (value: string, options: List<string>, keys?: Array<string>) => (
  List(new Fuse(options.toArray() , keys !== null ? { keys: keys } : {}).search(value))
)

const styles = StyleSheet.create({
  suggestion: {
    minHeight: 50,
    padding: 5,
    justifyContent: 'center'
  }
})