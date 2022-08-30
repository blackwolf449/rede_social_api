import express from 'express'
import { create, get, getAll, getAllWhere } from '../database/posts.js'
import { get as getUser } from '../database/user.js'
import { authenticate, get as getToken } from '../database/tokens.js'
import { badRequest } from '../methods/responses.js'
import { autoComplete } from '../methods/autoComplete.js'

const router = express.Router()
export { router as PostsRouter }

router.post('/', authenticate(), async (req, res) => {
    const exist = await get('title', req.body.title)
    if (exist) return badRequest(res, 'This title already exist')
    const token = await getToken(
        'accessTokens',
        req.headers['authorization'].split(' ')[1]
    )
    const user = await getUser('_id', token['userId'])
    const post = await create(
        user['_id'],
        user['username'],
        req.body.title,
        req.body.description
    )
    res.status(200).json(post)
})

router.get('/', authenticate(), async (req, res) => {
    const name = req.query.name || ''
    const all = autoComplete(name, await getAll(), 'title')
    res.status(200).json(all)
})
