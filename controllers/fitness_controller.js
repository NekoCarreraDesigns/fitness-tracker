const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Exercise.find({})
        .then((dbExercise) => {
            res.json(dbExercise);
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
    db.Exercise.create(req.body)
        .then((dbExercise) => {
            res.json(dbExercise);
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
    db.Exercise.updateOne({ _id: params }, { $push: { exercises: body } })
        .then((dbExercise) => {
            res.json(dbExercise);
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

router.get("/api/workout/range", (req, res) => {
    db.Exercise.find({})
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