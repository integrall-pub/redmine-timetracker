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

import type {
  Action,
  RecordEdit
} from '../types'

const initialState = () => ({
  search: '',
  searchActive: true,
  record: {
    id: -1,
    projectId: -1,
    issueId: -1,
    activityId: -1,
    comment: '',
    startTime: '',
    endTime: '',
    remoteId: -1
  }
})

export default function recordEditReducer (
  state?: RecordEdit = initialState(),
  action: Action
) {
  switch (action.type) {
    case 'rec-edit-load':
      return {
        ...state,
        record: action.record
      }

    case 'rec-edit-issue-search':
      return {
        ...state,
        search: action.search,
        searchActive: true
      }

    case 'rec-edit-issue-select':
      return {
        ...state,
        search: '#' + action.issueId,
        searchActive: false,
        record: {
          ...state.record,
          issueId: action.issueId
        }
      }

    case 'project-select':
      return {
        ...state,
        record: {
          ...state.record,
          projectId: action.projectId
        }
      }

    case 'rec-edit-comment':
      return {
        ...state,
        record: {
          ...state.record,
          comment: action.comment
        }
      }

    case 'record-create-done':
      // falls through
    case 'record-edit-done':
      if (!action.success) {
        return state
      }
      // falls through
    case 'rec-edit-clear':
      return initialState()

    default:
      return state
  }
}
