import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    userId: { type: Object },
    username: { type: String },
    text: { type: String },
    comments: { type: Array, default: [] },
})

export const Comments = mongoose.model('Comments', commentSchema)

export function create(userId, username, text, comments) {
    const comment = new Comments({
        userId: userId,
        username: username,
        text: text,
    })
    comment.save()
    return comment
}

export function get(field, value) {
    return Comments.findOne({ [field]: value })
}

export function getAll() {
    return Comments.find()
}

export function getAllWhere(field, value) {
    return Comments.find({ [field]: value })
}

export function getPersonalized(obj) {
    return Comments.find(obj)
}
