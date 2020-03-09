const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    uname : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : email,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

mongoose.model("profiles", ProfileSchema);