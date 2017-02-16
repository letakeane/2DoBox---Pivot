function Idea(id, title, body, quality="swill") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependCard($id, $ideaTitle, $ideaContent, $quality) {
  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
      <div id='line-1'>
        <h2 class='titleEdit' contenteditable='true'>${$ideaTitle}</h2>
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
        <p id='quality-line'>quality:  <span id="qual">${$quality}</span></p>
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

// $('h2').on('blur', function() {
//   var $ideaTitle = $('h2').val();
  // console.log("$ideaTitle after blur" + $ideaTitle);
// });
// $('#idea-title').focusout(function () {
//   console.log("Hey Hey Blur");
// });
// $('h2').change(function () {
//   console.log("Hey Hey Blur");
// });
// $( "document" ).click(function() {
//   $( "h2" ).blur();
//   var $ideaTitle = $('h2').val();
//   console.log("$ideaTitle after blur" + $ideaTitle);
// });
// $('h2').on('blur', '[contenteditable]', function() {
//   console.log("Yo Blur");
// });



$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();
  var $id = $.now();
  var $quality = 'swill';
  // console.log($quality);
  var newIdea = new Idea($id, $ideaTitle, $ideaContent);
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

  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  console.log(idValue + " " + $whatIsGrabbed);
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  console.log(parselsitem);

  var $quality = $qualityText.text();
  console.log($quality);

  parselsitem.quality = $quality;
  console.log(parselsitem);
  var stringedit = JSON.stringify(parselsitem);
  console.log(stringedit)
  localStorage.setItem(idValue, stringedit);



  // var $quality = $('#qual').text();
  // console.log($quality);



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

  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  console.log(idValue + " " + $whatIsGrabbed);
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  console.log(parselsitem);

  var $quality = $qualityText.text();
  console.log($quality);

  parselsitem.quality = $quality;
  console.log(parselsitem);
  var stringedit = JSON.stringify(parselsitem);
  console.log(stringedit)
  localStorage.setItem(idValue, stringedit);

});

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.idea-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});






$('#display-side').on('blur', '.titleEdit', function () {

  var $ideaTitle = $(this).text();
  console.log($ideaTitle);

  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  console.log(idValue + " " + $whatIsGrabbed);
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  console.log(parselsitem);

  // var $title = $qualityText.text();
  // console.log($quality);

  parselsitem.title = $ideaTitle;
  console.log(parselsitem);
  var stringedit = JSON.stringify(parselsitem);
  console.log(stringedit)
  localStorage.setItem(idValue, stringedit);

});

$('#display-side').on('blur', '#line-2', function () {

  var $ideaContent = $(this).text();
  console.log($ideaContent);

  var $whatIsGrabbed = $(this).closest('.idea-card');
  var idValue = $whatIsGrabbed.attr('id');
  console.log(idValue + " " + $whatIsGrabbed);
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  console.log(parselsitem);

  // var $title = $qualityText.text();
  // console.log($quality);

  parselsitem.body = $ideaContent;
  console.log(parselsitem);
  var stringedit = JSON.stringify(parselsitem);
  console.log(stringedit)
  localStorage.setItem(idValue, stringedit);

});


$('#search').on('keyup', function() {
    var searchInput = $(this).val();
  for(var i=0;i<localStorage.length;i++) {
      var obj = localStorage.getItem(localStorage.key(i));
      var parsedobj = JSON.parse(obj);
      var string = parsedobj.title;
      var id = parsedobj.id;
      // console.log(string);

      if (string.includes(searchInput)) {

        console.log('match');
      }
      else {
        $('.idea-card').toggle();
        console.log("no match");
      }

      if (searchInput == "") {
        $('.idea-card').toggle();
      }


    }
});
// // console.log("works");
// //compare search value to card title
// var $searchInput = $(this).val();
// var $cardTitle = $('.idea-card').find('h2');
// //compare search value to card idea
//
// var $cardMatch = $cardTitle.match($searchInput);
//
//
// if ($cardMatch == null) {
//   console.log(($cardTitle).parent());
//   // $('.cardTitle').toggle();
//   ($cardTitle).closest('.idea-card').toggle($cardMatch);
// }
// //
// // //want to Toggle actual bookmark when we do not get a match
// // //remove cards that are not matching
// //
// // //when deleting cards should repopulate
// // })
//
// //global variables
// // var $ideaTitle = $('idea-title');
// // var $ideaContent = $('idea-title');
// // //Deleting an idea card
// // $('#display-side').on('click', '#delete-button', function() {
// //   $(this).parent('.idea-card').remove();
// // })
// //
// //
// //Search Bar ideas
//
// //on keyup run filtering function
// $('#search').on('keyup', function() {
// // console.log("works");
// //compare search value to card title
// var $searchInput = $(this).val();
// var $cardTitle = $('.idea-card').find('h2').text();
// //compare search value to card idea
// console.log($cardTitle);
// //remove cards that are not matching
//
// //when deleting cards should repopulate
// })
