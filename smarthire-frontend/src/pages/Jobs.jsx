import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Jobs() {
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
                error.response?.data?.message || "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading jobs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Jobs</h1>

            {jobs.length === 0 ? (
                <p>No jobs available</p>
            ) : (
                jobs.map((job) => (
                    <div key={job._id}>
                        <h2>{job.title}</h2>

                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Role: {job.role}</p>

                        <p>
                            Skills: {job.skills?.join(", ")}
                        </p>

                        <p>
                            Salary: ₹{job.salary?.min} - ₹
                            {job.salary?.max}
                        </p>

                        <Link to={`/jobs/${job._id}`}>
                            View Details
                        </Link>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Jobs;