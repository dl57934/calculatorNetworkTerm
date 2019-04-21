import app, { startServer } from "./server";

startServer(3003, "multiple");

app.use("/", (req, res, err) => {
  const {
    query: { value }
  } = req;
  console.log(value);
  const plusResult = eval(value);
  console.log(plusResult);
  // res.send(`${plusResult}`);
});
