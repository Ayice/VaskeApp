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
const cityRouute = require('./routes/city')

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())

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
app.use('/api/city', cityRouute)

/**
 * Port
 */
app.listen(3000, () => {
	console.log('yes i am here biatch !')
})

/**
 * Homepage
 */
app.get('/', (req, res, next) => {
	res.send('<h1>This is only the frontpage yeah</h1>')
})
