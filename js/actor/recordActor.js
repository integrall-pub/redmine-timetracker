/* @flow */
import type { Dispatch } from 'redux'
import invariant from 'fbjs/lib/invariant'
import {
  AsyncStorage
} from 'react-native'
import { List } from 'immutable'

import type { Action, ApiKey, AppState } from '../types'
import migrations from '../migrations'

export default function () {
  const adapter = createAdapter()
  return (state: AppState, dispatch: Dispatch) => {
    let lastAction = state.lastAction
    switch (lastAction.type) {
      case 'record-migrate':
        AsyncStorage.multiGet(['@RecordStore:migrations', '@RecordStore:records'])
          .then(([[,_migrations], [,records]]) => {
            let oldMigrations = _migrations !== null
              ? List(JSON.parse(_migrations))
              : List()
            let oldIds = oldMigrations.map((m) => m.id)
            let newMigrations = migrations.filter((m) => !oldIds.includes(m.id))
            console.log('newMigrations.size', newMigrations.size)
            let newRecords = newMigrations.reduce(
              (r, m) => m.op(r),
              records
            )
            return AsyncStorage.multiSet([
              ['@RecordStore:migrations', JSON.stringify(oldMigrations.concat(newMigrations).toArray())],
              ['@RecordStore:records', newRecords]
            ])
          })
          .then(() => adapter.read()
            .then((rs) => dispatch({
              type: 'record-load-done',
              success: true,
              records: rs
            }))
            .catch((error) => dispatch({
              type: 'record-load-done',
              success: false,
              records: List()
            }))
          )
        break

      case 'record-load':
        adapter.read()
          .then((rs) => dispatch({
            type: 'record-load-done',
            success: true,
            records: rs
          }))
          .catch((error) => dispatch({
            type: 'record-load-done',
            success: false,
            records: List()
          }))
        break

      case 'record-create':
        dispatchDone(
          'record-create-done',
          dispatch,
          adapter,
          adapter.modify((rs) => {
            if (rs.filter((r) => r.endTime === '').size > 0) {
              throw new RecordWriteError('Cannot record in parallel.')
            }
            return rs.push({
              ...lastAction.record,
              id: (rs.map((r) => r.id).max() || 0) + 1,
            })
          })
        )
        break

      case 'record-edit':
        dispatchDone(
          'record-edit-done',
          dispatch,
          adapter,
          adapter.modify((rs) => {
            let index = rs.findIndex((r) => r.id === lastAction.record.id)
            if (index === -1) {
              throw new RecordWriteError('Cannot find a Record with given id ' + lastAction.record.id)
            }
            return rs.update(index, () => lastAction.record)
          })
        )
        break
    }
  }
}

class RecordWriteError {
  msg: string;

  constructor (msg: string) {
    this.msg = msg
  }
}

type Adapter = {
  modify: (transform: RecordTransformer) => Promise,
  read: () => Promise
}
type RecordTransformer = (records: List<Record>) => List<Record>
const createAdapter = () => {
  let cache = null
  let write = false
  return {
    modify: (transform: RecordTransformer) => {
      invariant(!write, 'recordActor: modify called during transaction.')
      write = true
      return AsyncStorage.getItem('@RecordStore:records')
        .then((rs) => List(JSON.parse(rs)))
        .then((rs) => {
          try {
            return transform(rs)
          } catch (error) {
            console.log(error)
            throw error
          }
        })
        .then((rs) => JSON.stringify(rs.toArray()))
        .then((rs) => AsyncStorage.setItem('@RecordStore:records', rs))
        .then((rs) => AsyncStorage.getItem('@RecordStore:records'))
        .then((rs) => List(JSON.parse(rs)))
        .then((rs) => {
          cache = rs
          write = false
          return {
            error: null,
            records: rs
          }
        })
        .catch((error) => {
          console.log(error)
          write = false
          return {
            error: error,
            records: null
          }
        })
    },
    read: () => cache !== null
      ? Promise.resolve(cache)
      : AsyncStorage.getItem('@RecordStore:records')
        .then((rs) => List(JSON.parse(rs)))
        .then((rs) => {
          cache = rs
          return rs
        })
  }
}

const dispatchDone = (
  type: string,
  dispatch: Dispatch,
  adapter: Adapter,
  promise: Promise
) => (
  promise.then((rs) => dispatch({
    type: type,
    success: rs.error === null,
    records: rs.records
  }))
  .catch((error) => {
    console.log(error)
    return adapter.read()
      .then((rs) => dispatch({
        type: type,
        success: false,
        records: null
      }))
  })
)
