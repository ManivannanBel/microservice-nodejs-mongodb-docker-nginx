const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    uname : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true, 
    },
    likes : {
        type : Number,
        default : 0
    },
    comments : [{type : String}]    
})

mongoose.model("posts", PostSchema);