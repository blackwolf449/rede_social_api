import mongoose from 'mongoose'
import { hash } from '../methods/hash'
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
    const accessToken = uuidv4()
    const refreshToken = `${accessToken}.${hash(accessToken)}`
    const date = new Date()
    const token = new Tokens({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        timeValid: timeValid,
        createDay: date.getDate(),
        lastUpdateDay: date.getDate(),
    })
}

export async function find(field, value) {}
