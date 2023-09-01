const express = require('express');
const connectToDatabase = require('./db');

// express
const app = express();
//body parser
app.use(express.json());

//connect to database
connectToDatabase();