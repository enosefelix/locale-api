const express = require('express')
const { connectMongoDB } = require('./src/db/db')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;
const authRouter = require('./src/routes/auth.route')
const apiRouter = require('./src/routes/api.route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/', authRouter)
app.use('/', apiRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the blogging api')
})

connectMongoDB()

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

