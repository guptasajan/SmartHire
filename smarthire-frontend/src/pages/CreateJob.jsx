import { useState } from "react";
import api from "../services/api";

function CreateJob() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        role: "",
        skills: "",
        eligibility: "",
        applyLink: "",
        description: "",
        minSalary: "",
        maxSalary: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const jobData = {
                title: formData.title,
                company: formData.company,
                location: formData.location,
                role: formData.role,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim()),
                eligibility: formData.eligibility,
                applyLink: formData.applyLink,
                description: formData.description,
                salary: {
                    min: Number(formData.minSalary),
                    max: Number(formData.maxSalary),
                    currency: "INR"
                }
            };

            const response = await api.post("/jobs", jobData);

            setMessage(response.data.message || "Job created successfully");

            setFormData({
                title: "",
                company: "",
                location: "",
                role: "",
                skills: "",
                eligibility: "",
                applyLink: "",
                description: "",
                minSalary: "",
                maxSalary: ""
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create job"
            );
        }
    };

    return (
        <div>
            <h1>Create Job</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                <input
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                />

                <input
                    name="skills"
                    placeholder="React, Node, MongoDB"
                    value={formData.skills}
                    onChange={handleChange}
                />

                <input
                    name="eligibility"
                    placeholder="Eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                />

                <input
                    name="applyLink"
                    placeholder="Apply Link"
                    value={formData.applyLink}
                    onChange={handleChange}
                />

                <input
                    name="minSalary"
                    type="number"
                    placeholder="Minimum Salary"
                    value={formData.minSalary}
                    onChange={handleChange}
                />

                <input
                    name="maxSalary"
                    type="number"
                    placeholder="Maximum Salary"
                    value={formData.maxSalary}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create Job
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default CreateJob;