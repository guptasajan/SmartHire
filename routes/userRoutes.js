const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const upload = require("../middleware/upload.js");



const { getProfile, updateProfile,
    changePassword, deleteAccount, uploadResume
} = require("../controllers/userController.js"
);
const uploadUserResume = require("../middleware/upload.js");



router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.delete("/delete-account", auth, deleteAccount);
router.patch("/resume", auth, uploadUserResume, uploadResume);

module.exports = router;


