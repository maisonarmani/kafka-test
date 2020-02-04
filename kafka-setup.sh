curl https://www-eu.apache.org/dist/zookeeper/zookeeper-3.5.6/apache-zookeeper-3.5.6-bin.tar.gz >> apache-zookeeper-3.5.6-bin.tar.gz;
tar -xvf apache-zookeeper-3.5.6-bin.tar.gz;
mkdir /var/lib/zookeeper
mv apache-zookeeper-3.5.6-bin /usr/local/zookeeper;

cat > /usr/local/zookeeper/conf/zoo.cfg <<
EOF
tickTime=2000
dataDir=/var/lib/zookeeper
clientPort=2181
EOF
/usr/local/zookeeper/bin/zkServer.sh start

mkdir /tmp/kafka-logs
curl https://www-eu.apache.org/dist/kafka/2.4.0/kafka_2.11-2.4.0.tgz >> kafka_2.11-2.4.0.tgz;
tar -xvf kafka_2.11-2.4.0;
mv kafka_2.11-2.4.0 /usr/local/kafka;
mkdir /tmp/kafka-logs;
sudo /usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties
