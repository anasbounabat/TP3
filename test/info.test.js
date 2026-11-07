/**
 * Integration test for GET /info.
 * Validates the merged info object from helpers.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'
import { getPackageInfo } from '../src/utils/appInfo.js'

describe('GET /info', () => {
  it('returns app info', async () => {
    const res = await request(app).get('/info')
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(Object.keys(res.body).sort()).toEqual(['name', 'node', 'uptime', 'version'])
  })

  it('matches package.json name and version', async () => {
    const res = await request(app).get('/info')
    const pkg = getPackageInfo()
    expect(res.body.name).toBe(pkg.name)
    expect(res.body.version).toBe(pkg.version)
  })

  it('has plausible node version & non-negative uptime', async () => {
    const res = await request(app).get('/info')
    expect(res.body.node).toMatch(/^v\d+\.\d+\.\d+/)
    expect(res.body.uptime).toBeGreaterThanOrEqual(0)
  })
})
