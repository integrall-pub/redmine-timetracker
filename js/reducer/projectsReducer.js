/* @flow */
'use strict'
import { List } from 'immutable'

import type {
  Action,
  Project
} from '../types'

const initialState = List()

export default function loginReducer (
  state?: List<Project> = initialState,
  action: Action
) {
  switch (action.type) {
    case 'projects-load-done':
      return action.success
        ? parseRoots(List(action.projects))
        : initialState

    default:
      return state
  }
}

const parse = (project: Project): Project => ({
  ...project,
  hasTracking: List(project.enabled_modules || []).map((m) => m.name).contains('time_tracking')
})

const parseRoots = (projects: List<Project>): List<Project> => (
  projects.reduce((roots, p) => (
    p.parent === undefined
      ? roots.push({
        ...parse(p),
        depth: 0,
        children: parseChildren(projects, p.id)
      })
      : roots),
      List()
    )
    // .reduce(flattenChildren, { depth: 1, projects: List() }).projects
)

const parseChildren = (
  projects: List<Project>,
  parentId: number,
  parentDepth: number = 0
): List<Project> => (
  projects.reduce((children, p) => (
    p.parent && p.parent.id === parentId
      ? children.push({
        ...parse(p),
        depth: parentDepth + 1,
        children: parseChildren(projects, p.id, parentDepth + 1)
      })
      : children
  ), List())
)

const flattenChildren = (state: { depth: number, projects: List<Project> }, p: Project) => (
  p.children && p.children.size > 0
    ? {
      ...state,
      projects: p.children.reduce(
        flattenChildren,
        {
          depth: state.depth + 1,
          projects: state.projects.push({ ...p, depth: state.depth })
        }
      ).projects
    }
    : {
        ...state,
        projects: state.projects.push({ ...p, depth: state.depth })
    }
)

const log = (o: any) => {
  if (List.isList(o)) {
    console.log(o.toArray())
  } else {
    console.log(o)
  }
  return o
}
