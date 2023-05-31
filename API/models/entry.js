const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    text : {
        type: String,
        required : true,
        default : ""
    },
    complete : {
        type: Boolean,
        default: false
    },
    timestamp : {
        type: Date,
        default: Date.now()
    },
    user : {
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        default: ""
    }
})

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;