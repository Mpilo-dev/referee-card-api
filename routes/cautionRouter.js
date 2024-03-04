const express = require("express");
const cautionController = require("./../controllers/cautionController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Routes
router
  .route("/")
  .get(cautionController.getAllCautions)
  .post(
    authController.protect,
    authController.restrictTo("referee"),
    cautionController.createCaution
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("referee"),
    cautionController.getCaution
  )
  .patch(
    authController.protect,
    authController.restrictTo("referee"),
    cautionController.updateCaution
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "referee"),
    cautionController.deleteCaution
  );

module.exports = router;
