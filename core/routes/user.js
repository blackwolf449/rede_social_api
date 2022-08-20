import express from 'express'
import { authenticate } from '../database/tokens.js'
import { create, getAll } from '../database/user.js'

const router = new express.Router()
export { router as UserRouter }

router.post('/', async (req, res) => {
    const user = await create(
        req.body.username,
        req.body.password,
        req.body.email
    )
    res.status(200).json(user)
})

router.get('/', authenticate(), async (req, res) => {
    res.status(200).json(await getAll(req.body.field, req.body.value))
})
