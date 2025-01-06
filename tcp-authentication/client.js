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
  
  // this is the data the client recieves from the intermediary
  client.on("data", (data) => {
    try {
      console.log("Recieved: ", data.toString());
    }
    catch (error) {
      console.error("error interpreting data: ", error);
    }
    client.end();
  });
  
  client.on("error", (err) => {
    console.error(err);
  });
}

async function connectToServer(client) {
  client.connect(serverPort, IP, () => {
    console.log("We have connected to the actual server");
    const object = {
      "token": 69420,
      "data": "we balling"
    }
    client.write(JSON.stringify(object));
  });
  
  client.on("data", (data) => {
    console.log("Recieved: ", data.toString());
    client.end();
  });
  
  client.on("error", (err) => {
    console.error(err);
  });
}

// try to connect to the intermediary server
try {
  connectToIntermediary(client);
}
catch (error) {
  console.error("error connecting to the server: ", error);
}

// // try to connect to the actual server
// try {
//   connectToServer(client);
// }
// catch (error) {
//   console.error("error connecting to the server: ", error);
// }
