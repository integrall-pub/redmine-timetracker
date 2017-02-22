/* @flow */
'use strict'
import { AsyncStorage } from 'react-native'
import { List } from 'immutable'
import invariant from 'fbjs/lib/invariant'

import type {
  Record
} from '../types'
import migrations from '../migrations'

export type Adapter = {
  migrate: () => Promise<List<Record>>,
  modify: (transform: RecordTransformer) => Promise<List<Record>>,
  read: () => Promise<List<Record>>
}
type RecordTransformer = (records: List<Record>) => List<Record>
export const createAdapter = (): Adapter => {
  let cache = null
  let write = false
  return {
    migrate: () => (
      AsyncStorage.multiGet(['@RecordStore:migrations', '@RecordStore:records'])
        .then(([[, _migrations], [, records]]) => {
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
    ),
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
          return rs
        })
        .catch(() => {
          write = false
          return List()
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
