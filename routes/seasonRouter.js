const express = require("express");
const seasonController = require("./../controllers/seasonController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    seasonController.getAllSeasons
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    seasonController.createSeason
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    seasonController.getSeason
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    seasonController.updateSeason
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    seasonController.deleteSeason
  );
module.exports = router;
