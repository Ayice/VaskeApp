const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Machine = require('../models/Machine')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileSize: 1024 * 1024 * 5,
})

/**
 *
 * Get all machines (Works)
 *
 */

router.get('/', (req, res) => {
  Machine.find().then(data => {
    res.json(data)
  })
})

/**
 *
 * Create machine (Works)
 *
 */
router.post('/', upload.single('machineImage'), (req, res) => {
  console.log(req.file)
  const machineData = new Machine({
    title: req.body.title,
    lejlighed: req.body.lejlighed,
    machine_image: req.file.path,
  })

  machineData
    .save()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
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
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

module.exports = router
