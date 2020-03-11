const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const fetch = require('node-fetch');
const url = require('url');
const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : false }))
//parse application/json
app.use(bodyParser.json())


const DB_URL = "mongodb://127.0.0.1:27017/Profile";

mongoose.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("err");
  }
  console.log("DB: Profile connected");
});

require("./models/Profile");
const Profile = mongoose.model("profiles");

app.get("/api/v1/profile", async (req, res) => {
  try{
    const result = await Profile.find();
    //console.log(result)
    res.send(result);
  }catch(err){
    //console.log(err);
    
    res.send(err);
  }
})

app.get("/api/v1/profile/:username", async (req, res) => {
  const {username} = req.params;
  //console.log(req.params)
  try{
    const result = await Profile.findOne({"uname" : username});
    //console.log(result)
    res.send(result);
  }catch(err){
    //console.log(err);
    
    res.send(err);
  }
})

app.post("/api/v1/profile", async (req, res) => {
  //console.log(req.body)
  const {uname, email, phone, password} = req.body;
  try{
    const newProfile = {
      uname,
      email,
      phone,
      password
    };
    const result = await new Profile(newProfile).save();
    res.send(result);
  }catch(err){
    //console.log(err);
    res.send(err);
  }
})

app.put("/api/v1/profile/:username", async (req, res) => {
  //console.log(req.body)
  const uname = req.params.username;
  const {email, phone, password} = req.body;
  try{
    const newProfile = {
      email,
      phone,
      password
    };
    const result = await Profile.findOneAndUpdate({"uname" : uname},newProfile, {new : true});
    res.send(result);
  }catch(err){
    //console.log(err);
    res.send(err);
  }
})

const PORT = 5002;
app.listen(PORT, () => {
  console.log("post service runs on 5002");
});