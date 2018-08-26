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
