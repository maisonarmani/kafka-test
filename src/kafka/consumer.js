
const kafka = require('kafka-node/types') ;

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});

const consumer =  new kafka.Consumer(client, [{
		topic:'test-topic',offset:4, partition:0
}],{
		fromOffset: true
});

consumer.on('message',function(result){
		console.log(result)
});