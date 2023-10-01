require("dotenv").config();
const express = require("express");
const app = express();
require("./src/db/mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const userRouter = require("./src/routers/user");
const cookieParser = require("cookie-parser");
const auth = require("./src/middleware/auth");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", function(req,res){
    res.send("Welcome to BloodCamp");
})
app.get("/register", function(req,res){
    res.render("register");
})
app.get("/login", function(req,res){
    res.render("login");
})
app.get("/logout", function(req,res){
    res.send("Successfully logged out from BloodCamp");
})
app.get("/profile", auth, function(req, res){
    res.render("profile");
})

app.use(userRouter);

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port: 3000");
})