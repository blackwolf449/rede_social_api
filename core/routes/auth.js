import express from 'express'
import { refresh } from '../database/tokens.js'
import { login } from '../database/user.js'

const router = new express.Router()
export { router as AuthRouter }

router.post('/access-token', async (req, res) => {
    const singIn = await login(req.body.username, req.body.password)
    if (!singIn) res.status(400).json(singIn)
    else {
        res.status(200).json(singIn)
    }
})

router.post('/refresh-token', async (req, res) => {
    const token = await refresh(req.headers['authorization'].split(' ')[1])
    res.json(token)
})
