const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url = require('./config.js')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to " + url))
    .catch(console.error);

app.listen(3001, () => console.log("Server started on port 3001"));
