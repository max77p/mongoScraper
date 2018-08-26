var express=require("express");
var mongojs=require("mongojs");
var bodyParser = require("body-parser");
//parses our html and helps us find elements---these two make scraping possible
var cheerio = require("cheerio");
var request = require("request");


//initialize express
var app=express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var exphbs=require("express-handlebars");

app.engine("handlebars",exphbs({defaultLayout:"main"}));
app.set("view engine","handlebars");


var routes=require("./controllers/scrape_controller.js");
app.use(routes);

app.listen(PORT,function(){
    console.log(`App running on port ${PORT}`);
});