$('#save-button').on('click' function() {
  var $ideaTitle = $('#idea-title');
  var $ideaContent = $('#idea-content');

  $('#display-side').prepend(
    "<div class='idea-card'><h2>" + $ideaTitle.val() + "</h2><button id='delete-button'>x</button><p>" + $ideaContent.val() + "</p><button id='upvote-button'>x</button><buttonid='downvote-button'>x</button><p>quality: swill</p></div>"
});
