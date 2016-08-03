/* @flow */
'use strict'

export type ApiKey = { key: string, empty: boolean }
export type Endpoint = { url: string, valid: boolean }
export type Login = {
  username?: string,
  password?: string,
  valid: boolean,
  progress: boolean,
  fail: boolean
}

export type Project = {
  id: number,
  name: string,
  identifier: string,
  description: string,
  parent?: ProjectRef,
  status: number,
  custom_fields: Array<CustomField>,
  created_on: string,
  updated_on: string,
  hasTracking: boolean,
  depth?: number,
  children?: List<Project>
}
export type ProjectRef = {
  id: number,
  name: string
}
export type CustonField = {
  id: number,
  name: string,
  value: string
}

export type Issue = {
  id: number,
  subject: string,
  description: string,
  author: Author,
  project: ProjectRef,
  author: Author,
}
export type Author = {
  id: number,
  name: string
}

export type RecordEdit = {
  search: string,
  searcActive: boolean,
  record: Record
}

export type Record = {
  id: number,
  projectId: number,
  issueId: number,
  comment: string,
  startTime: string,
  endTime: string,
  synced: boolean
}

export type RecordState = {
  current: Record|null,
  all: List<Record>
}

type ProjectAction =
  { type: 'projects-load' } |
  { type: 'projects-load-done', success: boolean, projects: Array<Project> } |
  { type: 'project-expand', projectId: number } |
  { type: 'project-select', projectId: number }

type IssueAction =
  { type: 'issues-load' } |
  { type: 'issues-load-done', success: boolean, issues: Array<Issue> }

type RecordAction =
  { type: 'record-migrate' } |
  { type: 'record-load' } |
  { type: 'record-load-done', success: boolean, records: List<Record> } |
  { type: 'record-create', record: Record } |
  { type: 'record-create-done', success: boolean, records: List<Record> } |
  { type: 'record-edit', record: Record } |
  { type: 'record-edit-done', success: boolean, records: List<Record> } |
  { type: 'record-delete', record: Record } |
  { type: 'record-delete-done', success: boolean, records: List<Records> }

type RecordEditAction =
  { type: 'rec-edit-issues-select', issueId: number } |
  { type: 'rec-edit-issue-search', search: string, active: boolean } |
  { type: 'rec-edit-comment', comment: string } |
  { type: 'rec-edit-clear' }


export type Action =
  { type: 'load-connection' } |
  { type: 'load-connection-done', success: boolean } |
  { type: 'api-login-request-fail' } |
  { type: 'api-login-request-success' } |
  { type: 'api-login-request', login: Login } |
  { type: 'api-endpoint-set', endpoint: string } |
  { type: 'api-key-set', key: string } |
  { type: 'login-set', login: Login } |
  { type: 'login-dismiss-fail' } |
  ProjectAction |
  IssueAction |
  RecordAction |
  RecordEditAction

  export type AppState = {
    lastAction: Action,
    endpoint: Endpoint,
    apiKey: ApiKey,
    login: Login,
    projects: List<Project>,
    projectExpand: List<number>,
    projectSelect: number,
    issues: List<Issue>,
    records: RecordState,
    recordEdit: RecordEdit
  }
