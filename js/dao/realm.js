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

import Realm from 'realm'

class Property {
  static schema: any;
}
Property.schema = {
  name: 'Property',
  primaryKey: 'key',
  properties: {
    key: 'string',
    value: 'string'
  }
}

class Project {
  static schema: any;
}
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

class Issue {
  static schema: any;
}
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
    trackerName: 'string'
  }
}

class Activity {
  static schema: any;
}
Activity.schema = {
  name: 'Activity',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string'
  }
}

class Record {
  static schema: any;
}
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
