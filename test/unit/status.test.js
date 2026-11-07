import { describe, it, expect } from 'vitest'
import { formatStatus } from '../../src/utils/status.js'

describe('formatStatus', () => {
  it('throws on negative uptime', () => {
    expect(() => formatStatus(-1)).toThrow('invalid uptime')
  })

  it('returns warming-up from 0 to 59s', () => {
    expect(formatStatus(0)).toBe('warming-up')
    expect(formatStatus(59)).toBe('warming-up')
  })

  it('returns healthy from 60s to just under 1h', () => {
    expect(formatStatus(60)).toBe('healthy')
    expect(formatStatus(3599)).toBe('healthy')
  })

  it('returns steady at 1h and after', () => {
    expect(formatStatus(3600)).toBe('steady')
    expect(formatStatus(86400)).toBe('steady')
  })

  it('handles fractional uptime like process.uptime()', () => {
    expect(formatStatus(59.9)).toBe('warming-up')
    expect(formatStatus(60.1)).toBe('healthy')
  })
})
