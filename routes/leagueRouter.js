const express = require("express");
const leagueController = require("./../controllers/leagueController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    leagueController.getAllLeagues
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    leagueController.createLeague
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    leagueController.getLeague
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    leagueController.updateLeague
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    leagueController.deleteLeague
  );
module.exports = router;
