const iexKey = process.env.IEX_KEY;
const request = require('request');
const sprintf = require('sprintf-js').vsprintf;
// db 구성에 따라 filter 값 변경
const apiUri = sprintf('https://cloud.iexapis.com/stable/ref-data/symbols?token=%s', iexKey);
const wocUri = process.env.WOCURI;
const symbols = require('../models/Symbols');
const symbolRefCount = require('../models/SymbolRefCount');

function symbolRefUpsert(){
    console.log('symbolRefCount');
    symbols.find({}).select('-_id symbol').then(async (symbolList)=>{
        // console.log(symbolList)
        let symbolRefList = [];
        // console.log(symbolList)
        for (let i = 0; i < symbolList.length; i++){
            let symbolRef = {'symbol' : symbolList[i].symbol}
            symbolRefList.push(symbolRef)
        }

        const config = {matchFields: ['symbol']}

        const result = await symbolRefCount.upsertMany(symbolRefList,config);
        console.log(result.nUpserted + result.nModified, 'items processed');

    })
}



exports.updateSymbols = () => {
    return new Promise(async (resolve, reject) => {
        console.log('updateSymbols init()')
        request(apiUri, async (err, response, body) => {
            if (!err && response.statusCode == 200) {
                symbols.deleteMany({}).then(() => {
                    console.log('deleteMany success')
                    symbols.insertMany(JSON.parse(body)).then(() => {
                        console.log('updateSymbols success');
                        resolve(true);
                        symbolRefUpsert();
                    }).catch((err) => {
                        console.error(err)
                        reject(false);
                    });
                }).catch((err) => {
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