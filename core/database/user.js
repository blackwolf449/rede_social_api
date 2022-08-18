import mongoose from 'mongoose'

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
    const user = new User({
        username: username,
        password: password,
        email: email,
    })
    user.save()
    return user
}
