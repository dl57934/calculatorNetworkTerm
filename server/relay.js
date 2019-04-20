import app, { startServer } from "./server";
import axios from "axios";

const BASE_URL = "http://172.30.11.168:";
const MULTIPLE_URL = `${BASE_URL}3003`;
const PLUS_URL = `${BASE_URL}3002`;

startServer(3001, "relay");

app.use("/", async (req, res, err) => {
  const receive = await axios(PLUS_URL, {
    method: "GET",
    params: { value: req.query.value }
  });

  console.log(receive.data);
  res.send(`${receive.data}`);
});
