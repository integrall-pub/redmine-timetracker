/* @flow */
'use strict'

import Realm from 'realm'

class Property {}
Property.schema = {
  name: 'Property',
  primaryKey: 'key',
  properties: {
    key: 'string',
    value: 'string'
  }
}

class Project {}
Project.schema = {
  name: 'Project',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    identifier: 'string',
    description: 'string',
    parentId: 'int',
    parentName: 'string',
    status: 'int',
    hasTracking: 'bool',
    depth: 'int'
  }
}

class Issue {}
Issue.schema = {
  name: 'Issue',
  primaryKey: 'id',
  properties: {
    id: 'int',
    subject: 'string',
    description: 'string',
    authorId: 'int',
    authorName: 'string',
    projectId: 'int',
    projectName: 'string',
    trackerId: 'int',
    trackerName: 'string',
  }
}

class Activity {}
Activity.schema = {
  name: 'Activity',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string'
  }
}

class Record {}
Record.schema = {
  name: 'Record',
  primaryKey: 'id',
  properties: {
    id: 'int',
    projectId: 'int',
    issueId: 'int',
    activityId: 'int',
    comment: 'string',
    startTime: 'date',
    endTime: 'date',
    remoteId: 'int'
  }
}

export default new Realm({
  schema: [ Property, Project, Issue, Activity, Record ],
  schemaVersion: 1
})
