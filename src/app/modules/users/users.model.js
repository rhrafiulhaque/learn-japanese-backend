const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const config = require("../../config");
const AppError = require("../../../utils/AppError");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.trim() === value && value.trim().length > 0,
        message: "Name cannot contain leading or trailing spaces or be empty",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value) => value.trim() === value && value.trim().length > 0,
        message: "Email cannot contain leading or trailing spaces or be empty",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) => value.trim().length > 0,
        message: "Password cannot be empty or whitespace",
      },
    },
    profilePhoto: {
      type: String,
      required: [true, "Profile Photo is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "user"],
      default: "user"
    },
    refreshToken: {
      type: String,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrpt_salt_rounds)
  );
  next();
});


usersSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = new mongoose.model("User", usersSchema);
module.exports = User;


