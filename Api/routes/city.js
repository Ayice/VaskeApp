const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const City = require('../models/City');

router.get('/', (req, res) => {
  City.find().then((result) => {
    res.status(200).json(result);
  });
});

router.post('/', (req, res) => {
  const cityData = new City({
    title: req.body.title,
    postnummer: req.body.zip,
  });

  cityData
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:zip', (req, res) => {
  City.findOne({ postnummer: req.params.zip })
    .then(city => {
      res.status(200).json({
        status: "Success",
        res: city
      });
    }).catch(err => {
      res.status(404).json({
        status: "Error",
        res: err.response.data
      });
    });
});

/**
 *
 * Insert every city in denmark !! (Works)
 *
 */

router.get('/magic', async (req, res) => {
  fetch('https://dawa.aws.dk/postnumre')
    .then((response) => {
      return response.json();
    })
    .then(async (response) => {
      response.forEach((city) => {
        let cityData = {
          title: city.navn,
          zip: city.nr,
        };
        let headers = { 'Content-Type': 'application/json' };
        let jsonCityData = JSON.stringify(cityData);
        fetch('http://localhost:3000/city', { method: 'POST', headers: headers, body: jsonCityData });
      });
    })
    .then((response) => {
      res.json('I am INEVITABLE!');
    });
});

module.exports = router;
