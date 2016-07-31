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

type ProjectAction =
  { type: 'projects-load' } |
  { type: 'projects-load-done', success: boolean, projects: Array<Project> } |
  { type: 'project-expand', projectId: number }

type IssueActions =
  { type: 'issues-load' } |
  { type: 'issues-load-done', success: boolean, issues: Array<Issue> }

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
  ProjectAction

  export type AppState = {
    lastAction: Action,
    endpoint: Endpoint,
    apiKey: ApiKey,
    login: Login
  }
