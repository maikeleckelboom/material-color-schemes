import { beforeAll, describe, expect, it } from 'vitest'
import {createMaterialTheme} from "../src/core/theme.ts";

beforeAll(async () => {})

describe('createMaterialTheme', () => {
  it('should accept an direct argument', async () => {
    const theme = createMaterialTheme(0xff00ff)
    expect(theme).toBeDefined()
  })

  it('should accept an options object', async () => {
    const theme = createMaterialTheme({seedColor: 0xff00ff})
    expect(theme).toBeDefined()
  })


})
