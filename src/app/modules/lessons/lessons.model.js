
const mongoose = require("mongoose")

const lessonSchema = mongoose.Schema(
    {
        lessonName: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => value.trim() === value && value.trim().length > 0,
                message: "Lesson name cannot contain leading or trailing spaces or be empty",
            },
        },
        lessonNumber: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Lesson = new mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;


