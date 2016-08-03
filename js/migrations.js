/* @flow */
'use strict'
import { List } from 'immutable'

export default List.of(
  {
    id: '1',
    op: (data: string|null) => {
      return JSON.stringify([])
    }
  }
)
