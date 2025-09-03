import { kafkaClient } from "./client";

async function init() {
  const producer = kafkaClient.producer();

  console.log("Producer connecting...");
  await producer.connect();
  console.log("Producer connected Done!");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        key: "Location Update",
        value: JSON.stringify({
          name: "Will Smith",
          location: "South Asia",
        }),
      },
    ],
  });

  console.log("Message sent successfully!");

  console.log("Producer disconnecting...");
  await producer.disconnect();
  console.log("Producer disconnected");
}

init().catch(console.error);
