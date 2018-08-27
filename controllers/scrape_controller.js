var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var request = require("request");
var db = require("../models/db.js");
var ObjectId = require("mongodb").ObjectID;

router.get("/scrape", function(req, res) {
  request("https://old.reddit.com/r/javascript/hot/", function(
    err,
    resp,
    html
  ) {
    var $ = cheerio.load(html);
    var results = [];
    $("a.title").each(function(i, element) {
      var title = $(element).text();
      var link = $(element).attr("href");

      results.push({
        title: title,
        link: link
      });

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert(
          {
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            } else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          }
        );
      }
    });
    res.redirect("/");
  });
});

router.get("/scrapeapi", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
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

router.get("/", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    var getresults = {};
    // Throw any errors to the console
    if (error) {
      console.log(error);
      res.render("index");
    }
    // If there are no errors, send the data to the browser as json
    else {
      getresults = {
        stuff: found
      };
      //   console.log(getresults);
      res.render("index", getresults);
    }
  });
  // Find all results from the scrapedData collection in the db
});

router.get("/saved", function(req, res) {
  db.savedData.find({}, function(error, found) {
    var getresults = {};
    // Throw any errors to the console
    if (error) {
      console.log(error);
      res.render("saved");
    }
    // If there are no errors, send the data to the browser as json
    else {
      getresults = {
        stuff: found
      };
      console.log(found);
      //   console.log(getresults);
      res.render("saved", getresults);
    }
  });
  // Find all results from the scrapedData collection in the db
});

router.delete("/saved/:id", function(req, res) {
  var id = req.params.id;
  db.savedData.remove({ _id: ObjectId(id) }, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      console.log(found);
    }
  });
});

router.get("/saved/:id", function(req, res) {
  //save article here
  var id = req.params.id;
  db.scrapedData.findOne({ _id: ObjectId(id) }, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      console.log(found);
      db.savedData.save(
        { _id: ObjectId(id), title: found.title, link: found.link },
        function(error, data1) {
          // Throw any errors to the console
          if (error) {
            console.log(error);
          }
          // If there are no errors, send the data to the browser as json
          else {
            console.log("done");
          }
        }
      );
    }
  });
});


router.get("/saved/notes/:id", function(req, res) {
  var id = req.params.id;
  console.log("get notes id");
  console.log(id);
  db.Note.find({ _id: id }, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      console.log("after savedmatch");
     res.json(found);
      // if(found.notes){
      // results=[...found.notes];
      // }
    }
  });
});

router.post("/saved/notes/:id", function(req, res) {
  //save notes here
  console.log("id for note save");
  console.log(req.params.id);
  var noteid=req.params.id;
  // Create a new note and pass the req.body to the entry
  db.Note.update({ _id:noteid},{$push:{note:req.body}},{upsert:true}, function(err, inserted) {
    if (err) {
      // Log the error if one is encountered during the query
      console.log(err);
    } else {
      console.log("TETSTSTS");
      console.log(inserted);
      // db.savedData.findAndModify(
      //   {
      //     query: { _id: ObjectId(req.params.id) },
      //     update: { $push: { notes: inserted._id } }
      //   },
      //   function(err, data1) {
      //     if (err) {
      //       console.log(err);
      //     }
      //     // If there are no errors, send the data to the browser as json
      //     else {
      //       console.log(data1);
      //     }
      //   }
      // );
    }
  });
});

module.exports = router;
