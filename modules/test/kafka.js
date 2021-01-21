const kafka = require('kafka-node')
const Offset = kafka.Offset
const Consumer = kafka.Consumer
const Client = kafka.KafkaClient
const topic = 'hi-test'

const client = new kafka.KafkaClient({kafkaHost:'192.168.124.134:9092'});
const topics = [{topic: 'topic2', partition:0}]
const options = {autoConnect: true, autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024*1024}

const consumer = new Consumer(client,topics,options)
const offset = new Offset(client)

// const runConsumer = async () => {
//     // 3.Connecting consumer to kafka broker.
//     await consumer.connect()
//     // 4.Subscribing to a topic in order to receive messages/data.
//     await consumer.subscribe({ topic: 'hi-topic', fromBeginning: true })
//     // 5. Sending an action to be handled for each message RECEIVED.
//     await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//
//         console.log({ "Doing something with the message": topic, partition, message });
//     },
// })
// }
//
// runConsumer();


// consumer.connect();
// consumer.subscribe({topic: topic, fromBeginning: true})

// consumer.run({
//     eachMessage: async ({topic,partition, message}) => {
//         console.log(message)
//     }
// })


consumer.on('message', function (message){
    console.log(message)
})

consumer.on('error',function (error){
    console.log(error)
})

