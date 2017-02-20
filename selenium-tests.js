var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

Test(driver_chr);
// Test(driver_fx);
// Test(driver_saf);

function Test(driver) {
  driver.get('file:///Users/zanerussell/turing/todobox/idea-box/idea-box.html');
  driver.getTitle().then(function(title) {
    if (title === 'idea-box') {
      console.log('Page load: test passed');
    } else {
      console.log('Page load: test failed');
    }
  })

  var disabled = driver.findElement(By.id('save-button')).getAttribute(disabled);

  driver.sleep(2000).then(function () {
    driver.findElement(By.id('save-button')).getAttribute(disabled);
    console.log('Save button disabled: ' + disabled);
  });

  driver.findElement(By.id('idea-title')).sendKeys('Idea title 1');
  driver.findElement(By.id('idea-content')).sendKeys('Idea content 1');

  driver.sleep(2000).then(function () {
    driver.findElement(By.id('save-button')).getAttribute(disabled);
    console.log('Save button disabled: ' + disabled);
  });

  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(text) {
      if (text === 'Idea title 1') {
        console.log('Idea card added: test passed');
      } else {
        console.log('Idea card added: test failed');
      }
    });
  });

  driver.navigate().refresh();
  driver.sleep(2000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(text) {
      if (text === 'Idea title 1') {
        console.log('Idea card persists: test passed');
      } else {
        console.log('Idea card persists: test failed');
      }
    });
  });

  var qualityTest = driver.findElement(By.id('qual')).getText();
  var upvote = driver.findElement(By.id('upvote-button'));

  driver.sleep(1000).then(function(){
    upvote.click();
  });

  driver.navigate().refresh();
  driver.sleep(4000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality){
    if( quality === 'plausible'){
      console.log('Upvote button works')
    } else {
      console.log('Upvote button fails')
    }
    });
  });

  var downvote = driver.findElement(By.id('downvote-button'));

  driver.sleep(1000).then(function(){
    downvote.click();
  });

  driver.navigate().refresh();
  driver.sleep(4000).then(function() {
    driver.findElement(By.id('qual')).getText().then(function(quality){
    if( quality === 'swill'){
      console.log('Downvote button works')
    } else {
      console.log('Downvote button fails')
    }
    });
  });

  driver.findElement(By.id('idea-title')).sendKeys('Idea title 2');
  driver.findElement(By.id('idea-content')).sendKeys('Idea content 2');

  driver.sleep(2000).then(function () {
    driver.findElement(By.id('save-button')).getAttribute(disabled);
    console.log('Save button disabled: ' + disabled);
  });

  driver.findElement(By.id('save-button')).click();

  driver.sleep(1000).then(function() {
    driver.findElement(By.id('delete-button')).then(function(deleteButton){
      console.log(deleteButton.length)
      deleteButton.click();
    });
  });

  driver.findElement(By.className('titleEdit')).getText().then(function(text) {
    if (text === 'Idea title 1') {
      console.log('Delete button test passed');
    } else {
      console.log('Delete button test failed');
    }
  });

};
