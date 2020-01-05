'use strict';


var fs = require('fs');
var ks = require('node-key-sender');
ks.setOption('caseCorrection', false);
// use selenium-webdriver
const {Builder, Key, until} = require('selenium-webdriver');
const webDriver = require('selenium-webdriver');
//to load chrome driver
require('chromedriver');
const excelToJson = require('convert-excel-to-json');
let driver = new webDriver.Builder().forBrowser('chrome') .build();
let By = webDriver.By;
(async function (){
    await driver.get('http://higerlife.rf.gd/testserver2.html');
   let txt= await driver.findElement(By.id('ts')).getText();
    //console.log(txt)

   if(parseInt(txt)<1 || txt =="end"){

        console.log("=========================================================")

        await driver.get('http://www.christembassysoultracker.org');
        await driver.findElement(By.id('id_email')).sendKeys('Blessingokwy7@gmail.com');
        await driver.findElement(By.id('id_password')).sendKeys('07065400100')

        await driver.findElement(By.id('id_password')).sendKeys('\uE004')//tabKey
        await driver.findElement(By.id('id_password')).sendKeys('\uE007')//Enter
        let count =0;let selected=true;let element=[]

        for (var z=1400;z<=300000;z=z+20){
            await driver.get("http://www.christembassysoultracker.org/soul/allmysoul/"+z)
            await   driver.findElement(By.css('.toggle')).click()
            let ele=  await  driver.findElements(By.css('.toggle'))
           for(var j=0;j<=ele.length-1;j++){
                try{
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    for(var r=0;r<=3;r++) {
                        if (await driver.switchTo().activeElement().isSelected())
                        {
                           await console.log('SELECTED')
                            await driver.switchTo().activeElement().sendKeys('\uE004');

                        }else if (!(await driver.switchTo().activeElement().isSelected())){
                            await driver.switchTo().activeElement().sendKeys('\ue00d');
                            await driver.wait(until.alertIsPresent(), 7000, 'ALERT COULD NOT BE REMOVED')
                            await driver.switchTo().alert().accept()
                            await driver.switchTo().activeElement().sendKeys('\uE004');
                            break
                        }
                    }
                   // await driver.switchTo().activeElement().sendKeys('\uE004');

                          if(await driver.switchTo().activeElement().isSelected()){
                              console.log('SELECTED')
                              await driver.switchTo().activeElement().sendKeys('\uE004');

                          }else if(!(await driver.switchTo().activeElement().isSelected())){
                              await driver.switchTo().activeElement().sendKeys('\ue00d');
                              await driver.switchTo().activeElement().sendKeys('\uE004');
                          }




                    //6 times=====
                    for(var k=0;k<=5;k++){
                        if (await driver.switchTo().activeElement().isSelected()){
                            await driver.switchTo().activeElement().sendKeys('\uE004');
                        }else if(!(await driver.switchTo().activeElement().isSelected())) {
                            await driver.switchTo().activeElement().sendKeys('\ue00d');

                            await driver.wait(until.alertIsPresent(),7000,'ALERT COULD NOT BE REMOVED')
                            await  driver.switchTo().alert().accept()
                            await driver.switchTo().activeElement().sendKeys('\uE004');
                        }
                        await driver.sleep(2000)
                    }
                   //await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\uE007')

                }
                catch (error){
                    console.log(error)
                }

            }

            //await driver.get('http://www.christembassysoultracker.org/soul/allmysoul/'+z)


        }


        // await console.log(el.length)


    }else{
        console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log(" SERVER ACCESS HAVE BEEN CLOSED")
        console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")

    }
})()
