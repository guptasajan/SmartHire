const mongoose = require("mongoose");
const Job = require("../models/Job.js");



const createJob = async (req, res) => {
    try {


        const { title, company, location, salary, role, skills,
            eligibility, applyLink, description } = req.body;

        //validation
        if (!title || !title.trim() || !company.trim() || !location.trim() || !role.trim() || !applyLink.trim()) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }
        //create job
        const job = new Job({
            title, company, location, salary, role, skills,
            eligibility, applyLink, description,
            createdBy: req.user.id
        });
        //save job
        await job.save();
        //response
        return res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,

        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = (await Job.find()).toSorted({ createdAt: -1 });

        return res.status(200).json({
            count: jobs.length,
            jobs,
        })
    }

    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const getJobById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            });
        }

        const job = await Job.findById(id)
            .populate("createdBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not Exist",
            })
        }

        return res.status(200).json({
            job,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Job ID"
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const { title, company, location, salary, role, skills,
            eligibility, applyLink, description } = req.body;

        const update = {};

        if (title) {
            update.title = title;
        }
        if (company) {
            update.company = company;
        }
        if (location) {
            update.location = location;
        }
        if (salary) {
            update.salary = salary;
        }
        if (role) {
            update.role = role;
        }
        if (skills) {
            update.skills = skills;
        }
        if (eligibility) {
            update.eligibility = eligibility;
        }
        if (applyLink) {
            update.applyLink = applyLink;
        }
        if (description) {
            update.description = description;
        }

        const updateJob = await Job.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        return res.status(200).json({
            message: "Job updated successfully",
            job: updateJob
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { createJob, getAllJobs, getJobById };