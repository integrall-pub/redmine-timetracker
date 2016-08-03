/* @flow */
'use strict'

import type { Action, Issue } from '../types'

export const search = (search: string, active: boolean = true): Action => ({
  type: 'rec-edit-issue-search',
  search: search,
  active: active
})

export const selectIssue = (issue: Issue): Action => ({
  type: 'rec-edit-issue-select',
  issueId: issue.id
})

export const editComment = (comment: string): Action => ({
  type: 'rec-edit-comment',
  comment: comment
})

export const clear = (): Action => ({
  type: 'rec-edit-clear'
})
