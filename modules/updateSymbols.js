const iexKey = process.env.IEX_KEY;
const request = require('request');
const apiUri = 'https://cloud.iexapis.com/stable/ref-data/symbols?token=' + iexKey;
const mongoose = require('mongoose');
const wocUri = process.env.WOCURI;
const symbols = require('../models/symbols');

exports.updateSymbols = () => {
    return new Promise(async (resolve, reject) => {
        console.log('updateSymbols_backup init()')
        console.log(apiUri)
        request(apiUri, async (err, response, body) => {
            console.log(response.statusCode)
            if (!err && response.statusCode == 200) {
                symbols.deleteMany({}).then((r) => {
                    console.log('deleteMany success')
                    symbols.insertMany(JSON.parse(body)).then(() => {
                        console.log('updateSymbols success')
                        resolve(true);
                    }).catch((err) => {
                        console.error(err)
                        reject(false);
                    });
                }).catch((err)=>{
                    console.log(err)
                    reject(false);
                })
            } else {
                console.log('else')
                console.error(err)
                reject(false);
            }
        })
    })


}