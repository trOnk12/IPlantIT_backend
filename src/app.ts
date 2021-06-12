import express from 'express';

import * as userController from "./controllers/user";

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", userController.postSignup);

export default app;