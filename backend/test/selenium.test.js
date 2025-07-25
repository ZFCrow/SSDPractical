import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

const environment = process.argv[2] || 'local'; // 'local' or 'docker'
const appURL = environment === 'local' 
  ? 'http://nginx:80'              // Frontend served by Nginx locally
  : 'http://webServer:80';          // Dockerized service name

const seleniumURL = environment === 'local'
  ? 'http://localhost:4444/wd/hub'  // Selenium Grid/Standalone URL
  : 'http://selenium:4444/wd/hub';

describe('Search Input UI Test', function() {
  this.timeout(30000); // 30s timeout
  let driver;

  before(async function() {
    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(seleniumURL)
      .build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should submit a search term and display it on second.html', async function() {
    console.log(`Navigating to the app ${appURL}`);
    await driver.get(appURL);

    // Find the input and submit button
    const inputField = await driver.findElement(By.id('userInput'));
    const submitButton = await driver.findElement(By.id('submitBtn'));

    // Enter a test term
    const searchTerm = 'SeleniumTest';
    await inputField.sendKeys(searchTerm);
    await submitButton.click();

    // Wait for redirect to second.html
    await driver.wait(until.urlContains('second.html'), 10000);

    // Check that the term is displayed on second.html
    const resultElement = await driver.findElement(By.id('result'));
    const displayedText = await resultElement.getText();

    assert.ok(displayedText.includes(searchTerm), `Expected term "${searchTerm}" in: ${displayedText}`);
  });
});
