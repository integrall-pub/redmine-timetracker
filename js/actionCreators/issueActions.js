/* @flow */
'use strict'

import type { Action } from '../types'

export const loadIssues = (projectId: number): Action => ({
  type: 'issues-load',
  projectId: projectId
})
