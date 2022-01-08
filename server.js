require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const AWS = require("aws-sdk");
const fileUpload = require("express-fileupload");

connectDB();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-west-2"
});

const app = express();

app.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    abortOnLimit: true,
    responseOnLimit: 'Single file size limit of 2MB reached!'
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {console.log(`Server listening on port: ${PORT}`)});

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})