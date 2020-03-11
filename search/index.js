const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const url = require("url")

app.use(cors());



const PORT = 5003;
app.listen(PORT, () => {
  console.log("post service runs on 5003");
});