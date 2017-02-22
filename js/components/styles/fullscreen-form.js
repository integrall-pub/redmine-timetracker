/* @flow */
'use strict'

import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    // color: '#333333',
    marginTop: 5
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  input: {
    width: 200,
    textAlign: 'center'
  },
  multilineInput: {
    width: 200,
    height: 80
    // textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    padding: 15
  },
  button: {
    fontSize: 18
  }
})
