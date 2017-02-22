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
import { List } from 'immutable'

import type {
  Activity,
  Connection,
  Issue,
  Project,
  RealmProject,
  RealmIssue,
  Record,
  RecordDetails
} from '../types'

import * as redmine from './redmine-client'
import realm from './realm'

function _getConnection (): Promise<Connection> {
  return Promise.all([
    getUrl(),
    getCachedKey()
  ])
  .then(([ url, key ]) => ({
    url: url,
    key: key,
    valid: true
  }))
}

export function getConnection (): Promise<Connection> {
  return _getConnection()
}

export function getUrl (): Promise<string> {
  let url = realm.objectForPrimaryKey('Property', 'api-url')
  return url
   ? Promise.resolve(url.value)
   : Promise.reject(new Error('Url not found'))
}

export function setUrl (url: string): Promise<string> {
  realm.write(() => realm.create(
    'Property',
    { key: 'api-url', value: url },
    true
  ))
  return getUrl()
}

export function getNewKey (
  username: string,
  password: string
): Promise<string> {
  return getUrl()
    .then((url) => redmine.getKey(
      url,
      username,
      password
    ))
    .then((r) => {
      realm.write(() => {
        realm.create(
          'Property',
          { key: 'api-key', value: r },
          true
        )
      })
      return getCachedKey()
    })
    .catch(() => getCachedKey())
}

export function getCachedKey (): Promise<string> {
  let key = realm.objectForPrimaryKey('Property', 'api-key')
  return key
    ? Promise.resolve(key.value)
    : Promise.reject('Key not found')
}

function projectToRealm (p: Project): RealmProject {
  console.log('project to realm', p)
  let pp = {
    id: p.id,
    name: p.name,
    identifier: p.identifier,
    description: p.description,
    parentId: p.parent ? p.parent.id : -1,
    parentName: p.parent ? p.parent.name : '',
    status: p.status,
    hasTracking: p.hasTracking,
    depth: p.depth || 0
  }
  console.log('done', pp)
  return pp
}

function projectFromRealm (p: RealmProject): Project {
  return {
    id: p.id,
    name: p.name,
    identifier: p.identifier,
    description: p.description,
    parent: {
      id: p.parentId,
      name: p.parentName
    },
    status: p.status,
    hasTracking: p.hasTracking,
    depth: p.depth
  }
}

export function getProjects (): Promise<List<Project>> {
  return Promise.resolve(
    List(realm.objects('Project'))
      .map(projectFromRealm)
  )
}

export function syncProjects (): Promise<List<Project>> {
  return _getConnection()
    .then(({ url, key }) => redmine.getProjects(url, key))
    .then((projects) => {
      realm.write(() => {
        let projectIds = projects.map((p) => p.id)
        let existingProjects = realm.objects('Project')
        if (existingProjects.length > 0) {
          realm.delete(
            existingProjects
              .filtered(
                'NOT id IN $0',
                projectIds
              )
          )
        }
        projects.forEach((p) => {
          realm.create(
            'Project',
            projectToRealm(p),
            projectIds.indexOf(p.id) >= 0
          )
        })
      })
      return getProjects()
    })
}

function issueFromRealm (i: RealmIssue): Issue {
  return {
    id: i.id,
    subject: i.subject,
    description: i.description,
    author: {
      id: i.authorId,
      name: i.authorName
    },
    project: {
      id: i.projectId,
      name: i.projectName
    },
    tracker: {
      id: i.trackerId,
      name: i.trackerName
    }
  }
}

function issueToRealm (i: Issue): RealmIssue {
  return {
    id: i.id,
    subject: i.subject,
    description: i.description,
    authorId: i.author.id,
    authorName: i.author.name,
    projectId: i.project.id,
    projectName: i.project.name,
    trackerId: i.tracker.id,
    trackerName: i.tracker.name
  }
}

export function getIssuesForProject (
  projectId: number
): Promise<List<Issue>> {
  return Promise.resolve(List(realm.objects('Issue')
    .filter('project.id == $0', projectId)
    .map(issueFromRealm)
  ))
}

export function syncIssuesForProject (
  projectId: number
): Promise<List<Issue>> {
  return _getConnection()
    .then(({ url, key }) => redmine.getIssues(
      url,
      key,
      projectId
    ))
    .then((issues) => {
      realm.write(() => {
        realm.delete(
          realm.objects('Issue')
            .filtered(
              'project.id == $0 AND id NOT IN $1',
              projectId,
              issues.map((i) => i.id)
            )
        )
        issues.forEach((i) => realm.create(
          'Issue',
          issueToRealm(i),
          true
        ))
      })
      return getIssuesForProject(projectId)
    })
}

