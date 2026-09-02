import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [applyMessage, setApplyMessage] = useState("");
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        getJob();
    }, [id]);

    const getJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);
            setJob(response.data.job);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch job"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        setApplying(true);
        setApplyMessage("");

        try {
            const response = await api.post(`/applications/${id}`);

            setApplyMessage(
                response.data.message || "Application submitted successfully"
            );
        } catch (error) {
            setApplyMessage(
                error.response?.data?.message ||
                "Failed to apply"
            );
        } finally {
            setApplying(false);
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

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <section className="bg-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-12">

                    <Link
                        to="/jobs"
                        className="text-blue-100 hover:text-white"
                    >
                        ← Back to Jobs
                    </Link>

                    <h1 className="text-4xl font-bold mt-6">
                        {job.title}
                    </h1>

                    <p className="text-xl text-blue-100 mt-2">
                        {job.company}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-5 text-blue-100">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.role}</span>
                    </div>

                </div>
            </section>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-white rounded-xl border border-gray-200 p-7">

                            <h2 className="text-2xl font-bold mb-4">
                                Job Description
                            </h2>

                            <p className="text-gray-600 leading-7">
                                {job.description}
                            </p>

                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-7">

                            <h2 className="text-2xl font-bold mb-4">
                                Required Skills
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {job.skills?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-7">

                            <h2 className="text-2xl font-bold mb-4">
                                Eligibility
                            </h2>

                            <p className="text-gray-600">
                                {job.eligibility}
                            </p>

                        </div>

                    </div>

                    {/* Sidebar */}
                    <aside>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">

                            <h2 className="text-xl font-bold mb-5">
                                Job Overview
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Salary
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        ₹{job.salary?.min} - ₹
                                        {job.salary?.max}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Location
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job.location}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Role
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {job.role}
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="w-full mt-7 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition"
                            >
                                {applying
                                    ? "Applying..."
                                    : "Apply Now"}
                            </button>

                            {applyMessage && (
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    {applyMessage}
                                </p>
                            )}

                        </div>

                    </aside>

                </div>

            </main>

        </div>
    );
}

export default JobDetails;

