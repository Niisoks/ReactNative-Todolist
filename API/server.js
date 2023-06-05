const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const url = require('./config.js');

const app = express();

app.use(express.json());
app.use(cors());

const Entry = require('./models/entry');
const User = require('./models/user');


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

app.get('/user', async (req, res) =>{
    const users = await User.find()

    res.json(users);
})

app.post('/user/login', async (req , res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Username' });
    }

    console.log(user)
    console.log(password)

    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation){
        return res.status(401).json({ message: 'Invalid Password' });
    }

    res.json(user)
})

app.post('/user/register', async (req, res) => {
    const { username, password, email } = req.body;
    if(!username || !password || !email){
        console.log('Registration failed')
        return res.status(500).json({message: 'Registration Failed: required fields are empty'});
    } 

    const existingUser = await User.findOne({ username })
    if(existingUser){
        console.log('User Exists');
        return res.status(500).json({message: 'Registration Failed: User exists'});
    }

    //hashing is handled in the schema
    const newUser = new User({
        username,
        password,
        email
    })

    await newUser.save();
    res.json(newUser);
})

/* app.get('/todo', async (req, res) => {
    const entries = await Entry.find({user: "6477bcb0a0d02bb3e2a329a8"});

    res.json(entries);
}) */

app.get('/todo/:token', async (req, res) => {
    if(req.params.token == ''){return;}
    const entries = await Entry.find({user: req.params.token});

    res.json(entries);
})

app.post('/todo/:token/new', (req, res) => {
    const entry = new Entry({
        text: req.body.text,
        /* Change user to be a user id via token in the future */
        user: req.params.token
    })

    entry.save();
    res.json(entry);
})

app.put('/todo/complete/:id', async (req, res) => {
    const entry = await Entry.findById(req.params.id);

    entry.complete = !entry.complete;

    entry.save();

    res.json(entry);
})

app.delete('/todo/delete/:id', async(req, res) => {
    const result = await Entry.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.listen(3001, () => console.log("Server started on port 3001"));
