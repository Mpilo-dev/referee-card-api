const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide LEAGUE name"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    seasons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season",
        required: [true, "League must have a season"],
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

leagueSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seasons",
    select: "name",
  });
  next();
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
