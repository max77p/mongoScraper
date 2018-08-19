var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var request = require("request");
var db = require("../models/db.js");

router.get("/scrape", function (req, res) {
    request("https://old.reddit.com/r/javascript/hot/", function (err, res, html) {
        var $ = cheerio.load(html);
        var results = [];

        $("p.title").each(function (i, element) {
            var title = $(element).text();
            var link = $(element).children().attr("href");

            results.push({
                title: title,
                link: link
            })

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the data in the scrapedData db
                db.scrapedData.insert({
                        title: title,
                        link: link
                    },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        } else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
        console.log(results);
    })
    res.send("scrape complete");
});


router.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

module.exports = router;