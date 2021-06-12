import express from 'express';
import mongoose from 'mongodb';

import * as userController from "./controllers/user";

// Create Express server
const app = express();

// Connect to MongoDB
try{
mongoose.connect("mongodb+srv://admin:admin@cluster0.4uqs2.mongodb.net/i_p?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

}catch(err){
    console.log(err);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", userController.postSignup);

export default app;