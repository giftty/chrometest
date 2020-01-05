/**
 * Created by wwwgift on 2/15/2019.
 */

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
const wdio = require('webdriverio');
const path = require('path');
const csv = require('csvtojson');
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        return csv().fromFile('../data/soultrackerdata.csv');
    });
}
exports.loadData = loadData;
function getClient() {
    const webDriver = require('selenium-webdriver');
//to load chrome driver
    require('chromedriver');

    let By = webDriver.By;

// open chrome browser
    let driver = new webDriver.Builder().forBrowser('chrome').build();
}

exports.getClient = getClient;
const MAX_WAIT_TIME = 70000;

async function openchrome(client){
    return client
    await  .get('http://www.christembassysoultracker.org');
    await  .findElement(By.id('id_email')).sendKeys('chris.ikechi@yahoo.com');
    await  .findElement(By.id('id_password')).sendKeys('chemistry')
    await  .findElement(By.id('id_password')).sendKeys('\uE004')
    await  .findElement(By.id('id_password')).sendKeys("Enter")
}
async function follow(client,dt){
    return __awaiter(this, void 0, void 0, function* ()
    {
        if(dt.gender=='female'){
          var gd
              gd='  Female'
        }else gd='Male   Female'
        return client


    });


}
//exports.register = register;
exports.follow = follow;
function element(id) {
   return 'android=new UiSelector().resourceId("' + id + '")';
}
function elementtext(text) {
    var selector = 'new UiSelector().text("'+ text +'").className("android.widget.Button")';
    return 'android=' + selector;

}

function elementtext2(text) {
    var selector = 'new UiSelector().text("'+ text +'")';
    return 'android=' + selector;

}