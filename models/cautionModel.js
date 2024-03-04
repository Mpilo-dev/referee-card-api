const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");

const cautionSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: [true, "Caution must Belong to a game"],
    },
    referee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Caution must be issued by a referee"],
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Caution must Belong to a player"],
    },
    type: {
      type: String,
      enum: ["yellow", "red"],
      required: [true, "Caution type must be yellow or red"],
    },
    reason: {
      type: String,
      required: [true, "Caution must have a reason"],
    },
    timestamp: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Populate
cautionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "game",
    select: "date",
  })
    .populate({
      path: "referee",
      model: "User",
      match: {
        role: "referee",
      },
      select: "name",
    })
    .populate({
      path: "player",
      model: "User",
      match: {
        role: "player",
      },
      select: "name",
    });
  next();
});

// Middleware to check for automatic red card
//  Pre-save middleware to check for automatic red card
cautionSchema.pre("save", async function (next) {
  console.log(this.type);
  // Only apply this logic for yellow cards
  if (this.type === "yellow") {
    // Count the number of yellow cards for this player in the same game
    const count = await this.constructor.countDocuments({
      game: this.game,
      player: this.player,
      type: "yellow",
    });

    // If this is the second yellow card, automatically change its type to red
    if (count === 1) {
      this.type = "red";
      this.reason =
        "Automatic red card after two yellow cards in the same game";
    }
  }
  next();
});

const Caution = mongoose.model("Caution", cautionSchema);

module.exports = Caution;
