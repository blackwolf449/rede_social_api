import express from 'express'
import { authenticate } from '../database/tokens.js'
import { create, get, getAll } from '../database/user.js'
import { autoComplete } from '../methods/autoComplete.js'
import { badRequest } from '../methods/responses.js'

const router = new express.Router()
export { router as UserRouter }

router.post('/', async (req, res) => {
    const exist = await get('username', req.body.username)
    if (exist != undefined) badRequest(res, 'This user already exist', 400)
    else {
        const user = await create(
            req.body.username,
            req.body.password,
            req.body.email
        )
        res.status(200).json(user)
    }
})
router.get('/', authenticate(), async (req, res) => {
    const auto = autoComplete(req.query.name, await getAll(), username)
    res.status(200).json(auto)
})
