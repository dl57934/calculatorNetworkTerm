import express from "express";
import http from "http";
const app = express();

export const startServer = (port, message) => {
  http.createServer(app).listen(port, () => {
    console.log(`${message} start`);
  });
};

export default app;
