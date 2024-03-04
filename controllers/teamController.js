const Team = require("./../models/teamModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find().select("-__v");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: teams.length,
    data: {
      teams,
    },
  });
});

exports.getTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(new AppError("No team found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});

exports.createTeam = catchAsync(async (req, res, next) => {
  const newTeam = await Team.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      team: newTeam,
    },
  });
});

exports.updateTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!team) {
    return next(new AppError("No team found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      team,
    },
  });
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findByIdAndDelete(req.params.id);

  if (!team) {
    return next(new AppError("No team found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
