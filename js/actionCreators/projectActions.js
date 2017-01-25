/* @flow */
'use strict'

import type { Action } from '../types'

export const loadProjects = (): Action => ({
  type: 'projects-load-request'
})

export const expandProject = (id: number): Action => ({
  type: 'project-expand',
  projectId: id
})

export const selectProject = (id: number): Action => ({
  type: 'project-select',
  projectId: id
})
