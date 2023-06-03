require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const postRoutes = require('./postRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use("/", postRoutes);

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Connected to DB");
})
.catch(()=>{
    console.log("Cannot be connected to DB");
});

app.listen(process.env.PORT, ()=>{
    console.log("Server connected and running on the port ", process.env.PORT);
});

module.exports = app;