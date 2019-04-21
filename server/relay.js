import app, { startServer } from "./server";
import axios from "axios";
import io from "socket.io";
import cors from "cors";

const BASE_URL = "http://192.168.43.183:";
const MULTIPLE_URL = `${BASE_URL}3003`;
const PLUS_URL = `${BASE_URL}3002`;
const ALL_URL = `${BASE_URL}3004`;

app.use(cors);

startServer(3001, "relay");

const socketServer = io("3008");

socketServer.on("connection", socket => {
  console.log("connect React Client");
  socket.on("request Cal", async req => {
    const { mathExpression, type } = req;
    const receive = await axios(PLUS_URL, {
      method: "GET",
      params: { value: mathExpression }
    });
    socket.emit("cal Result", {
      result: receive.data
    });
    console.log(receive.data);
  });
});
