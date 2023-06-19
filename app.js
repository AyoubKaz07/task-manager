require('dotenv').config()
const express = require('express')
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect')
const NotFound = require('./middleware/notfound')
const ErrorHandler = require('./middleware/errorhandler')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(express.json()) 

app.use('/api/v1/tasks', tasks)
app.use(NotFound)
app.use(ErrorHandler)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

