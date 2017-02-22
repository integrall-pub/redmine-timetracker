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
  Action,
  Project
} from '../types'

const initialState = List()

export default function loginReducer (
  state?: List<Project> = initialState,
  action: Action
) {
  switch (action.type) {
    case 'projects-load':
      return action.success
        ? parseRoots(List(action.projects))
        : initialState

    default:
      return state
  }
}

function parseRoots (projects: List<Project>): List<Project> {
  return projects.reduce((roots, p) => (
    p.parent === undefined
      ? roots.push({
        ...p,
        depth: 0,
        children: parseChildren(projects, p.id)
      })
      : roots),
      List()
    )
    // .reduce(flattenChildren, { depth: 1, projects: List() }).projects
}

const parseChildren = (
  projects: List<Project>,
  parentId: number,
  parentDepth: number = 0
): List<Project> => (
  projects.reduce((children, p) => (
    p.parent && p.parent.id === parentId
      ? children.push({
        ...p,
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