export function getIssue (issueId: number): Promise<Issue> {
  return Promise.resolve(
    issueFromRealm(
      realm.objectForPrimaryKey('Issue', issueId)
    )
  )
}

export function syncIssue (issueId: number): Promise<Issue> {
  return _getConnection()
    .then(({ url, key }) => redmine.getIssue(
      url,
      key,
      issueId
    ))
    .then((issue) => {
      realm.write(() => realm.create(
        'Issue',
        issueToRealm(issue),
        true
      ))
      return getIssue(issueId)
    })
}

export function getActivities (): Promise<List<Activity>> {
  return Promise.resolve(List(realm.objects('Activity').filtered('active == true')))
}

export function syncActivities (): Promise<List<Activity>> {
  return _getConnection()
    .then(({ url, key }) => redmine.getActivities(
      url,
      key
    ))
    .then((activities) => {
      realm.write(() => {
        activities.forEach((a) => (
          realm.create(
            'Activity',
            { id: a.id, name: a.name, active: true },
            true
          )
        ))

        realm.objects('Activity').filtered(
          'id NOT IN $0',
          activities.map((a) => a.id)
        ).forEach((inActive) => realm.create(
          'Activity',
          { id: inActive.id, active: false },
          true
        ))
      })
      return getActivities()
    })
}

export function getActivity (activityId: number): Promise<Activity> {
  try {
    return Promise.resolve(realm.objectForPrimaryKey('Activity', activityId))
  } catch (error) {
    return Promise.reject(error)
  }
}

export function getLatestRecords (start: Date): Promise<List<Record>> {
  return Promise.resolve(realm.objects('Record').filtered(
    'startTime >= $0',
    start
  ))
}

export function getRecords (start: Date, end: Date): Promise<List<Record>> {
  return Promise.resolve(realm.objects('Record').filtered(
    'startTime >= $0 AND endTime <= $1',
    start,
    end
  ))
}

function _getRecord (recordId: number): Promise<Record> {
  try {
    return Promise.resolve(realm.objectForPrimaryKey('Record', recordId))
  } catch (error) {
    return Promise.reject(error)
  }
}
export function getRecord (recordId: number): Promise<RecordDetails> {
  return _getRecord(recordId)
    .then((record) => getRecordDetails(record))
}
export function syncRecord (recordId: number): Promise<RecordDetails> {
  return getRecord(recordId)
    .then((record) => syncRecordDetails(record))
}

function _getLatestRecord (): Promise<Record> {
  try {
    return Promise.resolve(realm.objects('Record')
      .sorted('endTime', true)
      .slice(0, 1)[0]
    )
  } catch (error) {
    return Promise.reject(error)
  }
}
export function getLatestRecord (): Promise<RecordDetails> {
  return _getLatestRecord()
    .then((record) => getRecordDetails(record))
}
export function syncLatestRecord (): Promise<RecordDetails> {
  return _getLatestRecord()
    .then((record) => syncRecordDetails(record))
}

export function editRecord (record: Record): Promise<Record> {
  realm.write(() => {
    realm.create(
      'Record',
      record,
      true
    )
  })
  return Promise.resolve(realm.objectForPrimaryKey(record.id))
}

export function deleteRecord (record: Record): Promise<Record> {
  let r = realm.objectForPrimaryKey(record.id)
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey(record.id))
  })
  return Promise.resolve(r)
}

export function uploadRecord (record: Record): Promise<Record> {
  // TODO: Implement
  return Promise.reject(new Error('Not implemented'))
}

function getRecordDetails (record: Record): Promise<RecordDetails> {
  return Promise.all([
    getIssue(record.issueId),
    getActivity(record.activityId)
  ])
  .then(([ issue, activity ]) => ({
    id: record.id,
    project: issue.project,
    issue: issue,
    activity: activity,
    comment: record.comment,
    startTime: record.startTime,
    endTime: record.endTime,
    remoteId: record.remoteId,
    base: record
  }))
}
function syncRecordDetails (record: Record): Promise<RecordDetails> {
  return syncActivities()
    .then(() => Promise.all([
      syncIssue(record.issueId),
      getActivity(record.activityId)
    ]))
    .then(([ issue, activity ]) => ({
      id: record.id,
      project: issue.project,
      issue: issue,
      activity: activity,
      comment: record.comment,
      startTime: record.startTime,
      endTime: record.endTime,
      remoteId: record.remoteId,
      base: record
    }))
}
