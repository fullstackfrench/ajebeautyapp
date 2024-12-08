const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profilesController = require("../controllers/profiles");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/", profilesController.getProfile);

router.get("/:id", profilesController.getProfileById);

router.post("/search", profilesController.profileSearch);

router.post("/", ensureAuth, upload.single('profile-photo'), profilesController.createProfile);

router.post("/portfolio", ensureAuth, upload.single('portfolio'), profilesController.updatePortfolio);

router.put("/", ensureAuth, profilesController.updateProfile);

router.delete("/:id", ensureAuth, profilesController.deleteProfile);

module.exports = router;
