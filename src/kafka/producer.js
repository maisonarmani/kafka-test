
const kafka = require('kafka-node/types') ;

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});


let producer = new kafka.Producer(client,{
		// Configuration for when to consider a message as acknowledged, default 1
		requireAcks: 1,
		// The amount of time in milliseconds to wait for all acks before considered, default 100ms
		ackTimeoutMs: 100,
		// Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
		partitionerType: 0
});

producer.on('ready',function(){
		let payload = {
				topic: 'test-topic',
				messages: "No message from the owner", // multi messages should be a array, single message can be just a string or a KeyedMessage instance
				//key: 'message 1', // string or buffer, only needed when using keyed partitioner
				partition: 0, // default 0
				attributes: 2, // default: 0
				timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
		};


		setInterval(function(){
					producer.send([{...payload,messages: `Message from node producer at ${Date.now()}`}], function(error, result){
							console.log(result,error)
					})
		},3000);
});
