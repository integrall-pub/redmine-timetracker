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
