const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.js");
const admin = require("../middleware/admin.js");


const { createJob, getAllJobs, updateJob, deleteJob, getJobById } = require("../controllers/jobController");


router.get("/", getAllJobs);

router.post("/", auth, admin, createJob);

//specific job search
router.get("/:id", getJobById);

//update jobs details
router.put("/:id", auth, admin, updateJob);

//
router.patch("/:id", auth, admin, updateJob);

//delete job
router.delete("/:id", auth, admin, deleteJob);

module.exports = router;