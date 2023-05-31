const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url = require('./config.js')

const app = express();

app.use(express.json());
app.use(cors());

const Entry = require('./models/entry');


mongoose.connect(url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to " + url))
    .catch(console.error);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected!');
});

app.get('/todo', async (req, res) => {
    const entries = await Entry.find({user: "6477bcb0a0d02bb3e2a329a8"});

    res.json(entries);
})

app.post('/todo/new', (req, res) => {
    const entry = new Entry({
        text: req.body.text,
        /* Change user to be a user id via token in the future */
        user: "6477bcb0a0d02bb3e2a329a8"
    })

    entry.save();

    res.json(entry);
})

app.listen(3001, () => console.log("Server started on port 3001"));
