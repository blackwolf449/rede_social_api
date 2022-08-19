import mongoose from 'mongoose'
import { hash } from '../methods/hash.js'
import { v4 as uuidv4 } from 'uuid'

const tokensSchema = new mongoose.Schema({
    userId: { type: Object },
    accessToken: { type: String },
    refreshToken: { type: String },
    timeValid: { type: Number },
    createDay: { type: Date },
    lastUpdateDay: { type: Date },
})

export const Tokens = mongoose.model('tokens', tokensSchema)

export async function create(userId, timeValid) {
    const exist = Tokens.findOne({ userId: userId })
    const accessToken = uuidv4()
    const refreshToken = uuidv4()
    const date = new Date()
    if (exist != undefined) {
        await Tokens.findOneAndUpdate(
            { userId: userId },
            { accessToken: accessToken, refreshToken: refreshToken }
        )
        const token = await Tokens.findOne({ userId: userId })
        return token
    }
    const token = new Tokens({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        timeValid: timeValid,
        createDay: date.getDate(),
        lastUpdateDay: date.getDate(),
    })
    await token.save()
    return token
}

export async function refresh(tokenRef) {
    const accessToken = uuidv4()
    const newRefreshToken = uuidv4()
    await Tokens.findOneAndUpdate(
        { refreshToken: tokenRef },
        { accessToken: accessToken, refreshToken: newRefreshToken }
    )
    return await Tokens.findOne({ accessToken: accessToken })
}

export async function authenticate() {
    return async (req, res, next) => {
        try {
            const exist = await Tokens.findOne({
                accessToken: req.headers['authorization'].split(' ')[1],
            })
        } catch (e) {
            res.json({ message: e })
        }
    }
}
