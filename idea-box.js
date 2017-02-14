$('#save-button').on('click' function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();

  $('#display-side').prepend(
    "<div class='idea-card'><h2>" + $ideaTitle + "</h2><button id='delete-button'>x</button><p>" + $ideaContent + "</p><button id='upvote-button'>x</button><buttonid='downvote-button'>x</button><p>quality: swill</p></div>"
});


//global variables
var $ideaTitle = $('idea-title');
var $ideaContent = $('idea-title');

//clear fields function add to end of save button
function clearField () {
  $ideaTitle.val("");
  $ideaContent.val("");
}

//NOTE: Found code pen on making content editable by user. .onBlur() function to commit changes????
// <div contenteditable="true">
//   This text can be edited by the user.
// </div>

//save button clear fields
$('save-button').on('click', function () {
  clearField();
})

// UPVOTE BTN quality span needs ID for sibling ref
$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings($('#quality').text())

  if ($qualityText === 'swill') {
    $qualityText.text('plausible')
  } else if ($qualityText === 'plausible') {
    $qualityText.text('genius')
  }
})


// DWNVOTE BTN quality span needs ID for sibling ref
$('#display-side').on('click', '#downvote-button', function() {
  var $qualityText = $(this).siblings($('#quality').text());

  if ($qualityText === 'genius') {
    $qualityText.text('plausible')
  } else if ($qualityText === 'plausible') {
    $qualityText.text('genius')
  })
})

//Deleting an idea card
$('#display-side').on('click', '#delete-button', function() {
  $(this).parent('.idea-card').remove();
})


//Search Bar ideas

//on keyup run filtering function
$('#search').on('keyup',function {

//compare search value to card title

//compare search value to card idea

//remove cards that are not matching

//when deleting cards should repopulate
})
