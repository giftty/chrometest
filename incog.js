'use strict';

const webDriver = require('selenium-webdriver');
//to load chrome driver
require('chromedriver');
var chromeCapabilities= webDriver.Capabilities.chrome()
var chromeOptions={'args':['--test-type','--incognito']}
chromeCapabilities.set('chromeOptions',chromeOptions)

let By = webDriver.By;
(async function () {
    for (let i=0;i<=40;i++){

        try{
            let driver= new webDriver.Builder().withCapabilities(chromeCapabilities).build();
            await driver.get('http://bit.ly/rorluminaries');
            await driver.switchTo().activeElement().sendKeys('\ue00c');
            await driver.switchTo().activeElement().sendKeys('\ue00c');
            await driver.switchTo().activeElement().sendKeys('\ue00c');
            await driver.get('http://www.enterthehealingschool.org');
            // await driver.findElement(By.id('my_video_1_html5_api')).click();
            driver.quit()
            console.log(i)
        }
        catch (error){
            console.log(error)
        }
    }




})()

