import express from 'express'
import { create, login } from '../database/user.js'

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

router.post('/access-token', async (req, res) => {
    const singIn = await login(req.body.username, req.body.password)
    if (singIn == null) res.status(400).json(singIn)
    else {
        res.status(200).json(singIn)
    }
})
