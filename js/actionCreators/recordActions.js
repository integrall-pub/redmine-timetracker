/* @flow */
'use strict'
import moment from 'moment'

import type { Action, Record } from '../types'

export const migrate = (): Action => ({
  type: 'record-migrate'
})

export const startRecording = (
  projectId: number,
  issueId: number,
  activityId: number,
  comment?: string = '',
): Action => ({
  type: 'record-create',
  record: {
    id: -1,
    projectId: projectId,
    issueId: issueId,
    activityId: activityId,
    comment: comment,
    startTime: moment().toISOString(),
    endTime: '',
    remoteId: -1
  }
})

export const stopRecording = (record: Record) => ({
  type: 'record-edit',
  record: {
    ...record,
    endTime: moment().toISOString()
  }
})

export const select = (record: Record) => ({
  type: 'record-select',
  record: record
})
