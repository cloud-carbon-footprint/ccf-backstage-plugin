/*
 * © 2022 Thoughtworks, Inc.
 */

// Temporary fix to weird text encoder issue on line 5 of router.test.ts file
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder