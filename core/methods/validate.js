import { badRequest } from './responses.js'

export function validateBody(obj) {
    return (req, res, next) => {
        const { body } = req
        if (typeof body !== 'object')
            return badRequest(res, {
                message: 'Invalid fields',
            })
        for (const key in obj) {
            if (!body[key])
                return badRequest(res, {
                    message: `${key} is required`,
                })
        }
        next()
    }
}
