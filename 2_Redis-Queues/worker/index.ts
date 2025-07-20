import { createClient } from "redis";
const client = createClient();

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
              const submission = await client.brPop("submissions", 0);
              console.log(submission);
              // actaully run the submissions and process them
              await new Promise((resolve) => setTimeout(resolve, 1000));
              // send the processed submissions to the pubsubs
              console.log("Processed User Submissions");
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();