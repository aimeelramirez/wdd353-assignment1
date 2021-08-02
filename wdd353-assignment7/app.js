"use strict";
var express= require("express");
var request = require("request");
var app=express();
var router = express.Router();

router.get("/",function(req,res){
console.log("Here");
res.send("Hello by Your Name");
})

app.use("/",router);
app.listen(8080);
