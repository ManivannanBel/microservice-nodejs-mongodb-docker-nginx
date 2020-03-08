const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const fetch = require('node-fetch');


app.use(cors());

const DB_URL = "mongodb://127.0.0.1:27017/Posts"

mongoose.connect(DB_URL, {useNewUrlParser : true}, (err, client) => {
    if(err){
        return console.log("err");
    }

    console.log("DB connected");
})

app.get("/api/v1/feeds/", async (req, res) => {
    try{
        const feedsPromise = fetch('http://localhost:5001/api/v1/post/');
        const promises = [feedsPromise];
        const [feedsResponse] = await Promise.all(promises);
        const feedsJson = await feedsResponse.json();
        res.send(feedsJson);
    }catch(err){
        console.log(err)
        return
    }
});

app.get("/api/v1/feeds/:start/:end", async (req, res) => {
    const {start, end} = req.params;
    console.log(start+" "+end);
    try{
        const feedsPromise = fetch(`http://localhost:5001/api/v1/post/${start}/${end}`);
        const promises = [feedsPromise];
        const [feedsResponse] = await Promise.all(promises);
        const feedsJson = await feedsResponse.json();
        res.send(feedsJson);
    }catch(err){
        console.log(err)
        return
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("feed service runs on 5000");
})