const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url = require('./config.js')

const app = express();

console.log(url);
app.use(express.json());
app.use(cors());