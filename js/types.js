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
import type { List } from 'immutable'

export type Maybe<T>
  = { kind: 'just', just: T }
  | { kind: 'nothing' }

export type InitState = 'waiting'|'success'|'fail'

export type ApiKey = { key: string, empty: boolean }
export type Endpoint = { url: string, valid: boolean }
export type Login = {
  username?: string,
  password?: string,
  valid: boolean,
  progress: boolean,
  fail: boolean
}

export type Connection = {
  url: string,
  key: string,
  valid: boolean
}

export type Project = {
  id: number,
  name: string,
  identifier: string,
  description: string,
  parent?: ProjectRef,
  status: number,
  hasTracking: boolean,
  depth?: number,
  children?: List<Project>
}
export type ProjectRef = {
  id: number,
  name: string
}
export type CustomField = {
  id: number,
  name: string,
  value: string
}

export type RealmProject = {
  id: number,
  name: string,
  identifier: string,
  description: string,
  parentId: number,
  parentName: string,
  status: number,
  hasTracking: boolean,
  depth: number,
}

export type Issue = {
  id: number,
  subject: string,
  description: string,
  author: Author,
  project: ProjectRef,
  tracker: Tracker
}
export type Author = {
  id: number,
  name: string
}

export type Tracker = {
  id: number,
  name: string
}

export type RealmIssue = {
  id: number,
  subject: string,
  description: string,
  authorId: number,
  authorName: string,
  projectId: number,
  projectName: string,
  trackerId: number,
  trackerName: string
}

export type RecordEdit = {
  search: string,
  searchActive: boolean,
  record: Record
}

export type Activity = {
  id: number,
  name: string
}

export type Record = {
  id: number,
  projectId: number,
  issueId: number,
  activityId: number,
  comment: string,
  startTime: string,
  endTime: string,
  remoteId: number
}

export type RecordDetails = {
  id: number,
  project: ProjectRef,
  issue: Issue,
  activity: Activity,
  comment: string,
  startTime: string,
  endTime: string,
  remoteId: number,
  base: Record
}

export type RecordDetailsState = {
  current?: RecordDetails,
  selected?: RecordDetails
}

type PropertyAction
  = { type: 'prop-test-request' }
  | { type: 'prop-test', success: boolean }
  | { type: 'url-set-request', url: string }
  | { type: 'url-set', url: string, success: boolean }
  | { type: 'login-request', username: string, password: string }
  | { type: 'login', success: boolean }
  | { type: 'logout-request' }
  | { type: 'logout' }

type ProjectAction
  = { type: 'projects-load-request' }
  | { type: 'projects-load', success: boolean, projects: List<Project> }
  | { type: 'project-expand', projectId: number }
  | { type: 'project-select', projectId: number }

type IssueAction
  = { type: 'issues-load-request', projectId?: number }
  | { type: 'issues-load', success: boolean, issues: List<Issue> }
  | { type: 'issue-load-single-request', issueId: number }
  | { type: 'issue-load-single', success: boolean, issue?: Issue }

type RecordAction
  = { type: 'record-migrate' }
  | { type: 'record-load' }
  | { type: 'record-load-done', success: boolean, records: List<Record> }
  | { type: 'record-create', record: Record }
  | { type: 'record-create-done', success: boolean, records: List<Record> }
  | { type: 'record-edit', record: Record }
  | { type: 'record-edit-done', success: boolean, records: List<Record> }
  | { type: 'record-delete', record: Record }
  | { type: 'record-delete-done', success: boolean, records: List<Record> }

type RecordDetailsAction
  = { type: 'record-details-current', record?: RecordDetails }
  | { type: 'record-details-selected', record?: RecordDetails }
  | { type: 'record-select', record: Record }

type RecordEditAction
  = { type: 'rec-edit-load', record: Record }
  | { type: 'rec-edit-issue-select', issueId: number }
  | { type: 'rec-edit-issue-search', search: string, active: boolean }
  | { type: 'rec-edit-comment', comment: string }
  | { type: 'rec-edit-clear' }

export type Action
  = { type: 'load-connection' }
  | { type: 'load-connection-done', success: boolean }
  | { type: 'api-login-request-fail' }
  | { type: 'api-login-request-success' }
  | { type: 'api-login-request', login: Login }
  | { type: 'api-endpoint-set', endpoint: string }
  | { type: 'api-key-set', key: string }
  | { type: 'login-set', login: Login }
  | { type: 'login-dismiss-fail' }
  | PropertyAction
  | ProjectAction
  | IssueAction
  | RecordAction
  | RecordEditAction
  | RecordDetailsAction

export type AppState = {
  lastAction: Action,
  endpoint: Endpoint,
  apiKey: ApiKey,
  login: Login,
  projects: List<Project>,
  projectExpand: List<number>,
  projectSelect: number,
  issues: List<Issue>,
  records: List<Record>,
  recordEdit: RecordEdit,
  recordDetails: RecordDetailsState
}
