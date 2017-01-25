/* @flow */
'use strict'
import { encode } from 'base-64'

import type { Activity, Issue, Project } from '../types'

export function getKey (
  url: string,
  username: string,
  password: string
): Promise<string> {
  return fetch(
    path(url, 'users', 'current.json'),
    authHeader(username, password))
    .then((r) => r.json())
    .then((r) => r.user.api_key)
}

export function getProjects (
  url: string,
  key: string
): Promise<Array<Project>> {
  console.log(url, key)
  return fetch(
    path(url, 'projects.json?include=enabled_modules'),
    baseHeader(key))
    .then((r) => r.json())
    .then((r) => r.projects.map((p) => ({
      id: p.id,
      name: p.name,
      identifier: p.identifier,
      description: p.description,
      parent: p.parent
        ? {
          id: p.parent.id,
          name: p.parent.name
        }
        : null,
      parentId: p.parent ? p.parent.id : -1,
      parentName: p.parent ? p.parent.name : '',
      status: p.status,
      hasTracking: p.enabled_modules.map((m) => m.name).indexOf('time_tracking') >= 0,
      depth: 0
    })))
}

export function getIssues (
  url: string,
  key: string,
  projectId: number
): Promise<Array<Issue>> {
  return fetch(
    path(url, 'issues.json?project_id=' + projectId.toFixed(0)),
    baseHeader(key))
    .then((r) => r.json())
    .then((r) => r.issues)
}

export function getIssue (
  url: string,
  key: string,
  issueId: number
): Promise<Issue> {
  return fetch(
    path(url, 'issues', issueId.toFixed(0) + '.json'),
    baseHeader(key))
    .then((r) => r.json())
    .then((r) => r.issue)
}

export function getActivities (
  url: string,
  key: string
): Promise<Array<Activity>> {
  return fetch(
    path(url, 'enumerations', 'time_entry_activities.json'),
    baseHeader(key))
    .then((r) => r.json())
    .then((r) => r.time_entry_activities)
}

function path (...parts: Array<string>) { return parts.join('/') }

function authHeader (username: string, password: string) {
  return  {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + encode(username + ':' + password)
    }
  }
}

function baseHeader (key: string) {
  return {
    headers: {
      'Accept': 'application/json',
      'X-Redmine-API-Key': key
    }
  }
}
