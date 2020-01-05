/**
 * Created by wwwgift on 2/15/2019.
 */

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }

            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }

            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./soultracker");
const storage = require('node-persist');
function doRegistrations() {
    return __awaiter(this, void 0, void 0, function* ()
    {
        const start = Date.now();
        const COUNTER_KEY = 'redis_counter_key';
        yield storage.init({
            dir: './db',
            encoding: 'utf8',
            forgiveParseErrors: true,
            logging: false,
            parse: JSON.parse,
            stringify: JSON.stringify,
            ttl: false
        });
        const data = yield helper_1.loadData();
        const client = helper_1.getClient();
        yield client.init();
        const restoreProcessed = yield storage.getItem(COUNTER_KEY);
        let processed = restoreProcessed ? +restoreProcessed : 0;
        if (processed > 2) processed = 61  ;
        console.log(processed);
        let skipped = 0;
        for (const dt of data)
        {
            if (skipped < processed) {
                skipped++;
                continue;
            }
            const userInfo = {
                firstname: dt.FIRSTNAME,lastname: dt.LASTNAME,email: dt.EMAIL,gender:dt.GENDER,phone:dt.PHONE,state:dt.STATE,
                city:dt.CITY
            };

            // console.log(userInfo);
            try {

                if (yield helper_1.follow(client, userInfo)) {
                    console.log(`Done Processing ${processed}`)


                    yield storage.setItem(COUNTER_KEY, processed);
                    const timeTaken = (Date.now() - start) / 1000;
                    console.log(`Processed ${processed}, took ${timeTaken} seconds`);
                    processed++;
                  //  yield client.reset();
                    // update as done
                }
            }
            catch (error) {
                // update as failed
                console.error(error);
                console.log('retrying')
                try {
                    if (yield helper_1.follow(client, userInfo)) {
                        console.log(`Done Processing
                        ${processed}
                    `)

                        yield storage.setItem(COUNTER_KEY, processed);
                        const timeTaken = (Date.now() - start) / 1000;
                        console.log(`Processed ${processed}, took ${timeTaken} seconds`);
                        processed++;
                    }
                } catch (error) {
                    console.error(error);
                    yield storage.setItem(COUNTER_KEY, processed);
                    const timeTaken = (Date.now() - start) / 1000;
                    console.log(`Processed ${processed}, took ${timeTaken} seconds`);
                    console.log('resetting and moving to the next data')
                    yield client.reset();
                    processed++;
                }


            }
        }

    });
}
doRegistrations().catch(console.error);

