import { createServer } from "net";
import { createConnection } from "net";
import { redisClient } from "./redisConfig.js";
import { v4 as uuidv4 } from "uuid";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;

const intermediary = createServer(async (client) => {

  // create and set token into cache
  const token = uuidv4();
  await redisClient.set(token, "authenticated", { "EX": "60", "NX" : true });

  // connect to the server
  const serverSocket = createConnection(serverPort, IP);
  
  serverSocket.on("error", () => {
    client.end();
  });

  // when we recieve data from the client
  // create an authenticated object with the token and data to send
  client.on("data", (data) => {
    const authenticatedData = {
      "token": token,
      "data": data.toString()
    }

    serverSocket.write(JSON.stringify(authenticatedData));
  });

  // when we recieve data back from the server
  serverSocket.on("data", (data) => {
    client.write(data);
  });

  client.on("end", () => {
    serverSocket.end();
  });

  serverSocket.on("end", () => {
    client.end();
  });
});

intermediary.listen(intermediaryPort, () => {
  console.log(`Intermediary listening on port ${intermediaryPort}`);
});