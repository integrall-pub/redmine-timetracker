/* @flow */
'use strict'
import { List } from 'immutable'
import type { Project } from '../types'

export const findProject = (
  projects: List<Project>,
  id: number
): Project|null => {
  let find = (match: Project|null, p: Project) => (
    match || (
      p.id === id
        ? p
        : p.children.reduce(find, match) || null
    )
  )
  return projects.reduce(find, null)
}
