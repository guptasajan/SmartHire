import { useEffect, useState } from "react";
import api from "../services/api";

function AdminApplications() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [applications, setApplications] = useState([]);

    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingApplications, setLoadingApplications] = useState(false);

    const [error, setError] = useState("");

    // Fetch admin jobs
    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            setLoadingJobs(true);
            setError("");

            const response = await api.get("/jobs");

            setJobs(response.data.jobs || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch jobs"
            );
        } finally {
            setLoadingJobs(false);
        }
    };

    // Fetch applications for selected job
    const getApplications = async (jobId) => {
        if (!jobId) {
            setApplications([]);
            return;
        }

        try {
            setLoadingApplications(true);
            setError("");

            const response = await api.get(
                `/applications/job/${jobId}`
            );

            setApplications(response.data.applicants || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch applications"
            );
        } finally {
            setLoadingApplications(false);
        }
    };

    const handleJobChange = (e) => {
        const jobId = e.target.value;

        setSelectedJob(jobId);

        getApplications(jobId);
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(
                `/applications/${applicationId}/status`,
                { status }
            );

            getApplications(selectedJob);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update status"
            );
        }
    };

    const getStatusStyle = (status) => {
        if (status === "Selected") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Rejected") {
            return "bg-red-100 text-red-700";
        }

        if (status === "Shortlisted") {
            return "bg-yellow-100 text-yellow-700";
        }

        return "bg-blue-100 text-blue-700";
    };

    const selectedJobData = jobs.find(
        (job) => job._id === selectedJob
    );

    if (loadingJobs) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Loading jobs...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Job Applications
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Select a job to review its applicants.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Job Selection */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">

                    <label className="label">
                        Select Job
                    </label>

                    <select
                        value={selectedJob}
                        onChange={handleJobChange}
                        className="input bg-white"
                    >
                        <option value="">
                            -- Select a job --
                        </option>

                        {jobs.map((job) => (
                            <option
                                key={job._id}
                                value={job._id}
                            >
                                {job.title} - {job.company}
                            </option>
                        ))}
                    </select>

                </div>

                {/* No Job Selected */}
                {!selectedJob && (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">

                        <div className="text-5xl mb-4">
                            📋
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            Select a job
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Choose a job above to view its applications.
                        </p>

                    </div>
                )}

                {/* Selected Job */}
                {selectedJob && (
                    <>
                        {/* Job Info */}
                        {selectedJobData && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">

                                <h2 className="text-xl font-bold text-gray-900">
                                    {selectedJobData.title}
                                </h2>

                                <p className="text-blue-600 font-medium mt-1">
                                    {selectedJobData.company}
                                </p>

                                <p className="text-gray-500 mt-1">
                                    📍 {selectedJobData.location}
                                </p>

                            </div>
                        )}

                        {loadingApplications ? (

                            <div className="text-center py-12">
                                <p className="text-gray-500">
                                    Loading applications...
                                </p>
                            </div>

                        ) : (
                            <>
                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="text-3xl font-bold text-gray-900 mt-2">
                                            {applications.length}
                                        </p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Applied
                                        </p>

                                        <p className="text-3xl font-bold text-blue-600 mt-2">
                                            {
                                                applications.filter(
                                                    (app) =>
                                                        app.status === "Applied"
                                                ).length
                                            }
                                        </p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Shortlisted
                                        </p>

                                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                                            {
                                                applications.filter(
                                                    (app) =>
                                                        app.status === "Shortlisted"
                                                ).length
                                            }
                                        </p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                        <p className="text-sm text-gray-500">
                                            Selected
                                        </p>

                                        <p className="text-3xl font-bold text-green-600 mt-2">
                                            {
                                                applications.filter(
                                                    (app) =>
                                                        app.status === "Selected"
                                                ).length
                                            }
                                        </p>
                                    </div>

                                </div>

                                {/* Applicants */}
                                {applications.length === 0 ? (

                                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">

                                        <div className="text-5xl mb-4">
                                            📄
                                        </div>

                                        <h2 className="text-xl font-semibold text-gray-900">
                                            No applications yet
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            No candidates have applied for this job.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-5">

                                        {applications.map(
                                            (application) => (

                                                <div
                                                    key={application._id}
                                                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                                                >

                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                                        <div>
                                                            <h2 className="text-xl font-bold text-gray-900">
                                                                {application.user.name}
                                                            </h2>

                                                            <p className="text-gray-500 mt-1">
                                                                {application.user.email}
                                                            </p>

                                                            <p className="text-sm text-gray-400 mt-2">
                                                                Applied on{" "}
                                                                {new Date(
                                                                    application.appliedAt
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                                                            <span
                                                                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(
                                                                    application.status
                                                                )}`}
                                                            >
                                                                {application.status}
                                                            </span>

                                                            <select
                                                                value={
                                                                    application.status
                                                                }
                                                                onChange={(e) =>
                                                                    updateStatus(
                                                                        application._id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                                            >
                                                                <option value="Applied">
                                                                    Applied
                                                                </option>

                                                                <option value="Shortlisted">
                                                                    Shortlisted
                                                                </option>

                                                                <option value="Rejected">
                                                                    Rejected
                                                                </option>

                                                                <option value="Selected">
                                                                    Selected
                                                                </option>
                                                            </select>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

            </div>

        </div>
    );
}

export default AdminApplications;
