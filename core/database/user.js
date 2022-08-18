import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    follower: Array,
    following: Array,
    posts: Array,
})

module.exports = mongoose.model('User', userSchema)
