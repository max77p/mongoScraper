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
  $(".currentNotes").empty(); //empty notes and reload
  var thisId = $(this).data("id");
  console.log("thisid is");
  console.log(thisId);
  $(".saveNote").attr("data-Noteid", thisId);
  // When you click the savenote button
  $(".modal-title").html("Notes for Article: " + thisId);
  $.ajax({
    method: "GET",
    url: "/saved/notes/" + thisId
  }).then(function(data) {
    console.log("*****");
    console.log(data);
    showNotes(data,thisId);
  });
});

$(document).on("click", ".saveNote", function(e) {
    e.preventDefault();
  console.log("#$#$#$#");
  var thisId = $(this).data("noteid");
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
    location.reload();
  });
  $("#message-text").val("");
});

var showNotes = (elData,elId) => {
  //render notes when article notes is clicked
  var test = [...elData[0].messages];
//   console.log(test);
  for (el in test) {
    // console.log(test[el]);
    // console.log(test[el].note);
    // console.log(test[el].id1);
    var div = $('<div class="indiNote">')
      .append($("<span>"))
      .html(test[el].note.body)
      .append($('<button type="button" class="dleteNote btn btn-danger" data-dismiss="modal">&times;</button>').attr("data-mainid",elId).attr("data-specificId",test[el].id1));
    $(".currentNotes").append(div);
  }
};

$(document).on("click", ".dleteNote", function(e) {
  e.preventDefault();
  e.stopPropagation();
  var mainid = $(this).data("mainid");
  var specid=$(this).data("specificid");
  console.log(specid);

  $.ajax("/saved/notes/"+mainid+"/"+specid, {
    type: "PUT"
  }).then(function(data) {
    console.log(data);
  });
});
