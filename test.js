'use strict';
var fs = require('fs');
// use selenium-webdriver
const webDriver = require('selenium-webdriver');
//to load chrome driver
require('chromedriver');
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: 'DATA_FOR_RC.xlsx',
    header:{
        rows: 1
    },
    columnToKey: {
        A: 'FIRSTNAME',
        B: 'LASTNAME',
        C: 'EMAIL',
        D: 'GENDER',
        E: 'PHONE',
        F: 'STATE',
        G: 'CITY'
    }
});


var globaldata=fs.readFileSync('passinfo.txt').toString()
globaldata= JSON.parse(globaldata.trim())
var startdata=fs.readFileSync('startinfo.txt').toString()
startdata= JSON.parse(startdata.trim())
var datastart= parseInt(startdata.datastart)
var dataend= parseInt(startdata.dataend)
if(isNaN(dataend)) dataend =  result.soultrackerdata.length
let By = webDriver.By;

// open chrome browser
let driver = new webDriver.Builder().forBrowser('chrome').build();
(async function () {
   // await driver.get('http://laurenttasgroove.com.ng/testserver2.html');
   // let txt= await driver.findElement(By.id('ts')).getText();
    //console.log(txt)

  //  if(parseInt(txt)>1 || txt =="end") {
        console.log('PROCESS STARTED AT ' + datastart)
        console.log("=========================================================")
        await
        driver.get('http://www.christembassysoultracker.org');
        await
        driver.findElement(By.id('id_email')).sendKeys(globaldata.username);
        await
        driver.findElement(By.id('id_password')).sendKeys(globaldata.password)

        await
        driver.findElement(By.id('id_password')).sendKeys('\uE004')//tabKey
        await
        driver.findElement(By.id('id_password')).sendKeys('\uE007')//Enter
        let count = 0;
        let selected = true
        for (var i = datastart; i <= dataend; i++) {

            try {
                const start = Date.now();
                await
                driver.findElement(By.id('firstname')).sendKeys(result.soultrackerdata[i].FIRSTNAME)
                await
                driver.findElement(By.id('lastname')).sendKeys(result.soultrackerdata[i].LASTNAME)
                await
                driver.findElement(By.id('lastname')).sendKeys('\uE004')
                await
                driver.findElement(By.id('email')).sendKeys('\uE004')
                result.soultrackerdata[i].GENDER == 'female' ? await driver.findElement(By.css("input[value='Female']")).click()
            :
                await
                driver.findElement(By.css("input[value='Male']")).click()
                await
                driver.findElement(By.id('country')).sendKeys('nn')
                await
                driver.findElement(By.id('country')).sendKeys('nn')
                await
                driver.findElement(By.id('country')).sendKeys('nn')
                await
                driver.findElement(By.id('country')).sendKeys('nnnn')
                //await driver.findElement(By.id('country')).sendKeys('\uE004')
                await
                driver.findElement(By.id('state')).sendKeys('Rivers')
                await
                driver.findElement(By.id('city')).sendKeys('Portharcourt')
                driver.sleep(30000)
                // await driver.findElement(By.css($('#phone_no')).getText()
                // var lt=await driver.findElement(By.id('phone_no')).getText()
                //if(lt.indexOf('234')!= -1){

                await
                driver.findElement(By.id('phone_no')).sendKeys('\uE014')
                //await driver.findElement(By.id('phone_no')).sendKeys('\uE014')
                //await button.sendKeys(result.soultrackerdata[i].PHONE)
                await
                driver.findElement(By.id('phone_no')).sendKeys(result.soultrackerdata[i].PHONE)
                await
                driver.findElement(By.id('city')).sendKeys('\uE004')
                await
                driver.findElement(By.id('city')).sendKeys('\uE007')


                //====================]]]]]]]]]]]]]]]MAKING THE DATA TO FOLLOW]]]]]]]]]]]]]]]]]]]]]]]]]]]]]================
                /*  await driver.get('http://www.christembassysoultracker.org/soul/allmysoul');
                 await driver.findElement(By.name('search')).sendKeys(result.soultrackerdata[i].LASTNAME)
                 await driver.findElement(By.name('search')).sendKeys('\uE004')
                 await driver.findElement(By.name('search')).sendKeys('\uE007')
                 // await driver.findElement(By.name('search')).click()
                 await driver.findElement(By.css('.toggle')).click()
                 await  driver.findElement(By.name('cat')).isSelected()?selected=true:driver.findElement(By.name('cat')).click();
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.name('fsc')).isSelected()?ghgjhk : driver.findElement(By.name('fsc')).click()

                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='1']")).isSelected()?selected=true: driver.findElement(By.xpath("//*[@type='checkbox' and @value='1']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='2']")).isSelected()?selected=true: driver.findElement(By.xpath("//*[@type='checkbox' and @value='2']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='3']")).isSelected()?selected=true: driver.findElement(By.xpath("//*[@type='checkbox' and @value='3']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='4']")).isSelected()?selected=true:driver.findElement(By.xpath("//*[@type='checkbox' and @value='4']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='5']")).isSelected()?selected=true: driver.findElement(By.xpath("//*[@type='checkbox' and @value='5']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }
                 await driver.findElement(By.xpath("//*[@type='checkbox' and @value='6']")).isSelected()?selected=true: driver.findElement(By.xpath("//*[@type='checkbox' and @value='6']")).click()
                 while (true)
                 {
                 try
                 {
                 await  driver.switchTo().alert().accept()
                 break
                 }
                 catch ( error)
                 {
                 driver.sleep(1000);
                 }
                 }*/

                const timeTaken = (Date.now() - start) / 10000;
                console.log(`NO
                ${i}
                ${result.soultrackerdata[10].PHONE}
                processed
                sucessfully in ${ timeTaken} sec`)
               // await driver.get('http://www.christembassysoultracker.org/home#');
                // }
            }
            catch (error) {
                console.log("/////////////////////////////////////////////////////////////////////////////")
                console.log('NO ' + i + '  An error occured here ' + result.soultrackerdata[i].PHONE + '   ' + error)
                console.log("/////////////////////////////////////////////////////////////////////////////")

                if (count < 3) {
                    --i
                    ++count
                } else {
                    ++i
                    count = 0
                }
                // await driver.quit();
                await
                driver.get('http://www.christembassysoultracker.org/home#');
            }

        }


   // }else {
       // console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")
       // console.log(" SERVER ACCESS HAVE BEEN CLOSED")
       // console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")

   // }
})();

function boxaccept(driver){

}