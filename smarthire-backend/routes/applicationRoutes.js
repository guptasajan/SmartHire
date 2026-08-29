const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");

const { applyJob, getJobApplications, getMyApplications, updateApplicationStatus } = require("../controllers/applicationController.js")

router.post("/:jobId", auth, applyJob);

router.get("/my", auth, getMyApplications);

router.get("/job/:jobId", auth, getJobApplications);

router.patch("/:applicationId/status", auth, updateApplicationStatus);

module.exports = router;