/* @flow */
'use strict'

import type { Action } from '../types'

export const setEndpoint = (endpoint: string): Action => ({
  type: 'api-endpoint-set',
  endpoint: endpoint
})
