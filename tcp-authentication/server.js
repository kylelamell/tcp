import { createServer } from "net";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;


const server = createServer((client) => {
  console.log("Client Connected");

  client.on("data", (data) => {
    client.write(data.toString().toUpperCase());
  });

  client.on("end", () => {
    console.log("Client Disconnected from server");
  });
});

server.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});