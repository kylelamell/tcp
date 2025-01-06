import { createServer } from "net";
import { createConnection } from "net";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;

const intermediary = createServer((client) => {
  console.log("Client Connected");

  const serverSocket = createConnection(serverPort, IP, () => {
    console.log("Connection to server");
  });

  client.on("data", (data) => {
    serverSocket.write(data);
  });

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