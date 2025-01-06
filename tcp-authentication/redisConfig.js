import { createClient } from "redis";

let redisClient;

async function createRedisClient() {
  redisClient = createClient({
    socket: {
      host: "127.0.0.1",
      port: 6379
    }
  });

  redisClient.on("error", (err) => {
    console.error("error creating redis client: ", err);
  });

  redisClient.on("connect", () => {
    console.info("connected to redis client");
  });
  await redisClient.connect();
}

await createRedisClient();

export { redisClient }