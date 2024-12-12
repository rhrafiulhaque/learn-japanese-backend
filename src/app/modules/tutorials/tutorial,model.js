
const mongoose = require("mongoose")

const tutorialSchema = mongoose.Schema(
    {
        tutorialLink: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => value.trim() === value && value.trim().length > 0,
                message: "Lesson name cannot contain leading or trailing spaces or be empty",
            },
        },
        tutorialTitle: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => value.trim() === value && value.trim().length > 0,
                message: "Lesson name cannot contain leading or trailing spaces or be empty",
            },
        }

    },
    {
        timestamps: true,
    }
);

const Tutorial = new mongoose.model("Tutorial", tutorialSchema);
module.exports = Tutorial;


