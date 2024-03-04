const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please provide a 'DATE'"],
  },
  venue: {
    type: String,
    required: [true, "Please provide a 'VENUE'"],
  },
  startTime: {
    type: Date,
    required: [true, "Please provide a start time"],
  },
  endTime: {
    type: Date,
    // required: true,
  },

  kickOffTime: {
    type: String,
    required: [true, "Please provide 'KICK-OFF TIME'"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: [true, "Game must belong to a season"],
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Game must have a referee"],
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Game must have two teams"],
    },
  ],
});

// QUERY Middleware
// Pre-save hook to calculate endTime based on startTime
gameSchema.pre("save", function (next) {
  if (this.startTime) {
    // Calculate endTime only if startTime exists
    this.endTime = new Date(this.startTime);
    this.endTime.setMinutes(this.endTime.getMinutes() + 30); // Add 30 minutes to start time

    // Check if endTime is 30 minutes after startTime
    const duration = this.endTime.getTime() - this.startTime.getTime();
    if (duration !== 30 * 60 * 1000) {
      // Adjust endTime if duration is not 30 minutes
      this.endTime = new Date(this.startTime.getTime() + 30 * 60 * 1000);
    }
  }
  next();
});

gameSchema.pre(/^find/, function (next) {
  this.populate({
    path: "season",
    select: " -games -league",
  })
    .populate({
      path: "referee",
      select: "name",
    })
    .populate({
      path: "teams",
      select: "name",
    });
  next();
});

gameSchema.path("teams").validate(function (value) {
  return value.length === 2;
}, "A game must have exactly two teams");

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
