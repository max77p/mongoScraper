$(document).on("click", ".scrapeBtn", function(e) {
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: "/scrape"
  }).then(function(data) {
    console.log(data);
    $(".articleSection").load(" .articleSection > *");
  });
});

$(document).on("click", ".dleteBtn", function(e) {
  e.preventDefault();
  var _id = $(this).data("id");
  console.log(_id);

  $.ajax("/saved/" + _id, {
    type: "DELETE"
  }).then(function(data) {
    console.log(data);
    // Reload the page to get the updated list
  });
  $(".articleSection").load(" .articleSection > *");
});

$(document).on("click", ".saveBtn", function(e) {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).data("id");
  $.ajax({
    method: "GET",
    url: "/saved/" + thisId
  }).then(function(data) {
    // Log the response
    console.log(data);
  });
});

$(document).on("click", ".articleBtn", function(e) {
  e.preventDefault();
  $('.currentNotes').empty();
  var thisId = $(this).data("id");
  console.log("thisid is");
  console.log(thisId);
  // When you click the savenote button
  $(".modal-title").html("Notes for Article: " + thisId);
  $.ajax({
    method: "GET",
    url: "/saved/notes/" + thisId
  }).then(function(data) {
    console.log("*****");
    console.log(data);
    showNotes(data);
  });

  $(document).on("click", ".saveNote", function() {
      console.log("#$#$#$#");
    console.log(thisId);
    console.log("@#!#!@#");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/saved/notes/" + thisId,
      data: {
        body: $("#message-text").val()
      }
    }).then(function(data) {
      // Log the response
      console.log(data);
    });
    $("#message-text").val("");
  });
});


var showNotes=(elData)=>{
    var test=[...elData[0].note];
    for(el in test){
        console.log(test[el]);
        console.log(test[el].body);
        var div=$('<div class="indiNote">').append($('<span>')).html(test[el].body);
        $('.currentNotes').append(div);
    }
};