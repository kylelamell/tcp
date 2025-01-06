import { Socket } from "net";

// setup the ports and such that the servers will be on
const IP = "127.0.0.1";
const intermediaryPort = 3000;
const serverPort = 3001;

const client = new Socket();

async function connectToIntermediary(client) {
  client.connect(intermediaryPort, IP, () => {
    console.log("We have connected to the intermediary server");
    client.write("we balling");
  });
  
  client.on("data", (data) => {
    console.log("Recieved: ", data.toString());
    client.end();
  });
  
  client.on("error", (err) => {
    console.error(err);
  });
}

async function connectToServer(client) {
  client.connect(serverPort, IP, () => {
    console.log("We have connected to the actual server");
    client.write("we balling");
  });
  
  client.on("data", (data) => {
    console.log("Recieved: ", data.toString());
    client.end();
  });
  
  client.on("error", (err) => {
    console.error(err);
  });
}

connectToIntermediary(client);