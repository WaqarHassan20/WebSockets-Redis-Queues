import { kafkaClient } from "./client";
const group = process.argv[2] || "group-1";

async function init() {
  const consumer = kafkaClient.consumer({ groupId: group });

  console.log(`Consumer [${group}] connecting...`);
  await consumer.connect();
  console.log(`Consumer [${group}] connected`);

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });
  console.log(`Consumer [${group}] subscribed to "rider-updates"`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `[${group}] ${topic} | PART:${partition} |`,
        message.value?.toString()
      );
    },
  });
}

init().catch(console.error);
