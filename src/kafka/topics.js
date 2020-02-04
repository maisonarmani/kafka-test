let { KafkaClient } = require('kafka-node');

const client = new KafkaClient({ kafkaHost: process.env.KAFKA_BROKERS });

const topics = [
  {
    topic: 'user_created',
    partitions: 2,
    replicationFactor: 1,
  },
];

const defaultOptions = {
  configEntries: [
    {
      name: 'compression.type',
      value: 'gzip',
    },
    {
      name: 'min.compaction.lag.ms',
      value: '50',
    },
  ],
};

let topicsToCreate = [];
topics.forEach(topic => {
  topicsToCreate.push(Object.assign(topic, defaultOptions));
});

topicsToCreate = topicsToCreate.filter(topic => {
  let topicExist = false;
  client.topicExists([topic.topic], function(error) {
    topicExist = error == null;
  });

  return topicExist;
});

if (topicsToCreate.length > 0) {
  client.createTopics(topicsToCreate, (error, result) => {
    console.log(JSON.stringify(result));
  });
}

module.exports= {
  USER_CREATED: 'user_created',
};
