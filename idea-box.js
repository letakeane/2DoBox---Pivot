function Idea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  console.log(this.quality);
}

function prependCard($id, $ideaTitle, $ideaContent) {
  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
      <div id='line-1'>
        <h2 contenteditable='true'>${$ideaTitle}</h2>
        <button id='delete-button'>
        <img src="images/delete.svg" alt="">
        </button>
      </div>
      <p id='line-2' contenteditable='true'>${$ideaContent}</p>
      <div id='line-3'>
        <button id='upvote-button'>
          <img src="images/upvote.svg" alt="">
        </button>
        <button id='downvote-button'>
        <img src="images/downvote.svg" alt="">
        </button>
        <p id='quality-line'>quality:  <span id="qual">swill</span></p>
      </div>
     </div>`);
}

$(document).ready(function () {
  console.log("Document Loaded");
  for(var i=0;i<localStorage.length;i++) {
      var obj = localStorage.getItem(localStorage.key(i));
      var parsedobj = JSON.parse(obj);
      var $ideaTitle = parsedobj.title;
      var $ideaContent = parsedobj.body;
      var $id = parsedobj.id;
      var $quality = parsedobj.quality;
      prependCard($id, $ideaTitle, $ideaContent, $quality);
  }
});

$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();
  var $id = $.now();
  var $quality = $('#qual').text();
  console.log($quality);
  var newIdea = new Idea($id, $ideaTitle, $ideaContent, $quality);
  var stringifiedIdea = JSON.stringify(newIdea);
  console.log(stringifiedIdea);
  localStorage.setItem($id, stringifiedIdea);

  prependCard($id, $ideaTitle, $ideaContent, $quality);

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

  var $quality = $('#qual').text();
  console.log($quality);
  // var newIdea = new Idea($id, $ideaTitle, $ideaContent, $quality);
  // var stringifiedIdea = JSON.stringify(newIdea);
  // console.log(stringifiedIdea);
  // localStorage.setItem($id, stringifiedIdea);

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
//Search Bar ideas

//on keyup run filtering function
$('#search').on('keyup', function() {
// console.log("works");
//compare search value to card title
var $searchInput = $(this).val();
var $cardTitle = $('.idea-card').find('h2').text();
//compare search value to card idea
console.log($cardTitle);
//remove cards that are not matching

//when deleting cards should repopulate
})
