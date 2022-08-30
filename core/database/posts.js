import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: { type: Object },
    username: { type: String },
    title: { type: String },
    description: { type: String },
    likes: { type: Array, default: [] },
})

export const Posts = mongoose.model('Posts', postSchema)

export function create(userId, username, title, description) {
    const posts = new Posts({
        userId: userId,
        username: username,
        title: title,
        description: description,
    })
    posts.save()
    return posts
}

export function get(field, value) {
    return Posts.findOne({ [field]: value })
}

export function getAllWhere(field, value) {
    return Posts.find({ [field]: value })
}

export function getAll() {
    return Posts.find()
}

export function update(objSearch, objUpdate) {
    return Posts.findOneAndUpdate(objSearch, objUpdate, { new: true })
}
