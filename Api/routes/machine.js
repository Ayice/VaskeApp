const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Machine = require('../models/Machine')

/**
 *
 * Get all machines (Works)
 *
 */

router.get('/', (req, res) => {
	Machine.find().then((data) => {
		res.json(data)
	})
})

/**
 *
 * Create machine (Works)
 *
 */
router.post('/', (req, res) => {
	const machineData = new Machine({
		title: req.body.title,
		lejlighed: req.body.lejlighed,
	})

	machineData
		.save()
		.then((data) => {
			res.json(data)
		})
		.catch((err) => {
			res.json({ message: err })
		})
})

/**
 *
 * Get machines for a specific Appartment (Works)
 *
 */

router.get('/:id', (req, res) => {
	Machine.find({ lejlighed: req.params.id })
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			res.status(404).json(err)
		})
})

module.exports = router
