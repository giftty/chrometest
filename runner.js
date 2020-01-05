const { Builder, By, until,Key } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const request = require("request");
const csv = require('csvtojson');
const storage = require('node-persist');

const COUNTER_KEY = 'redis_counter_key';

(async () => {
  await initCounterDb();
  const restoreProcessed = await storage.getItem(COUNTER_KEY);
  let processed = restoreProcessed ? +restoreProcessed : 0;
  if (processed < 140) processed = 140;
  console.log("starting from", processed + 1);

  const data = await csv().fromFile('./data.csv');

  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--incognito");



  const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();

  let skipped = 0;
  for (const dt of data) {
    if (skipped < processed) {
      skipped++;
      continue;
    }

    const userInfo = {
      name: `${dt.FIRSTNAME} ${dt.LASTNAME}`,
      username: dt.USERNAME,
      password: dt.PASSWORD,
      email: `${dt.USERNAME}@soulnet.xyz`
    };

    const start = Date.now();
    const error = await attemptRegistration(driver, userInfo);

    processed++;
    await storage.setItem(COUNTER_KEY, processed);

    if (!error) {
      const timeTaken = (Date.now() - start) / 1000;
      console.log(`Processed ${processed + 1}, took ${timeTaken} seconds`);
    } else {
      console.log(`Error on ${processed + 1}`);
      console.error(error);
    }
  }
})();

const followUrl = ' http://pastorchrislive.org/followpastorchris/Kingsazee ';
const timeout = 15000;
const maxVerificationRetries = 10;

async function attemptRegistration(driver, userInfo) {
  try {
    await register(driver, userInfo);
  } catch (e) {
    return Promise.resolve(e)
  } finally {
    await driver.manage().deleteAllCookies();
  }
}

async function register(driver, userInfo) {
  await driver.get(followUrl);
  await driver.get('https://www.kingsch.at/h');
  await driver.get('http://web.kingsch.at');
  await driver.get('https://accounts.kingsch.at/');
  await driver.get('https://accounts.kingsch.at/signup/');
  await driver.get('https://accounts.kingsch.at/signup/signup-with-email');

  await driver.findElement(By.css('input[name="email"]')).sendKeys(userInfo.email);
  await driver.findElement(By.css('input[name="name"]')).sendKeys(userInfo.name);
  await driver.findElement(By.css('input[name="username"]')).sendKeys(userInfo.username);
  await driver.findElement(By.css('input[name="password"]')).sendKeys(userInfo.password);

  await driver.findElement(By.css('.submit-btn')).click();
  await driver.wait(until.urlContains('verification-email-sent'), timeout);

  // attempt to get verification link
  let verificationLink;
  for (let tries = 1; tries <= maxVerificationRetries; tries++) {
    verificationLink = await getUrl(userInfo.email);
    if (!!verificationLink) {
      break;
    }
    await sleep(timeout / maxVerificationRetries)
  }

  if (!verificationLink) {
    return;
  }

  await driver.get(verificationLink);
  await driver.get('https://accounts.kingsch.at/');

  await driver.findElement(By.css('input[name="login"]')).sendKeys(userInfo.email);
  await driver.findElement(By.css('input[name="password"]')).sendKeys(userInfo.password);
  await driver.findElement(By.css('.submit-btn')).click();
  console.log("check this point")
  let inp3 =   await driver.wait(until.elementLocated(By.css('.Navbar__search__input')),40000);

  await inp3.sendKeys('pastor chris', Key.ENTER);
  let inp4=   await driver.wait(until.elementLocated(By.css('.SuperuserCard__follow')),40000);
  await inp4.click()
  driver.sleep(4000)
  await inp4.click()
  driver.sleep(4000)
  await inp4.click()
  driver.sleep(4000)
  await inp4.click()
  driver.sleep(4000)
  try{
    await driver.wait(until.elementLocated(By.css('.SuperuserCard__unfollow')),20000);
  }catch(error) {
    driver.sleep(4000)
    await inp4.click()
    driver.sleep(4000)
    await inp4.click()
    driver.sleep(4000)

  }

  driver.sleep(4000)
  await driver.findElement(By.css('.Navbar__item-description')).click()
  await driver.wait(until.elementLocated(By.css('.Post__author-name')),6000);
  driver.sleep(50000)
  await driver.wait(until.elementLocated(By.css('img.nav-profile__avatar')), 6000);
  await driver.findElement(By.css('img.nav-profile__avatar')).click()
  await driver.wait(until.elementLocated(By.css('.icon-logout')), 6000);
  await driver.findElement(By.css('.icon-logout')).click()
  console.log('done ///'+processed + 1)
  console.log('==================================')

}

function getUrl(emailAddress) {
  return new Promise(resolve => {
    request(`http://52.33.140.36:4000/link/${emailAddress}`, (error, response, body) => resolve(body));
  })
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function initCounterDb() {
  await storage.init({
    dir: './db',
    encoding: 'utf8',
    forgiveParseErrors: true,
    logging: false,
    parse: JSON.parse,
    stringify: JSON.stringify,
    ttl: false,
  });
}
//https://www.mailinator.com/v3/#/#inboxpane