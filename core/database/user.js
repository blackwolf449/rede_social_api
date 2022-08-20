import mongoose from 'mongoose'
import { hash } from '../methods/hash.js'
import { create as createToken } from './tokens.js'

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    follower: { type: Array, default: [] },
    following: { type: Array, default: [] },
    posts: { type: Array, default: [] },
})

export const User = mongoose.model('User', userSchema)

export async function create(username, password, email) {
    const pass = hash(password)
    const user = new User({
        username: username,
        password: pass,
        email: email,
    })
    user.save()
    return user
}

export async function login(username, password) {
    const pass = hash(password)
    const user = await User.findOne({ username: username, password: pass })
    if (user == null) return { message: 'invalid username or password' }
    const tokens = await createToken(user['_id'], 3600)
    return {
        accessToken: tokens['accessToken'],
        refreshToken: tokens['refreshToken'],
        time: tokens['timeValid'],
    }
}

export function get(field, value) {
    return User.findOne({ [field]: value })
}

export function getAll(field, value) {
    return User.find({ [field]: value })
}
