'use strict';
//const {Builder, By, Key, until} = require('selenium-webdriver');
var fs = require('fs');
const webDriver = require('selenium-webdriver');
//to load chrome driver
require('chromedriver');
const excelToJson = require('convert-excel-to-json');
let driver = new webDriver.Builder().forBrowser('chrome') .build();
let By = webDriver.By;
async function altst (va,ele){
   await  ele.sendKeys('\uE004');
    await ele.sendKeys('\ue00d');
    while (va)
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
}
(async function (){
    await driver.get('http://laurenttasgroove.com.ng/testserver2.html');
    let txt= await driver.findElement(By.id('ts')).getText();
    //console.log(txt)

    if(parseInt(txt)>1 || txt =="end"){

        console.log("=========================================================")

        await driver.get('http://www.christembassysoultracker.org');
        await driver.findElement(By.id('id_email')).sendKeys('chris.ikechi@yahoo.com');
        await driver.findElement(By.id('id_password')).sendKeys('chemistry')

        await driver.findElement(By.id('id_password')).sendKeys('\uE004')//tabKey
        await driver.findElement(By.id('id_password')).sendKeys('\uE007')//Enter
        let count =0;let selected=true;let element=[]

        for (var z=300;z<=300000;z+=100){
            await driver.get("http://www.christembassysoultracker.org/soul/allmysoul/"+z)
            await   driver.findElement(By.css('.toggle')).click()
            let ele=  await  driver.findElements(By.css('.toggle'))
            for(var j=1;j<=ele.length-5;j++){
                try{
                    await driver. driver.switchTo().activeElement().isSelected()?null:altst(true,driver.switchTo().activeElement());

                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');


                    //1 times=====
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    //2 times=============
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    //3 times=====================
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    //4 times======================
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    //5 times ===========================
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    //6 times===========================
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\ue00d');

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
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\uE004');
                    await driver.switchTo().activeElement().sendKeys('\uE007')//Enter
                    driver.sleep(30000);
                }
                catch (error){
                    console.log(error)
                }

            }

            // await driver.get('http://www.christembassysoultracker.org/soul/allmysoul/'+z)


        }


        // await console.log(el.length


    }else{
        console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log(" SERVER ACCESS HAVE BEEN CLOSED")
        console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////")

    }
})()