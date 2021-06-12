import express from 'express';
import app from "./app";

const server = app.listen(3000, () => {
  return console.log(`server is listening on ${3000}`);
});

export default server;