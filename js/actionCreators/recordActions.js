/* @flow */
'use strict'
import moment from 'moment'

import type { Actions, Record } from '../types'

export const migrate = (): Action => ({
  type: 'record-migrate'
})

export const startRecording = (
  projectId: number,
  issueId: number,
  comment?: string = ''
): Action => ({
  type: 'record-create',
  record: {
    id: -1,
    projectId: projectId,
    issueId: issueId,
    comment: comment,
    startTime: moment().toISOString(),
    endTime: '',
    synced: false
  }
})

export const stopRecording = (record: Record) => ({
  type: 'record-edit',
  record: {
    ...record,
    endTime: moment().toISOString()
  }
})
