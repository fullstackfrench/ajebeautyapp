const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviews");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createReview/:id", reviewsController.createReview);

module.exports = router;