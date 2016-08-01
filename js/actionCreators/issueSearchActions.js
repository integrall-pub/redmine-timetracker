/* @flow */
'use strict'

import type { Action, Issue } from '../types'

export const search = (search: string, active: boolean = true): Action => ({
  type: 'issue-search',
  search: search,
  active: active
})

export const select = (issue: Issue): Action => ({
  type: 'issue-select',
  issueId: issue.id
})
