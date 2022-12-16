const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);   // name of the table is user
// Here it returns a Mongoose object...hence User is a Mongoose object
// User.createIndexes()     ---> It gives an index to every email(due to unique = true) to avoid  same having two email
module.exports = User;