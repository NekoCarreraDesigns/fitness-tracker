const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
//const db = require("./models")
const app = express();

const PORT = process.env.PORT || 3000

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout"
const options =
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, options);

app.use(require("./controllers/fitness_controller.js"));
app.use(require("./controllers/web_controller.js"));

app.listen(PORT, (err) => {
    console.log("App is listening on:" + PORT);
    if (err) {
        console.log(500);
    } else {
        console.log(200);
    }
});