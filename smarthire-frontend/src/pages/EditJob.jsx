import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EditJob() {
    const { id } = useParams();

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

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getJob();
    }, [id]);

    const getJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);

            const job = response.data.job;

            setFormData({
                title: job.title || "",
                company: job.company || "",
                location: job.location || "",
                role: job.role || "",
                skills: job.skills?.join(", ") || "",
                eligibility: job.eligibility || "",
                applyLink: job.applyLink || "",
                description: job.description || "",
                minSalary: job.salary?.min || "",
                maxSalary: job.salary?.max || ""
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch job"
            );
        } finally {
            setLoading(false);
        }
    };

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

            const response = await api.put(
                `/jobs/${id}`,
                jobData
            );

            setMessage(
                response.data.message ||
                "Job updated successfully"
            );
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to update job"
            );
        }
    };

    if (loading) {
        return <p>Loading job...</p>;
    }

    return (
        <div>
            <h1>Edit Job</h1>

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
                    Update Job
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default EditJob;