const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Machine = require('../models/Machine');
const RentMachine = require('../models/RentMachine');
// const Date = require('../middlewares/date');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileSize: 1024 * 1024 * 5,
});

/**
 *
 * Get all machines (Works)
 *
 */

router.get('/', (req, res) => {
  Machine.find().then(data => {
    res.json(data);
  });
});

/**
 *
 * Create machine (Works)
 *
 */
router.post('/', upload.single('machineImage'), (req, res) => {
  console.log(req.file);
  const machineData = new Machine({
    title: req.body.title,
    lejlighed: req.body.lejlighed,
    machine_image: req.file.path,
  });

  machineData
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

/**
 *
 * Get machines for a specific Appartment (Works)
 *
 */

router.get('/:id', (req, res) => {
  let machines = [];
  Machine.find({ lejlighed: req.params.id })
    .then(result => {
      machines = [ ...result ];

      machines.forEach((machine, index, array) => {
        RentMachine.findOne({ machine_id: machine._id }).then(
          (response, err) => {
            if (err) return res.json(machine);
            if (!response) {
              console.log('None found');
              return res.json(machines);
            }
            console.log(response.renting_free);
            machine[ 'tid_tilbage' ] = response.renting_free;

            console.log(machine);
            if (array.length === index + 1) {
              return res.json(machines);
            }
            return;
          }
        );
      });
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/rent/:id', async (req, res) => {
  let rentingTime = req.body.time * 60 * 1000;
  let freeForRentTime = 0;
  let rentMachine = await RentMachine.findOne({ machine_id: req.params.id });

  if (rentMachine) {
    return res.status(400).json({
      status: 'Error',
      msg: 'Maskinen er allerede optaget, desværre',
    });
  }

  const convertMilliToDate = () => {
    return new Promise((resolve, reject) => {
      freeTime(rentingTime).then(data => {
        let date = new Date(data);
        return resolve(date);
      });
    });
  };

  const freeTime = h => {
    return new Promise((resolve, reject) => {
      let date = new Date();
      let addTime = date.setTime(date.getTime() + h);
      freeForRentTime = addTime;
      return resolve(addTime);
    });
  };
  convertMilliToDate();

  let counter = 0;
  let timer = setInterval(() => {
    counter++;
    let newTime = rentingTime / 1000 - counter;
    return newTime;
  }, 1000);

  const rentMachineData = new RentMachine({
    machine_id: req.params.id,
    renting_free: freeForRentTime,
  });

  try {
    const newRent = await rentMachineData.save();
    setTimeout(() => {
      RentMachine.deleteOne({ machine_id: newRent.machine_id }, err => {
        if (err) return console.log(err);
        console.log('removed');
        clearInterval(timer);
      });
    }, rentingTime);

    res.json({
      status: 'Success',
      msg: 'Du har nu optaget maskinen',
      rentedMachine: newRent
    });
  } catch (error) {
    res.json({
      status: 'Error',
      msg: 'Der opstod en fejl, prøv igen senere',
      err: error
    });
  }
});

module.exports = router;
