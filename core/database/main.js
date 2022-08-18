import mongoose from 'mongoose'

mongoose.connect(process.env.SECRET_URL)

async function create(username, password, email) {
    const user = new User({
        username: username,
        password: password,
        email: email,
        follower: [],
        following: [],
        posts: [],
    })
    await user.save()
    return user
}
