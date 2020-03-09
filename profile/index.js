const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const fetch = require('node-fetch');
const url = require('url');

const DB_URL = "mongodb://127.0.0.1:27017/Profile";

mongoose.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("err");
  }
  console.log("DB: Profile connected");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log("post service runs on 5001");
});