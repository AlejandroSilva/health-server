import express from 'express';
let router = express.Router();

/*
 * Sub Routes
 */
import info from './info'
router.use('/info', info);

export default router;