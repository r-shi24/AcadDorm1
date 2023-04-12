
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/videoDB", {useNewUrlParser : true});

const videoSchema = {
    name: String,
    video: String,
    topic: String
};
const Data = mongoose.model("Data", videoSchema);
const video1  = new Data({
    name: "STRINGS",
    video: "https://youtu.be/s4kPqE9c4yg",
    topic: "C"
});
const video2  = new Data({
    name: "DATA STRUCTURES",
    video: "https://youtu.be/s4kPqE9c4yg",
    topic: "C"
});
const video3  = new Data({
    name: "ARRAY",
    video: "https://youtu.be/s4kPqE9c4yg",
    topic: "C"
});


const defaultItems = [video1, video2, video3];


app.get("/", function(req, res) {
  Data.find()
  .then(function (foundItems) {
    if(foundItems.length ===  0)
    {
      console.log("BELLO");
      Data.insertMany(defaultItems)
      .then(function () {
          console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
          console.log("HELEO");
        });
        res.redirect("/");
    }
    else
    {
      res.render("list", {listTitle: "TODAY", newListItems: foundItems});
    } 
    });        
  });




app.listen(3000,function(req,res){
    console.log("SERVERSTARTED ON PORT 3000");
});