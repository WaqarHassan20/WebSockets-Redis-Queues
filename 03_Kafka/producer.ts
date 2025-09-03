import { kafkaClient } from "./client";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafkaClient.producer();

  console.log("Producer connecting...");
  await producer.connect();
  console.log("Producer connected Done!");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.trim().split(" ");

    if (!riderName || !location) {
      console.log("Please enter in this format : name location");
      rl.prompt();
      return;
    }

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "Location Update",
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });

    console.log(`Message sent for ${riderName} in ${location}`);
    rl.prompt();
  }).on("close", async () => {
    console.log("Producer disconnecting...");
    await producer.disconnect();
    console.log("Producer disconnected");
  });
}

init().catch(console.error);
