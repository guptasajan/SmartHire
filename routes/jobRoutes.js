const express = require("express");
const router = express.Router();

const { createJob, getAllJobs } = require("../controllers/jobController");

const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");

router.get("/", getAllJobs);

router.post("/", auth, admin, createJob);

//specific job search
router.get(":/id", getJobById);

module.exports = router;