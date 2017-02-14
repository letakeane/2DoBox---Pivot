$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();

  $('#display-side').prepend(
    `<div class='idea-card'>
      <div id='line-1'>
        <h2>${$ideaTitle}</h2>
        <button id='delete-button'>Delete</button>
      </div>
      <p id='line-2'>${$ideaContent}</p>
      <div id='line-3'>
        <button id='upvote-button'>up</button>
        <button id='downvote-button'>down</button>
        <p>quality:  swill</p>
      </div>
     </div>`);

  $('#idea-title').val('');
  $('#idea-content').val('');

});
