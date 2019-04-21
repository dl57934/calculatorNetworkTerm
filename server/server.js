import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

export const startServer = (port, message) => {
  http.createServer(app).listen(port, () => {
    console.log(`${message} start`);
  });
};

export default app;
