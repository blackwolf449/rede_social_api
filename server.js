import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRouter } from './core/routes/user.js'
import { AuthRouter } from './core/routes/auth.js'
import { PostsRouter } from './core/routes/posts.js'
import { CommentsRouter } from './core/routes/comments.js'
import { connect } from './core/database/main.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

connect()

app.use('/users', UserRouter)

app.use('/oauth', AuthRouter)

app.use('/posts', PostsRouter)

app.use('/comments', CommentsRouter)

app.listen(process.env.PORT || 3000, () =>
    console.log(process.env.PORT || 3000)
)
