import { createServer } from "net";
import { redisClient } from "./redisConfig.js";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;

// helper function to determin if we were passed json
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
  console.log("Client Connected");

  client.on("data", (data) => {

    try {
      const object = JSON.parse(data.toString());
      
      // if there is no token the end
      if (!object.token) {
        client.end();
      }
    }
    catch (error) {
      console.log("error in validating data", error);
      client.end();
    }
  });

  client.on("end", () => {
    console.log("Client Disconnected from server");
  });
});

server.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});