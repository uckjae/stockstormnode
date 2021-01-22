const iexKey = process.env.IEX_KEY;
const request = require('request');
const sprintf = require('sprintf-js').vsprintf;
// db 구성에 따라 filter 값 변경
const apiUri = sprintf('https://cloud.iexapis.com/stable/ref-data/symbols?token=%s&filter=symbol,volume' , iexKey);
const wocUri = process.env.WOCURI;
const symbols = require('../models/symbols');

/* 진행중
function compareSymbols(newSymbols){
    let oldSymbols = symbols.find();
    for (let obj in newSymbols){
        symbols.find({symbol: obj.symbol}).then((r) => {
            console.log(r)
        })
    }
}
*/

exports.updateSymbols = () => {
    return new Promise(async (resolve, reject) => {
        console.log('updateSymbols_backup init()')
        request(apiUri, async (err, response, body) => {
            if (!err && response.statusCode == 200) {
                symbols.deleteMany({}).then(() => {
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
                console.error(err)
                reject(false);
            }
        })
    })


}