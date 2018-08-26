
var mongojs=require("mongojs");
//database configuration
var databaseUrl="scraper";
var collections=["scrapedData","savedData"];

//hook mongojs config to the db variable
var db=mongojs(databaseUrl,collections);
db.on("error",function(error){
    console.log("Database Error:", error);
})

module.exports = db;