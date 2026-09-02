import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getJob();
    }, [id]);

    const getJob = async () => {
        try {
            setLoading(true);
            setError("");

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
            setError(
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
            setSaving(true);
            setMessage("");
            setError("");

            const jobData = {
                title: formData.title,
                company: formData.company,
                location: formData.location,
                role: formData.role,

                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== ""),

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
            setError(
                error.response?.data?.message ||
                "Failed to update job"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Loading job...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/admin/jobs"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        ← Back to Jobs
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mt-5">
                        Edit Job
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update the job information below.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7"
                    >

                        {/* Basic Information */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="label">
                                        Job Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="label">
                                Skills
                            </label>

                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="input"
                                placeholder="React, Node.js, MongoDB"
                                required
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Separate skills using commas.
                            </p>
                        </div>

                        {/* Salary */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Compensation
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="label">
                                        Minimum Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="minSalary"
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Maximum Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="maxSalary"
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Eligibility */}
                        <div>
                            <label className="label">
                                Eligibility
                            </label>

                            <input
                                type="text"
                                name="eligibility"
                                value={formData.eligibility}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                        </div>

                        {/* Apply Link */}
                        <div>
                            <label className="label">
                                Application Link
                            </label>

                            <input
                                type="url"
                                name="applyLink"
                                value={formData.applyLink}
                                onChange={handleChange}
                                className="input"
                                placeholder="https://company.com/apply"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="label">
                                Job Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="7"
                                className="input resize-none"
                                required
                            />
                        </div>

                        {/* Button */}
                        <div className="pt-5 border-t border-gray-200">

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition"
                            >
                                {saving
                                    ? "Updating Job..."
                                    : "Update Job"
                                }
                            </button>

                        </div>

                    </form>

                    {/* Success Message */}
                    {message && (
                        <div className="mt-5 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-center">
                            {message}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default EditJob;
