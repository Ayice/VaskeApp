const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Appartment = require('../models/Appartment')

router.get('/', (req, res) => {
	Appartment.find()
		.then((result) => {
			res.json(result)
		})
		.catch((err) => {
			res.status(404).json(err)
		})
})

router.post('/', (req, res) => {
	const appartmentData = new Appartment({
		title: req.body.title,
		by: req.body.city,
	})

	appartmentData
		.save()
		.then((result) => {
			res.status(200).json(result)
		})
		.catch((err) => {
			res.status(500).json(err)
		})
})

module.exports = router
