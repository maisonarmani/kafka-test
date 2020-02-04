let { KafkaClient, HighLevelProducer } = require('kafka-node');
const client = new KafkaClient({ kafkaHost: process.env.KAFKA_BROKERS });

let producer = new HighLevelProducer(client, {
  requireAcks: 1,
  ackTimeoutMs: 100,
  partitionerType: 0,
});

producer.on('ready', function() {
  console.log('Kafka Producer is ready for use');
});

producer.on('error', function(result) {
  console.log(result);
});

let payload = {
  partition: 0,
  attributes: 2,
  timestamp: Date.now(),
};

const publish = function(topic, message, callback) {
  producer.send([{ ...payload, message, topic }], callback);
};

module.exports ={ publish };
