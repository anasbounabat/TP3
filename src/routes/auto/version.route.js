/**
 * GET /version → { version: "<package.json version>" }
 * TD-5 : réutilise getPackageInfo() (une seule lecture de package.json, source de vérité unique).
 */
import { Router } from 'express'
import { getPackageInfo } from '../../utils/appInfo.js'

const router = Router()

router.get('/version', (_req, res) => {
  res.status(200).json({ version: getPackageInfo().version })
})

export default router
