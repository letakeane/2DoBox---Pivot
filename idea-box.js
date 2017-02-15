function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
}

$(document).ready(function () {
console.log("Document Loaded");
for(var i=0;i<localStorage.length;i++)
{
  var obj = localStorage.getItem(localStorage.key(i));
  var parsedobj = JSON.parse(obj);
  var $ideaTitle = parsedobj.title;
  var $ideaContent = parsedobj.body;
  var $id = parsedobj.id;

  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
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
        <p id='quality-line'>quality:  <span id="qual">swill</span></p>
      </div>
     </div>`);
}
});



$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();
  var $id = $.now();
  var newIdea = new Idea($id, $ideaTitle, $ideaContent);
  console.log(newIdea);

  // function stringifyObj (newIdea) {

    var stringifiedIdea = JSON.stringify(newIdea);
    console.log(stringifiedIdea);
    localStorage.setItem($id, stringifiedIdea);
    // var retObj = localStorage.getItem($id);
    // console.log(retObj);
    // var parsedObj = JSON.parse(retObj);
    // console.log(parsedObj);
  // }

  // stringifyObj(newIdea);

  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
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
        <p id='quality-line'>quality:  <span id="qual">swill</span></p>
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
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});



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
