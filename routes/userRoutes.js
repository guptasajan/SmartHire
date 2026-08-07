const express = require("express");
const router = express.Router();

module.exports = router;

const { getProfile, updateProfile,
    changePassword, deleteAccount
} = require("../controllers/userController.js"
);

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;


