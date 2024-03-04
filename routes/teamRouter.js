const express = require("express");
const teamController = require("./../controllers/teamController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    teamController.getAllTeams
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    teamController.createTeam
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    teamController.getTeam
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    teamController.updateTeam
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    teamController.deleteTeam
  );
module.exports = router;
