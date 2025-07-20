import express, { json } from "express";
import { createClient } from "redis";

const app = express();
app.use(json());

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;

  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );
    res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to store submission.");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
}

startServer();
