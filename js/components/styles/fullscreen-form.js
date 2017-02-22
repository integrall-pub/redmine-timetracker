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
