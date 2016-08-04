/* @flow */
'use strict'
import { encode } from 'base-64'

import type { Activity, Issue, Project } from '../types'

export const getKey = (
  url: string,
  username: string,
  password: string
): Promise<string> => (
  fetch(
    path(url, 'users', 'current.json'),
    baseParams(username, password))
    .then((r) => r.json())
    .then((r) => r.user.api_key)
)

export const getProjects = (
  url: string,
  key: string
): Promise<Array<Project>> => (
  fetch(
    path(url, 'projects.json?include=enabled_modules'),
    baseParams(key))
    .then((r) => r.json())
    .then((r) => r.projects)
)

export const getIssues = (
  url: string,
  key: string,
  projectId: number
): Promise<Array<Issue>> => (
  fetch(
    path(url, 'issues.json?project_id=' + projectId.toFixed(0)),
    baseParams(key))
    .then((r) => r.json())
    .then((r) => r.issues)
)

export const getIssue = (
  url: string,
  key: string,
  issueId: number
): Promise<Issue> => (
  fetch(
    path(url, 'issues', issueId.toFixed(0) + '.json'),
    baseParams(key))
    .then((r) => r.json())
    .then((r) => r.issue)
)

export const getActivities = (
  url: string,
  key: string
): Promise<Array<Activity>> => (
  fetch(
    path(url, 'enumerations', 'time_entry_activities.json'),
    baseParams(key))
    .then((r) => r.json())
    .then((r) => r.time_entry_activities)
)

const path = (...parts: Array<string>) => parts.join('/')

const baseParams = (usernameOrKey: string, password?: string = 'X') => ({
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + encode(usernameOrKey + ':' + password)
  }
})
