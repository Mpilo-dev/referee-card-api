const League = require("./../models/leagueModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllLeagues = catchAsync(async (req, res, next) => {
  const leagues = await League.find().select("-__v");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: leagues.length,
    data: {
      leagues,
    },
  });
});
exports.getLeague = catchAsync(async (req, res, next) => {
  const league = await League.findById(req.params.id);

  if (!league) {
    return next(new AppError("No league found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      league,
    },
  });
});

exports.createLeague = catchAsync(async (req, res, next) => {
  const newLeague = await League.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      league: newLeague,
    },
  });
});

exports.updateLeague = catchAsync(async (req, res, next) => {
  const league = await League.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!league) {
    return next(new AppError("No league found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      league,
    },
  });
});

exports.deleteLeague = catchAsync(async (req, res, next) => {
  const league = await League.findByIdAndDelete(req.params.id);

  if (!league) {
    return next(new AppError("No league found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
