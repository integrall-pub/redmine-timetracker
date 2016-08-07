/* @flow */
import type { Dispatch } from 'redux'
import { List } from 'immutable'

import type {
  Action,
  ApiKey,
  AppState,
  Record,
  RecordDetails
} from '../types'
import * as client from '../dao/redmine/client'

export default function (state: AppState, dispatch: Dispatch) {
  let lastAction = state.lastAction
  switch (lastAction.type) {
    case 'record-load-done':
      // falls through
    case 'record-create-done':
      // falls through
    case 'record-edit-done':
      loadRecordDetails(
        state,
        lastAction.records.filter((r) => r.endTime === '').first()
      ).then((r) => dispatch({
        type: 'record-details-current',
        record: r
      }))
      .catch((error) => console.log(error))

      if (state.recordDetails.selected) {
        loadRecordDetails(
          state,
          state.recordDetails.selected.base
        ).then((r) => dispatch({
          type: 'record-details-selected',
          record: r
        }))
        .catch((error) => {
          console.log(error)
          dispatch({
            type: 'record-details-selected',
            record: null
          })
        })
      }
      break

    case 'record-select':
      loadRecordDetails(
        state,
        lastAction.record
      ).then((r) => dispatch({
        type: 'record-details-selected',
        record: r
      }))
      .catch((error) => {
        console.log(error)
        dispatch({
          type: 'record-details-selected',
          record: null
        })
      })
  }
}

const loadRecordDetails = (
  state: AppState,
  record: Record
): Promise<RecordDetails|null> => {
  if (!record) {
    return Promise.resolve(null)
  } else {
    return client.getIssue(
      state.endpoint.url,
      state.apiKey.key,
      record.issueId)
      .catch((error) => Promise.resolve({
        id: record.issueId,
        subject: '',
        description: '',
        author: { id: -1, name: '' },
        project: { id: record.projectId, name: '' },
        tracker: { id: -1, name: '' }
      }))
      .then((i) => Promise.resolve({
        id: record.id,
        project: i.project,
        issue: i,
        activity: { id: 1, name: 'Development' }, // TODO: Filter correct activity
        comment: record.comment,
        startTime: record.startTime,
        endTime: record.endTime,
        remoteId: record.remoteId,
        base: record
      }))
  }
}
