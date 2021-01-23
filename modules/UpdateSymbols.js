const iexKey = process.env.IEX_KEY;
const request = require('request');
const sprintf = require('sprintf-js').vsprintf;
// db 구성에 따라 filter 값 변경
const apiUri = sprintf('https://cloud.iexapis.com/stable/ref-data/symbols?token=%s', iexKey);
const wocUri = process.env.WOCURI;
const symbols = require('../models/Symbols');



function compareSymbols(newSymbols) {
    let modifiedSymbols = []
    symbols.find().then((oldSymblos) => {
        for (let oldOne in oldSymblos) {
            let id = oldOne._id;
            let symbolName = oldOne.symbol;


        }
    })
}

exports.updateSymbols = () => {
    return new Promise(async (resolve, reject) => {
        console.log('updateSymbols init()')
        request(apiUri, async (err, response, body) => {
            if (!err && response.statusCode == 200) {
                // symbols.deleteMany({}).then(() => {
                //     console.log('deleteMany success')
                //     symbols.insertMany(JSON.parse(body)).then(() => {
                //         console.log('updateSymbols success')
                //         resolve(true);
                //     }).catch((err) => {
                //         console.error(err)
                //         reject(false);
                //     });
                // }).catch((err)=>{
                //     console.log(err)
                //     reject(false);
                // })




                let modiSymbols = [];
                let newSymbols = [];
                let parsedBody = JSON.parse(body)
                await parsedBody.forEach((item) => {
                    newSymbols.push(item)
                })

                //기존것에 있    새것에 있   조치
                //         o        o   update
                //         o        x   del
                //         x        o   insert
                // symbols.find().then((oldSymblos) => {
                //     for (let oldOne in oldSymblos) {
                //         let modiSymbol = new Object();
                //         let id = oldOne._id;
                //         let symbolName = oldOne.symbol;
                //
                //         let tempI = -1;
                //         // newSymbols.forEach((ele, index) => {
                //         //     if (ele.symbol == symbolName) {
                //         //         tempI = index;
                //         //         throw Break
                //         //     }
                //         //     tempI = -1
                //         // })
                //         for (let i = 0; i<newSymbols.length; i++){
                //             if (newSymbols[i].symbol == symbolName) {
                //                 tempI = i;
                //                 break
                //             }
                //             tempI = -1
                //         }
                //
                //
                //         if (tempI < 0) {// 기존것이 새것에 없음->삭제요망
                //             console.log('삭제요망')
                //         } else { //기존것이 새것에 있음->업데이트요망
                //             console.log('업뎃요망')
                //
                //             let newSymbol = newSymbols[tempI];
                //             modiSymbol._id = id;
                //             modiSymbol.symbol = newSymbol.symbol;
                //             modiSymbol.symbol = newSymbol.symbol;
                //             modiSymbol.exchange = newSymbol.exchange;
                //             modiSymbol.exchangeSuffix = newSymbol.exchangeSuffix;
                //             modiSymbol.exchangeName = newSymbol.exchangeName;
                //             modiSymbol.name = newSymbol.name;
                //             modiSymbol.date = newSymbol.date;
                //             modiSymbol.type = newSymbol.type;
                //             modiSymbol.iexId = newSymbol.iexId;
                //             modiSymbol.region = newSymbol.region;
                //             modiSymbol.currency = newSymbol.currency;
                //             modiSymbol.isEnabled = newSymbol.isEnabled;
                //             modiSymbol.figi = newSymbol.figi;
                //             modiSymbol.cik = newSymbol.cik;
                //             modiSymbol.lei = newSymbol.lei;
                //             modiSymbol.isUpdated = true;
                //
                //             modiSymbols.push(modiSymbol);
                //             newSymbols.splice(tempI,1);
                //         }
                //
                //     }
                // })
                console.log(newSymbols.length)
                // if (newSymbols.length > 0){
                //     console.log('없는거 새로 추가')
                //     newSymbols.forEach((newSymbol,index,array) => {
                //         let modiSymbol = new Object();
                //         modiSymbol.symbol = newSymbol.symbol;
                //         modiSymbol.symbol = newSymbol.symbol;
                //         modiSymbol.exchange = newSymbol.exchange;
                //         modiSymbol.exchangeSuffix = newSymbol.exchangeSuffix;
                //         modiSymbol.exchangeName = newSymbol.exchangeName;
                //         modiSymbol.name = newSymbol.name;
                //         modiSymbol.date = newSymbol.date;
                //         modiSymbol.type = newSymbol.type;
                //         modiSymbol.iexId = newSymbol.iexId;
                //         modiSymbol.region = newSymbol.region;
                //         modiSymbol.currency = newSymbol.currency;
                //         modiSymbol.isEnabled = newSymbol.isEnabled;
                //         modiSymbol.figi = newSymbol.figi;
                //         modiSymbol.cik = newSymbol.cik;
                //         modiSymbol.lei = newSymbol.lei;
                //         modiSymbol.isUpdated = true;
                //
                //         modiSymbols.push(modiSymbol);
                //     })
                // }
                const config = {matchFields: ['symbol']};

                const result = await symbols.upsertMany(newSymbols,config)
                console.log(result.nUpserted + result.nModified, 'items processed');


            } else {
                console.error(err)
                reject(false);
            }
        })
    })


}