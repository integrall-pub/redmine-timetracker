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
import type { Dispatch } from 'redux'
import { List } from 'immutable'

import type {
  AppState
} from '../types'
import { createAdapter } from '../dao/record'

export default function () {
  const adapter = createAdapter()
  return (state: AppState, dispatch: Dispatch) => {
    let lastAction = state.lastAction
    switch (lastAction.type) {
      case 'record-migrate':
        adapter.migrate().then(() => loadRecords(state, dispatch, adapter))
        break

      case 'record-load':
        loadRecords(state, dispatch, adapter)
        break

      case 'record-create':
        let createdRecord = lastAction.record
        adapter.modify((rs) => {
          if (rs.filter((r) => r.endTime === '').size > 0) {
            throw new RecordWriteError('Cannot record in parallel.')
          }
          return rs.push({
            ...createdRecord,
            id: (rs.map((r) => r.id).max() || 0) + 1
          })
        })
        .then((rs) => dispatch({
          type: 'record-create-done',
          success: true,
          records: rs
        }))
        .catch((error) => {
          console.log('create error', error)
          dispatch({
            type: 'record-create-done',
            success: false,
            records: List()
          })
        })
        break

      case 'record-edit':
        let editedRecord = lastAction.record
        adapter.modify((rs) => {
          let index = rs.findIndex((r) => r.id === editedRecord.id)
          if (index === -1) {
            throw new RecordWriteError('Cannot find a Record with id ' + editedRecord.id)
          }
          return rs.update(index, () => editedRecord)
        })
        .then((rs) => dispatch({
          type: 'record-edit-done',
          success: true,
          records: rs
        }))
        .catch((error) => {
          console.log('edit error', error)
          dispatch({
            type: 'record-edit-done',
            success: false,
            records: List()
          })
        })
        break
    }
  }
}

const loadRecords = (state, dispatch, adapter) => (
  adapter.read()
    .then((rs) => dispatch({
      type: 'record-load-done',
      success: true,
      records: rs
    }))
    .catch((error) => {
      console.log(error)
      dispatch({
        type: 'record-load-done',
        success: false,
        records: List()
      })
    })
)

class RecordWriteError {
  msg: string;

  constructor (msg: string) {
    this.msg = msg
  }
}
