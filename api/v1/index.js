import express from 'express'
let rootRouter = express.Router()

/*
 * Sub Routes
 */
import serverRouter from './server'
import incidentRouter from './incident'

rootRouter.use('/server', serverRouter)
rootRouter.use('/incident', incidentRouter)

export default rootRouter