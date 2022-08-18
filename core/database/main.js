import mongoose from 'mongoose'

export function connect() {
    mongoose.connect(process.env.SECRET_URL)
}
