import mongoose from 'mongoose'
import { badRequest } from '../methods/responses.js'
import { v4 as uuidv4 } from 'uuid'

const tokensSchema = new mongoose.Schema({
    userId: { type: Object },
    accessToken: { type: String },
    refreshToken: { type: String },
    timeValid: { type: Number },
    createDay: { type: Date },
    lastUpdateDay: { type: Date },
})

const Tokens = mongoose.model('tokens', tokensSchema)

export async function create(userId, timeValid) {
    const exist = await Tokens.findOne({ userId: userId })
    const accessToken = uuidv4()
    const refreshToken = uuidv4()
    const date = new Date()
    if (exist) {
        const token = await Tokens.findOneAndUpdate(
            { userId: userId },
            {
                accessToken: accessToken,
                refreshToken: refreshToken,
                lastUpdateDay: date.toISOString(),
            },
            {
                new: true,
            }
        )
        return token
    }
    const token = new Tokens({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        timeValid: timeValid,
        createDay: date.toISOString(),
        lastUpdateDay: date.toISOString(),
    })
    await token.save()
    return token
}

export async function refresh(tokenRef) {
    const accessToken = uuidv4()
    const newRefreshToken = uuidv4()
    const tokens = await Tokens.findOneAndUpdate(
        { refreshToken: tokenRef },
        { accessToken: accessToken, refreshToken: newRefreshToken },
        { new: true }
    )
    return {
        accessToken: tokens['accessToken'],
        refreshToken: tokens['refreshToken'],
    }
}

export function authenticate() {
    return async (req, res, next) => {
        const exist = await Tokens.findOne({
            accessToken: req.headers['authorization'].split(' ')[1],
        })
        if (exist == undefined) badRequest(res, 'Not authorized', 403)
        else {
            const expireDate = exist['lastUpdateDay'].setTime(
                exist['lastUpdateDay'].getTime + exist['timeValid']
            )
            const date = new Date().getTime
            if (expireDate > date) badRequest(res, 'Not authorized', 403)
            next()
        }
    }
}
