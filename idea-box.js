$('#save-button').on('click' function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();

  $('#display-side').prepend("<div class='idea-card'><h2>" + $ideaTitle + "</h2><button id='delete-button'>x</button><p>" + $ideaContent + "</p><button id='upvote-button'>x</button><buttonid='downvote-button'>x</button><p>quality: swill</p></div>");
});
