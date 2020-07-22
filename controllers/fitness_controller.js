const express = require("express");
const db = require("../models")

const app = express();

app.get("/", (req, res) => {
    db.workout.find({}, (req, data) => {
        res.json(data)
    })
})