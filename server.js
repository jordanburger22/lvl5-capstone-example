const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

connectToDb()

app.use('/goal', require('./routes/goalRouter'))

app.use((err, req, res, next) => {
    console.log(err)

    return res.send({errMsg: err.message})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))