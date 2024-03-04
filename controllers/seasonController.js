const Season = require("./../models/seasonModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllSeasons = catchAsync(async (req, res, next) => {
  const seasons = await Season.find().select("-__v");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: seasons.length,
    data: {
      seasons,
    },
  });
});

exports.getSeason = catchAsync(async (req, res, next) => {
  const season = await Season.findById(req.params.id);

  if (!season) {
    return next(new AppError("No season found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      season,
    },
  });
});

exports.createSeason = catchAsync(async (req, res, next) => {
  const newSeason = await Season.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      season: newSeason,
    },
  });
});

exports.updateSeason = catchAsync(async (req, res, next) => {
  const season = await Season.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!season) {
    return next(new AppError("No season found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      season,
    },
  });
});

exports.deleteSeason = catchAsync(async (req, res, next) => {
  const season = await Season.findByIdAndDelete(req.params.id);

  if (!season) {
    return next(new AppError("No season found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
