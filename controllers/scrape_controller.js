var express=require("express");
var router=express.Router();
var cheerio = require("cheerio");
var request = require("request");

router.get("/scrape",function(req,res){
    request("https://old.reddit.com/r/javascript/hot/", function (err, res, html) {
        var $ = cheerio.load(html);
        var results = [];
    
        $("p.title").each(function (i, element) {
                var title=$(element).text();
                var link =$(element).children().attr("href");
    
                results.push({
                    title:title,
                    link:link
                })
        });
        console.log(results);
    
    })
});


module.exports=router;