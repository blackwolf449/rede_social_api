import mongoose from 'mongoose'
import { hash } from '../methods/hash.js'

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
