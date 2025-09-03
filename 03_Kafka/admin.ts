import {kafkaClient} from "./client"

async function init() {
  const admin = kafkaClient.admin();

  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin connected Done!");

  console.log("Checking and creating topics...");

  const existingTopics = await admin.listTopics();

  const topicName = "rider-updates";

  if (existingTopics.includes(topicName)) {
    console.log(`Topic "${topicName}" already exists. Skipping creation.`);
  } else {
    console.log(`Creating topic "${topicName}"...`);
    await admin.createTopics({
      topics: [
        {
          topic: topicName,
          numPartitions: 2,
          replicationFactor: 1,
        },
      ],
    });

    console.log(`Topic "${topicName}" created successfully!`);
  }

  console.log("Admin disconnecting...");
  await admin.disconnect();
  console.log("Admin disconnected");
}

init().catch(console.error);
