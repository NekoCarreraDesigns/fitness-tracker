const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });

app.get("/exercise", (req, res) => {
    db.workout.find({}, (req, data) => {
        res.json(data)
    })
})