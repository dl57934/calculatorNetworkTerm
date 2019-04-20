import app, { startServer } from "./server";

startServer(3003, "multiple");

app.use("/", (req, res, err) => {
  res.writeHead("200", { "Content-Type": "text/html;utf-8" });
  res.write("sanghoon.com");
  res.end();
});
