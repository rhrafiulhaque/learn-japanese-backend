const mongoose = require("mongoose");

const vocabularySchema = mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, "Word is required"],
            validate: {
                validator: (value) => value.trim() !== "" && value.trim() === value,
                message: "Word cannot contain leading or trailing spaces or be empty",
            },
        },
        pronunciation: {
            type: String,
            required: [true, "Pronunciation is required"],
            validate: {
                validator: (value) => value.trim() !== "" && value.trim() === value,
                message: "Pronunciation cannot contain leading or trailing spaces or be empty",
            },
        },
        meaning: {
            type: String,
            required: [true, "Meaning is required"],
            validate: {
                validator: (value) => value.trim() !== "" && value.trim() === value,
                message: "Meaning cannot contain leading or trailing spaces or be empty",
            },
        },
        whenToSay: {
            type: String,
            required: [true, "When to Say is required"],
            validate: {
                validator: (value) => value.trim() !== "" && value.trim() === value,
                message: "When to Say cannot contain leading or trailing spaces or be empty",
            },
        },
        lessonNumber: {
            type: Number,
            required: [true, "Lesson Number is required"],
        },
        adminEmail: {
            type: String,
            required: [true, "Admin Email is required"],
            validate: {
                validator: (value) => value.trim() !== "" && value.trim() === value,
                message: "Admin Email cannot contain leading or trailing spaces or be empty",
            },
        },
    },
    {
        timestamps: true,
    }
);


const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
module.exports = Vocabulary;
