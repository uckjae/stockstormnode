const jsons = JSON.stringify({ x: 5, y: 6 })
const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost:'192.168.124.134:9092'}),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),

    payloads = [{ topic: 'topic2', messages: 'hello' }]

producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});