function Idea(id, title, body, quality="none") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependCard($id, $ideaTitle, $ideaContent, $quality) {
  $('#display-side').prepend(
    `<div class='idea-card' id=${$id}>
      <div class='title-line'>
        <div  id='line-1'>
          <h2 class='titleEdit' contenteditable='true'>${$ideaTitle}</h2>
          <button id='delete-button'></button>
        </div>
        <p id='line-2' contenteditable='true'>${$ideaContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-button'></button>
        <button id='downvote-button'></button>
        <p id='quality-line'>quality: <span id="qual">${$quality}</span></p>
      </div>
     </div>`);
}

$(document).ready(function () {
  for(var i=0;i<localStorage.length;i++) {
    var parsedobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
    displayParsed(parsedobj)
  }
});

function displayParsed (storedInput) {
  var $ideaTitle = storedInput.title;
  var $ideaContent = storedInput.body;
  var $id = storedInput.id;
  var $quality = storedInput.quality;
  prependCard($id, $ideaTitle, $ideaContent, $quality);
}

$('#save-button').on('click', function() {
  var $ideaTitle = $('#idea-title').val();
  var $ideaContent = $('#idea-content').val();
  var $id = $.now();
  var $quality = 'none';
  storeNewIdea($id, $ideaTitle, $ideaContent);
  prependCard($id, $ideaTitle, $ideaContent, $quality);
  clearInput();
});

function clearInput () {
  $('#idea-title').val('');
  $('#idea-content').val('');
}

function storeNewIdea ($id, $ideaTitle, $ideaContent) {
  var newIdea = new Idea($id, $ideaTitle, $ideaContent);
  var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem($id, stringifiedIdea);
}

$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'none') {
    $qualityText.text('low');
    storeQuality ($(this), 'low')
  } else if ($qualityText.text() === 'low') {
    $qualityText.text('normal');
    storeQuality ($(this), 'normal')
  } else if ($qualityText.text() === 'normal') {
    $qualityText.text('high');
    storeQuality ($(this), 'high')
  } else if ($qualityText.text() === 'high') {
    $qualityText.text('critical');
    storeQuality ($(this), 'critical')
  }
});

$('#display-side').on('click', '#downvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'critical') {
    $qualityText.text('high');
    storeQuality ($(this), 'high')
  } else if ($qualityText.text() === 'high') {
    $qualityText.text('normal');
    storeQuality ($(this), 'normal')
  } else if ($qualityText.text() === 'normal') {
    $qualityText.text('low');
    storeQuality ($(this), 'low')
  } else if ($qualityText.text() === 'low') {
    $qualityText.text('none');
    storeQuality ($(this), 'none')
  }
});

function storeQuality (presentCard, newQuality) {
  var $idValue = $(presentCard).closest('.idea-card').attr('id');
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.quality = newQuality;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.idea-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});

$('#display-side').on('blur', '.titleEdit', function () {
  var $ideaTitle = $(this).text();
  var $idValue = $(this).closest('.idea-card').attr('id');
  storeTitle($idValue, $ideaTitle);
});

function storeTitle ($idValue, $ideaTitle) {
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.title = $ideaTitle;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

$('#display-side').on('blur', '#line-2', function () {
  var $ideaBody = $(this).text();
  var $idValue = $(this).closest('.idea-card').attr('id');
  storeBody($idValue, $ideaBody);
});

function storeBody ($idValue, $ideaBody) {
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.body = $ideaBody;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

$('#search').on('keyup', function() {
    var searchInput = $(this).val().toLowerCase();
    $('.title-line').each(function() {
      var searchText = $(this).text().toLowerCase();
      if (!!searchText.match(searchInput)) {
        $(this).closest('.idea-card').toggle(true);
      }else {
        $(this).closest('.idea-card').toggle(false);
      }
    });
});

$('#idea-title, #idea-content').on('keyup', function () {
  var $ideaTitle = $('#idea-title');
  var $ideaContent = $('#idea-content');
  if ($ideaTitle.val() !== "" && $ideaContent.val() !== ""){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
})
