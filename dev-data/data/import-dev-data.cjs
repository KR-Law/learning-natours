'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const Tour = require('./../../models/tourModels.cjs');

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
    console.log(`Connected to Database ${dbNameValue}. `);
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

dbConnect().catch((err) => console.log(err));

//Read JSON file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into database.
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

// Delete all Data from Collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// As is simple app.
// eslint-disable-next-line n/no-process-exit
process.exit();

// console.log(process.argv);
// [
//   '/home/anzenketh/.local/share/fnm/node-versions/v22.14.0/installation/bin/node',
//   '/home/anzenketh/Projects/Learning/NodeJS/udemy/4-natours/starter/dev-data/data/import-dev-data.cjs',
//   '--import',
// ];
