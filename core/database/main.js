import mongoose from 'mongoose'

export const connection = await mongoose.connect(process.env.SECRET_URL)
