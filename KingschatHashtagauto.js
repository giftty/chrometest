'use strict';

const webDriver = require('selenium-webdriver');
const {Builder, Key, until} = require('selenium-webdriver');
//to load chrome driver
require('chromedriver');
var chromeCapabilities= webDriver.Capabilities.chrome()
var chromeOptions={'args':['--test-type','--incognito']}
chromeCapabilities.set('chromeOptions',chromeOptions)
const excelToJson = require('convert-excel-to-json');
var fs = require('fs');
var startdata=fs.readFileSync('startkingschat.txt').toString()
startdata= JSON.parse(startdata.trim())
console.log(startdata)
var datastart = parseInt(startdata.datastart)
var dataend= parseInt(startdata.dataend)
if(isNaN(dataend)) dataend = result.Sheet1.length
const result = excelToJson({
    sourceFile: 'Azure.xlsx',
    header:{
        rows: 1
    },
    columnToKey: {
        C: 'USERNAME',
        D: 'PASSWORD'

    }
});
  //console.log(result)
let By = webDriver.By;
let driver= new webDriver.Builder().withCapabilities(chromeCapabilities).build();
//let driver = new webDriver.Builder().forBrowser('chrome').build();

(async function () {
    var count=0
  for (var i=datastart;i<=dataend;i++) {

       try {

           await driver.get('https://www.kingsch.at/h/');
           await driver.findElement(By.css('.kc-web-link')).click();
           await driver.wait(until.titleIs('Accounts | Login'),25000);
           let inp2 =   await driver.wait(until.elementLocated(By.xpath("//*[@type='text' and @name='login' and @placeholder='Username, Phone Number or E-mail']")), 10000);
             await inp2.sendKeys(result.Sheet1[i].USERNAME,Key.TAB)
           await driver.sleep(3000)
           let inp=   await driver.wait(until.elementLocated(By.xpath("//*[@type='password' and @name='password' and @placeholder='Password']")),  10000);
           await inp.sendKeys(result.Sheet1[i].PASSWORD,Key.ENTER)
         //  await driver.wait(until.titleIs('Accounts | Login'), 3000);

           let inp3 =   await driver.wait(until.elementLocated(By.css('.Navbar__search__input')),15000);

           await inp3.sendKeys('port harcourt', Key.ENTER);
       let inp4=   await driver.wait(until.elementLocated(By.css('.SuperuserCard__follow')),40000);
           await inp4.click()
           driver.sleep(2000)
           await inp4.click()
           driver.sleep(2000)
           await inp4.click()
           driver.sleep(2000)
           await inp4.click()
           driver.sleep(2000)
           try{
               await driver.wait(until.elementLocated(By.css('.SuperuserCard__unfollow')),20000);
           }catch(error) {
               driver.sleep(2000)
               await inp4.click()
               driver.sleep(2000)
               await inp4.click()
               driver.sleep(2000)

           }

           driver.sleep(4000)
          await driver.findElement(By.css('.Navbar__item-description')).click()
           await driver.wait(until.elementLocated(By.css('.Post__author-name')),6000);

           await driver.wait(until.elementLocated(By.css('.pic')), 6000);
           await driver.findElement(By.css('.pic')).click()
           await driver.wait(until.elementLocated(By.css('.icon-logout')), 6000);
           await driver.findElement(By.css('.icon-logout')).click()
           console.log('done /// '+i)
           console.log('==================================')

       }
       catch (error) {
           try{
               let errele=   await driver.wait(until.elementLocated(By.css('.Login__error-message')), 6000)
               let errtext=  await errele.getText()
               if(errtext.indexOf('Wrong Username')!=-1|| errtext.indexOf('confirmed')!=-1){
                   continue
                   console.log(i+' wrong username or user not confirmed')
               }else{
                   ++count
                   console.log(error)
                   console.log('IN/// '+i+'RETRYING')

                   console.log('==================================')
                   if (count>=2){
                       ++i
                       count=0
                   }else{
                       --i
                   }
                   try{
                       await driver.wait(until.elementLocated(By.css('.pic')), 6000);
                       await driver.findElement(By.css('.pic')).click()
                       await driver.wait(until.elementLocated(By.css('.icon-logout')), 6000);
                       await driver.findElement(By.css('.icon-logout')).click()
                   }
                   catch (error){
                       console.log(error)
                   }
               }

           } catch(er){
               console.log(error+'IN  '+ result.Sheet1[i].USERNAME)
               try{
                   await driver.wait(until.elementLocated(By.css('.pic')), 6000);
                   await driver.findElement(By.css('.pic')).click()
                   await driver.wait(until.elementLocated(By.css('.icon-logout')), 6000);
                   await driver.findElement(By.css('.icon-logout')).click()
               }
               catch (error){
                   console.log(error)
               }
           }



       }

        }


  //}

})()
