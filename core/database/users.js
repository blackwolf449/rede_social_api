import { connection } from './main.js'

const Schema = connection.user
const ObjectId = Schema.ObjectId

const User = new Schema({
    username: String,
    password: String,
    email: String,
    followers: Array,
    following: Array,
    posts: Array,
})
