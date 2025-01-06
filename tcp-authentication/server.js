import { createServer } from "net";
import { redisClient } from "./redisConfig.js";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;

// helper function
function isJSON(data) {
  try {
    JSON.parse(data);
    return true;
  }
  catch (error) {
    return false;
  }
}

const server = createServer((client) => {
  client.on("data", async (data) => {
    
    // check if the user gives invald json
    if (!isJSON(data)) {
      client.end();
      return;
    }

    // check if the user has no token
    const object = JSON.parse(data.toString());
    if (!object.token) {
      client.end();
      return;
    }

    // check if the user has an invalid token
    const res = await redisClient.get(object.token.toString() || object.token);
    if (!res) {
      client.end();
      return;
    }

    // return the correct data to the client
    client.write(object.data.toUpperCase());
  });
});

server.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});