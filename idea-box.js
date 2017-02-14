$('#save-button').on('click' function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();

  $('#display-side').prepend(
    `<div class='idea-card'>
      <div id='line-1'>
        <h2 contenteditable='true'>${$ideaTitle}</h2>
        <button id='delete-button'>Delete</button>
      </div>
      <p id='line-2' contenteditable='true'>${$ideaContent}</p>
      <div id='line-3'>
        <button id='upvote-button'>
          <img src="images/upvote.svg" width='20' height='20' alt="">
        </button>
        <button id='downvote-button'>down</button>
        <p id='quality-line'>quality:  <span>swill</span></p>
      </div>
     </div>`);

  $('#idea-title').val('');
  $('#idea-content').val('');
});


$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'swill') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('genius');
  }
});

$('#display-side').on('click', '#downvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'genius') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('swill');
  }
});

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.idea-card');
  $whatIsDeleted.remove();
})


//global variables
// var $ideaTitle = $('idea-title');
// var $ideaContent = $('idea-title');


// //Deleting an idea card
// $('#display-side').on('click', '#delete-button', function() {
//   $(this).parent('.idea-card').remove();
// })
//
//
// //Search Bar ideas
//
// //on keyup run filtering function
// $('#search').on('keyup',function {
//
// //compare search value to card title
//
// //compare search value to card idea
//
// //remove cards that are not matching
//
// //when deleting cards should repopulate
// })
