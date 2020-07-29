const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },

        exercises: [
            {
                type: String,
                required: "Enter an exercise",
                trim: true,
            },
            {
                name: {
                    type: String,
                    required: "Enter an exercise",
                    trim: true,

                },
                duration: {
                    type: Number,
                    required: "Enter a time period"
                },
                weight: Number,
                reps: Number,
                sets: Number,
                poses: Number,
                distance: Number,

            },

        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

workoutSchema.virtual("totalDuration").get(() => {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;