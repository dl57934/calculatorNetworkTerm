import app, { startServer } from "./server";

startServer(3002, "plus");

app.use("/", (req, res) => {
  const {
    query: { value }
  } = req;
  const plusResult = eval(value);
  console.log(plusResult);
  res.send(`${plusResult}`);
});
