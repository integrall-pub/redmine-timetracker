/* @flow */
'use strict'

import type { Action } from '../types'

export const loadProjects = (): Action => ({
  type: 'projects-load'
})

export const expandProject = (id: number): Action => ({
  type: 'project-expand',
  projectId: id
})
