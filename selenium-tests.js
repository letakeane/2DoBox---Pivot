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
  driver.get('file:///Users/leta/Turing/2DoBox---Pivot/idea-box.html');
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
};
