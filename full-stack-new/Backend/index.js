import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import fileuPload from 'express-fileupload';


const app = express();
app.use(fileuPload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 100 * 1024 * 1024 } 
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

dotenv.config();

const PORT = process.env.PORT || 4000;

import dbConn from "./Database/data.js";
dbConn();

import cloudinaryConnect from "./Database/cloudinary.js";
cloudinaryConnect();

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});