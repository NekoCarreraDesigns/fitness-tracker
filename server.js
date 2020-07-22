const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

const routes = require("/fitness_controller.js")

app.use(routes)

app.listen(PORT, (err) => {
    console.log("app is listening on:" + PORT);
    if (err) {
        console.log(500)
    } else {
        console.log(200)
    }
});