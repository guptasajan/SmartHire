import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await api.get("/jobs");

            setJobs(response.data.jobs);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/jobs/${jobId}`);

            setJobs(
                jobs.filter((job) => job._id !== jobId)
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete job"
            );
        }
    };

    if (loading) return <p>Loading jobs...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Manage Jobs</h1>

            <Link to="/admin/create-job">
                Create New Job
            </Link>

            {jobs.length === 0 ? (
                <p>No jobs found</p>
            ) : (
                jobs.map((job) => (
                    <div key={job._id}>
                        <h2>{job.title}</h2>

                        <p>Company: {job.company}</p>

                        <p>Location: {job.location}</p>

                        <Link to={`/admin/edit-job/${job._id}`}>
                            Edit
                        </Link>

                        <button
                            onClick={() =>
                                handleDelete(job._id)
                            }
                        >
                            Delete
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminJobs;