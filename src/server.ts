import express from 'express';
import app from "./app";

const port = process.env.SERVER_PORT;

const server = app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

export default server;