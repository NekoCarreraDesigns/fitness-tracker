const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((dbWorkout) => {
            console.log("heres your workout", dbWorkout)
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/api/workouts/", (req, res) => {
    db.Workout.create(req.body)
        .then((dbWorkout) => {
            console.log("created new workout", dbWorkout)
            res.json(dbWorkout);
        }).then(function (_id) {
            console.log(_id)
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", function ({ body, params }, res) {
    db.Workout.findByIdAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true, runValidators: true })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err)
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then((range) => {
            res.json(range);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;