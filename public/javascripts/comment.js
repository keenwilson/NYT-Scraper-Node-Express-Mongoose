function showResponses(event) {
  event.preventDefault();
  console.log("------------------------------");
  console.log("View Comments is clicked");
  console.log("------------------------------");
  var id = $(this).attr("value");
  $("#view-response")
    .fadeIn(300)
    .css("display", "flex");
  $("#save-comment").attr("value", articleId);
  $.get("/" + articleId, function(data) {
    $("#article-title").text(data.title);
    $.get("/comment/" + articleId, function(data) {
      if (data) {
        $("#comment-username").val(data.username);
        $("#comment-body").val(data.commentBody);
      }
    });
  });
}

function addComment(event) {
  event.preventDefault();
  var id = $(this).attr("value");
  var obj = {
    username: $("#comment-username")
      .val()
      .trim(),
    commentBody: $("#comment-body")
      .val()
      .trim()
  };
  console.log("------------------------------");
  console.log("This id", id);
  console.log("This comment object", obj);
  // $.post("/comment/" + id, obj, function(data) {
  //  window.location.href = "/saved";
  //});
}

$(document).on("click", ".view-comments", showResponses);
$(document).on("click", "#add-comment", addComment);
$("#close-comments").on("click", function() {
  $("#view-response").fadeOut(300);
});
