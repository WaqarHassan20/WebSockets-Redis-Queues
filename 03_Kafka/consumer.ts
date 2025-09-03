import { kafkaClient } from "./client";

async function init() {
  const consumer = kafkaClient.consumer({ groupId: "group-1" });

  console.log("Consumer connecting...");
  await consumer.connect();
  console.log("Consumer connected Done!");

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });
  console.log('Consumer subscribed to topic "rider-updates"');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `📩 ${topic} | Partition: ${partition} | Message: ${message.value?.toString()}`
      );
    },
  });
}

init().catch(console.error);
