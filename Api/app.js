const mongoose = require('mongoose')
const express = require('express')
const app = express()
const db = require('./db')
const session = require('express-session')
const cors = require('cors')
const authFuntion = require('./middlewares/verifyToken')
require('dotenv/config')

mongoose.set('useCreateIndex', true)
const machineRoute = require('./routes/machine')
const userRoute = require('./routes/user')
const appartmentRoute = require('./routes/appartment')
const cityRoute = require('./routes/city')

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())
app.use('/api/uploads', express.static('uploads'))

/**
 *
 * Session creation
 *
 */

app.use(
  session({
    secret: 'Session secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

/**
 * Routes
 */
app.use('/api/machine', authFuntion, machineRoute)
app.use('/api/user', userRoute)
app.use('/api/appartment', appartmentRoute)
app.use('/api/city', cityRoute)

/**
 * Port
 */
app.listen(3000, () => {
  console.log('App is listening on port 3000')
})

/**
 * Homepage
 */
app.get('/api', (req, res, next) => {
  res.send('<h1>This is Only the frontpage yeah</h1>')
})
