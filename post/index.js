const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const url = require("url")
const fetch = require("node-fetch");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB_URL = "mongodb://127.0.0.1:27017/Posts";
let db;

mongoose.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("err");
  }
  console.log("DB: POSTS connected");
});

require("./models/Post");
const Post = mongoose.model("posts");

app.get("/api/v1/posts/", async (req, res) => {
    const query = url.parse(req.url, true).query;

    if(Object.entries(query).length === 0){
      try
      {
          const posts = await Post.find();
          res.send(posts);    
      }catch(err)
      {
          console.log(err)
          res.send(err);
      }
    }
    else
    {
      try
      {
          let {start, end} = query;
          const posts = await Post.find({}).skip(Number(start)).limit(end - start);
          res.send(posts);    
      }catch(err)
      {
          console.log(err)
          res.send(err);
      }
    }

})

app.post("/api/v1/posts/", async (req, res) => {
    const {uname, title, description} = req.body;
    const newPost = {
        uname,
        title,
        description
    }
    try{
        const result = await new Post(newPost).save();
        res.send(result);
    }catch(err){
        res.send(err);
    }
})

app.get("/api/v1/posts/generateposts", async (req, res) => {
  const resData = []
  for (let i = 0; i < 20; i++) {
      const curTime = new Date().getTime();
      const uname = curTime;
      const title = await generateTitle(Math.random() * 15);
      const description = await generateSentences();
      const likes = Math.floor(Math.random() * 1000000);
      comments = []
      for(let j = 0; j < Math.random() * 100; j++){
        comments.push(await generateSentences());
      }
      const data = {
          uname,
          title,
          description,
          likes,
          comments
      }
      try{
          const res = await new Post(data).save()
          resData.push(res);
      }catch(err){
        console.log(err)
      }
  }
  res.send(resData);
});

app.post("/api/v1/posts/map/", async (req, res) => {
  try{
    const profilesPromise = fetch("http://localhost:5002/api/v1/profile/");
    const [profilesResponse] = await Promise.all([profilesPromise]);
    const profilesJson = await profilesResponse.json();
    
    const posts = await Post.find();
    const resultList = []
    for(let i = 0; i < posts.length; i++ ){
      let index = Math.floor(Math.random() * profilesJson.length);
      let uname = profilesJson[index].uname;
      const result = await Post.findByIdAndUpdate(posts[i].id, {uname}, {new : true});
      resultList.push(result);
    }
    res.send(resultList);
  }catch(err){
    console.log(err)
    res.send(err)
  }
})

const PORT = 5001;
app.listen(PORT, () => {
  console.log("post service runs on 5001");
});

const generateSentences = () => {
  var verbs, nouns, adjectives, adverbs, preposition;
  nouns = [
    "bird",
    "clock",
    "boy",
    "plastic",
    "duck",
    "teacher",
    "old lady",
    "professor",
    "hamster",
    "dog"
  ];
  verbs = [
    "kicked",
    "ran",
    "flew",
    "dodged",
    "sliced",
    "rolled",
    "died",
    "breathed",
    "slept",
    "killed"
  ];
  adjectives = [
    "beautiful",
    "lazy",
    "professional",
    "lovely",
    "dumb",
    "rough",
    "soft",
    "hot",
    "vibrating",
    "slimy"
  ];
  adverbs = [
    "slowly",
    "elegantly",
    "precisely",
    "quickly",
    "sadly",
    "humbly",
    "proudly",
    "shockingly",
    "calmly",
    "passionately"
  ];
  preposition = [
    "down",
    "into",
    "up",
    "on",
    "upon",
    "below",
    "above",
    "through",
    "across",
    "towards"
  ];

  function randGen() {
    return Math.floor(Math.random() * 5);
  }

  function sentence() {
    var rand1 = Math.floor(Math.random() * 10);
    var rand2 = Math.floor(Math.random() * 10);
    var rand3 = Math.floor(Math.random() * 10);
    var rand4 = Math.floor(Math.random() * 10);
    var rand5 = Math.floor(Math.random() * 10);
    var rand6 = Math.floor(Math.random() * 10);
    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
    //                var i = randGen();
    var content =
      "The " +
      adjectives[rand1] +
      " " +
      nouns[rand2] +
      " " +
      adverbs[rand3] +
      " " +
      verbs[rand4] +
      " because some " +
      nouns[rand1] +
      " " +
      adverbs[rand1] +
      " " +
      verbs[rand1] +
      " " +
      preposition[rand1] +
      " a " +
      adjectives[rand2] +
      " " +
      nouns[rand5] +
      " which, became a " +
      adjectives[rand3] +
      ", " +
      adjectives[rand4] +
      " " +
      nouns[rand6] +
      ".";

      return content;
  }

  return sentence();
};

function generateTitle(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
