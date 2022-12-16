const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  // this is the id of the current user which comes from the  'user' model
        ref: 'user'
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true,
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);