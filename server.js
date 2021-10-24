const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const chalk = require('chalk')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
require('dotenv').config()

const server = express()

server.use(express.json())
server.use(cors())
server.use(morgan())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue("db is connected")))
    .catch(() => console.log(chalk.red("db is not connected")))

server.use('/api/v1', authRouter)


server.listen(process.env.PORT, () => {
    console.log("Server is started")
})