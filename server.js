import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './core/routes/user.js'
import { AuthRouter } from './core/routes/auth.js'
import { connect } from './core/database/main.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3000)

connect()

app.use('/user', UserRouter)

app.use('/oauth', AuthRouter)
