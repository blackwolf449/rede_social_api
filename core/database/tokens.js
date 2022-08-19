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
    const refreshToken = `${accessToken}.${hash(accessToken)}`
    const date = new Date()
    if (exist) {
        const token = Tokens.findOneAndUpdate(
            { userId: userId },
            { accessToken: accessToken, refreshToken: refreshToken }
        )
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

export async function refresh(refreshToken) {
    const accessToken = uuidv4()
    const newRefreshToken = `${accessToken}.${hash(accessToken)}`
    const tokens = await Tokens.findByIdAndUpdate(
        { refreshToken: refreshToken },
        { accessToken: accessToken, refreshToken: newRefreshToken }
    )
    return {
        accessToken: tokens['accessToken'],
        refreshToken: tokens['refreshToken'],
        time: tokens['timeValid'],
    }
}
