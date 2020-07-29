const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            if (err) {
                console.log(404)
            } else {
                console.log(200)
            };
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            if (err) {
                console.log(404);
            } else {
                console.log(200);
            };
            res.json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.updateOne({ _id: params }, { $push: { exercises: body } })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            if (err) {
                console.log(404);
            } else {
                console.log(200)
            };
            res.json(err)
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then((range) => {
            res.json(range);
        })
        .catch((err) => {
            if (err) {
                console.log(404);
            } else {
                console.log(200);
            }
            res.json(err);
        });
});

module.exports = router;