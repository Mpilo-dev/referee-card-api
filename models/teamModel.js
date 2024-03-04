const mongoose = require("mongoose");
const validator = require("validator");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide team name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide team email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

teamSchema.pre(/^find/, function (next) {
  this.populate({
    path: "players",
    select: "name",
  });
  next();
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
