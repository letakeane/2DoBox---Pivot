$(document).on('pageload', function () {
  for(var i=0;i<localStorage.length;i++) {
    var parsedobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
    displayParsed(parsedobj)
  }
});

function Todo(id, title, body, importance="normal") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.importance = importance;
}

function prependCard($id, $todoTitle, $todoContent, $importance) {
  $('#display-side').prepend(
    `<div class='todo-card' id=${$id}>
      <div class='title-line'>
        <div  id='line-1'>
          <h2 class='titleEdit' contenteditable='true'>${$todoTitle}</h2>
          <button id='delete-button'></button>
        </div>
        <p id='line-2' contenteditable='true'>${$todoContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-button'></button>
        <button id='downvote-button'></button>
        <p id='importance-line'>importance: <span id="qual">${$importance}</span></p>
        <button id='completed-button'></button>
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
  var $todoTitle = storedInput.title;
  var $todoContent = storedInput.body;
  var $id = storedInput.id;
  var $importance = storedInput.importance;
  prependCard($id, $todoTitle, $todoContent, $importance);
}

$('#save-button').on('click', function() {
  var $todoTitle = $('#todo-title').val();
  var $todoContent = $('#todo-content').val();
  var $id = $.now();
  var $importance = 'normal';
  storeNewTodo($id, $todoTitle, $todoContent);
  prependCard($id, $todoTitle, $todoContent, $importance);
  clearInput();
});

function clearInput () {
  $('#todo-title').val('');
  $('#todo-content').val('');
}

function storeNewTodo ($id, $todoTitle, $todoContent) {
  var newTodo = new Todo($id, $todoTitle, $todoContent);
  var stringifiedTodo = JSON.stringify(newTodo);
  localStorage.setItem($id, stringifiedTodo);
}

$('#display-side').on('click', '#upvote-button', function () {
  var $importanceText = $(this).siblings('#importance-line').children();
  if ($importanceText.text() === 'none') {
    $importanceText.text('low');
    storeImportance ($(this), 'low')
  } else if ($importanceText.text() === 'low') {
    $importanceText.text('normal');
    storeImportance ($(this), 'normal')
  } else if ($importanceText.text() === 'normal') {
    $importanceText.text('high');
    storeImportance ($(this), 'high')
  } else if ($importanceText.text() === 'high') {
    $importanceText.text('critical');
    storeImportance ($(this), 'critical')
  }
});

$('#display-side').on('click', '#downvote-button', function () {
  var $importanceText = $(this).siblings('#importance-line').children();
  if ($importanceText.text() === 'critical') {
    $importanceText.text('high');
    storeImportance ($(this), 'high')
  } else if ($importanceText.text() === 'high') {
    $importanceText.text('normal');
    storeImportance ($(this), 'normal')
  } else if ($importanceText.text() === 'normal') {
    $importanceText.text('low');
    storeImportance ($(this), 'low')
  } else if ($importanceText.text() === 'low') {
    $importanceText.text('none');
    storeImportance ($(this), 'none')
  }
});

function storeImportance (presentCard, newImportance) {
  var $idValue = $(presentCard).closest('.todo-card').attr('id');
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.importance = newImportance;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

//Zane - started working on the feature that lets users mark tasks as completed
// $('#display-side').on('click', '#completed-button', function () {
//   $(this).parents('.todo-card').toggleClass('completed');
//
//   if ($(this).siblings('#upvote-button', '#downvote-button').prop('enabled')) {
//     $(this).siblings('#upvote-button', '#downvote-button').prop('disabled');
//   } else if ($(this).siblings('#upvote-button', '#downvote-button').toggleClas('disabled')) {
//     $(this).siblings('#upvote-button', '#downvote-button').prop('enabled');
//   };
//
//   if ($(this).parents('.todo-card').children('#delete-button').prop('enabled')) {
//     $(this).parents('.todo-card').children('#delete-button').prop('disabled');
//   } else if ($(this).parents('.todo-card').children('#delete-button').prop('disabled')) {
//     $(this).parents('.todo-card').children('#delete-button').prop('enabled');
//   };
//
//   $('#completed-button').toggleClass('active');
// if ($(this).parents('.todo-card').hasClass('completed')) {
//   storeCompleted ($(this), 'true')
// } else {
//   storeCompleted ($(this), 'false')
// }
// });

// function storeCompleted (presentCard, newCompleted) {
//   var $idValue = $(presentCard).closest('.todo-card').attr('id');
//   var parselsitem = JSON.parse(localStorage.getItem($idValue));
//   parselsitem.completed = newCompleted;
//   localStorage.setItem($idValue, JSON.stringify(parselsitem));
// }

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.todo-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});

$('#display-side').on('blur', '.titleEdit', function () {
  var $todoTitle = $(this).text();
  var $idValue = $(this).closest('.todo-card').attr('id');
  storeTitle($idValue, $todoTitle);
});

function storeTitle ($idValue, $todoTitle) {
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.title = $todoTitle;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

$('#display-side').on('blur', '#line-2', function () {
  var $todoBody = $(this).text();
  var $idValue = $(this).closest('.todo-card').attr('id');
  storeBody($idValue, $todoBody);
});

function storeBody ($idValue, $todoBody) {
  var parselsitem = JSON.parse(localStorage.getItem($idValue));
  parselsitem.body = $todoBody;
  localStorage.setItem($idValue, JSON.stringify(parselsitem));
}

$('#filter').on('keyup', function() {
    var filterInput = $(this).val().toLowerCase();
    $('.title-line').each(function() {
      var filterText = $(this).text().toLowerCase();
      if (!!filterText.match(filterInput)) {
        $(this).closest('.todo-card').toggle(true);
      }else {
        $(this).closest('.todo-card').toggle(false);
      }
    });
});

$('#todo-title, #todo-content').on('keyup', function () {
  var $todoTitle = $('#todo-title');
  var $todoContent = $('#todo-content');
  if ($todoTitle.val() !== "" && $todoContent.val() !== ""){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
})
