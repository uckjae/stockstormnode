const kafkaUrl = process.env.KAFKA_URL;
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost:kafkaUrl});
const producer = new Producer(client);

exports.writeToKafka = function (topicName, body){
    console.log(topicName +'/' + body)
    let payloads = [{topic: topicName, message: body}];
    producer.on('ready', function (){
        producer.send(payloads, function (error, data){
            console.log(data)
        });
    })
}