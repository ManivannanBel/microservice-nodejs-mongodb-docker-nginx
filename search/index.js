const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const url = require("url")
const fetch = require('node-fetch');

app.use(cors());

app.get("/api/v1/search", async (req, res) => {
  const query = url.parse(req.url, true).query;
  if(Object.entries(query).length !== 0){
    try{
      const searchPostResPromise = fetch(`http://localhost:5001/api/v1/posts/search/?q=${query.q}`)
      const searchProfileResPromise = fetch(`http://localhost:5002/api/v1/search/profile/?q=${query.q}`)
      const [searchPostResResponse, searchProfileResResponse] = await Promise.all([searchPostResPromise, searchProfileResPromise])
      const searchPostResJson = await searchPostResResponse.json();
      const searchProfileResJson = await searchProfileResResponse.json();
      res.send([...searchProfileResJson, ...searchPostResJson]);
    }catch(err){
      console.log(err)
      res.send(err);
    }
  }
})

const PORT = 5003;
app.listen(PORT, () => {
  console.log("post service runs on 5003");
});