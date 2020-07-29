const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
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

exerciseSchema.virtual("totalDuration").get(() => {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;