import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './core/routes/user.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3000, console.log(process.env.SECRET_URL))

app.use('/user', UserRouter)
