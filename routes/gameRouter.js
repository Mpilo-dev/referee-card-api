const express = require("express");
const gameController = require("./../controllers/gameController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.getAllGames
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.createGame
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.getGame
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.updateGame
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    gameController.deleteGame
  );

module.exports = router;
