'use strict';
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app.cjs');

// console.log(process.env);
// DB Connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

async function dbConnect() {
  try {
    await mongoose.connect(DB);
    const dbNameValue = mongoose.connection.db.client.options.dbName;
    if (!dbNameValue) {
      throw new Error('Error connecting and obtaining DB Name');
    }
    console.log(`Connecting to Database ${dbNameValue}. `);
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

dbConnect().catch((err) => console.log(err));

/* Start Server */
const port = process.env.PORT || 3000;

// console.log(process.env);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
