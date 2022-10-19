/*
 * © 2022 Thoughtworks, Inc.
 */

import crypto from 'crypto'

Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
})