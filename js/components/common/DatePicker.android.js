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
  DatePickerAndroid,
  StyleSheet,
  Text,
  TimePickerAndroid,
  TouchableHighlight,
  View
} from 'react-native'
import moment from 'moment'

type DatePickerProps = {
  value: moment,
  onChange?: (val: moment) => void
}
export default class DatePicker extends Component {
  props: DatePickerProps;
  _showDatePicker: () => void;
  _showTimePicker: () => void;

  constructor (props: DatePickerProps) {
    super(props)

    this._showDatePicker = this._showDatePicker.bind(this)
    this._showTimePicker = this._showTimePicker.bind(this)
  }

  async _showDatePicker () {
    try {
      const {
        action,
        year,
        month,
        day
      } = await DatePickerAndroid.open({
        date: moment(this.props.value).toDate()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        this.props.onChange(moment({
          ...moment(this.props.value).toObject(),
          year: year,
          month: month,
          day: day
        }))
      }
    } catch (error) {
      console.log('DatePicker error:', error)
    }
  }

  async _showTimePicker () {
    try {
      let mValue = moment(this.props.value)
      const {
        action,
        hour,
        minute
      } = await TimePickerAndroid.open({
        hour: mValue.hours(),
        minute: mValue.minutes(),
        is24Hour: true
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        this.props.onChange(moment({
          ...mValue.toObject(),
          hour: hour,
          minute: minute
        }))
      }
    } catch (error) {
      console.log('DatePicker error:', error)
    }
  }

  render () {
    let { value, onChange = () => {} } = this.props
    let mValue = moment(value)
    let disabled = !mValue.isValid()
    return (
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor='gray'
          disabled={disabled}
          style={styles.button}
          onPress={this._showDatePicker}>
          <Text>{
            disabled
              ? '-'
              : mValue.format('L')
          }</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor='gray'
          disabled={disabled}
          style={styles.button}
          onPress={this._showTimePicker}>
          <Text>{
            disabled
              ? '-'
              : mValue.format('LT')
          }</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    flex: 1,
    justifyContent: 'center',
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  }
})
