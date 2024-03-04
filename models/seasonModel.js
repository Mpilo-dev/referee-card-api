const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide SEASON name"],
    unique: true,
  },
  startDate: {
    type: Date,
    required: [true, "Please provide a start date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please provide a end date"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
    required: [true, "Season must belong to a league"],
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: [true, "Season must have at least a game"],
    },
  ],
});

// QUERY Middleware
seasonSchema.pre(/^find/, function (next) {
  this.populate({
    path: "league",
    select: "name",
  }).populate({
    path: "games",
    select: "date venue kickOffTime  teams",
  });

  next();
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
