import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
  clientId: "My-App",
  brokers: ["192.168.100.239:9092"],
});
