import express from 'express'
import { create } from '../database/user.js'

const router = new express.Router()
export { router as UserRouter }

router.post('/', async (req, res) => {
    const user = await create(
        req.body.username,
        req.body.password,
        req.body.email
    )
    res.json(user)
})
