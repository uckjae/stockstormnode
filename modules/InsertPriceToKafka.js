const kafka = require('kafka-node');
const iexKey = process.env.IEX_KEY;
const KafkaUrl = process.env.KAFKA_URL;
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: KafkaUrl});
const producer = new Producer(client);

const request = require('request');
const sprintf = require('sprintf-js').vsprintf;


exports.insertPriceToKafka =  (symbol) => {
    console.log('InsertPriceToKafka()');
    const apiUri = sprintf('https://cloud.iexapis.com/stable/stock/%s/quote?token=%s' , [symbol, iexKey]);
    request(apiUri, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            let parsedBody = JSON.parse(body);
            let latestPrice = parseFloat(parsedBody.latestPrice);
            let nowDate = new Date();
            let stringDate = sprintf("%s-%s-%s",[nowDate.getUTCFullYear(),nowDate.getUTCMonth()+1,nowDate.getUTCDate()]);
            let latestTime = parsedBody.latestTime;
            // console.log(producer)

            if (producer.ready){
                const topic = symbol.toString()
                let payloads = [{ topic: topic, messages: {price:latestPrice, date:stringDate, time:latestTime } }]
                console.log(payloads)
                producer.send(payloads, (err, res) => {
                    // console.log(payloads)
                    // console.log(err)
                    // console.log(res)
                });
            }else {

            }



        } else {
            console.log('else')
            console.error(err)
        }

    })
}