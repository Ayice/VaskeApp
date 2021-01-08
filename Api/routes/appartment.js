const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const City = require('../models/City');
const Appartment = require('../models/Appartment');

router.get('/', (req, res) => {
  Appartment.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post('/', (req, res) => {
  const appartmentData = new Appartment({
    title: req.body.title,
    by: req.body.city,
  });

  appartmentData
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', async (req, res) => {
  const app = await Appartment.findById(req.params.id);
  const city = await City.findById(app.by);

  const appartmentModel = {
    title: app.title,
    city: city.title,
    zip: city.postnummer
  };

  res.status(200).json({
    status: 'Success',
    data: appartmentModel
  });

});

module.exports = router;
