const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const DB_URL = "mongodb://127.0.0.1:27017/Posts"
let db;

mongoose.connect(DB_URL, {useNewUrlParser : true}, (err, client) => {
    if(err){
        return console.log("err");
    }
    console.log("DB: POSTS connected");
})

app.get('/generateposts', (req, res) => {

})

const PORT = 5001;
app.listen(PORT, () => {
    console.log("post service runs on 5001");
})