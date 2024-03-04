const Caution = require("./../models/cautionModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getAllCautions = catchAsync(async (req, res, next) => {
  const cautions = await Caution.find().select("-__v");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: cautions.length,
    data: {
      cautions,
    },
  });
});

exports.getCaution = catchAsync(async (req, res, next) => {
  const caution = await Caution.findById(req.params.id);

  if (!caution) {
    return next(new AppError("No caution found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      caution,
    },
  });
});

exports.createCaution = catchAsync(async (req, res, next) => {
  const newCaution = await Caution.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      caution: newCaution,
    },
  });
});

exports.updateCaution = catchAsync(async (req, res, next) => {
  const caution = await Caution.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!caution) {
    return next(new AppError("No caution found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      caution,
    },
  });
});

exports.deleteCaution = catchAsync(async (req, res, next) => {
  const caution = await Caution.findByIdAndDelete(req.params.id);

  if (!caution) {
    return next(new AppError("No caution found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
