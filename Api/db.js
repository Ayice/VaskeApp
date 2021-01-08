const mongoose = require('mongoose');
require('dotenv/config');

/**
 * Db connection
 */
let db = mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('we are connected');
  })
  .catch(err => {
    throw err;
  });

module.exports = { db };
