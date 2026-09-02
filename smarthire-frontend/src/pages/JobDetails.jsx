
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                error.response?.data?.message || "Failed to fetch job"
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

            setApplyMessage(response.data.message);


        } catch (error) {
            setApplyMessage(
                error.response?.data?.message || "Failed to apply"
            );
        } finally {
            setApplying(false);
        }
    }

    if (loading) {
        return <p>Loading job...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>{job.title}</h1>

            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Role: {job.role}</p>

            <h3>Skills</h3>

            <p>{job.skills?.join(", ")}</p>

            <h3>Salary</h3>

            <p>
                ₹{job.salary?.min} - ₹{job.salary?.max}
            </p>

            <h3>Eligibility</h3>

            <p>{job.eligibility}</p>

            <h3>Description</h3>

            <p>{job.description}</p>

            <button onClick={handleApply} disabled={applying}>
                {applying ? "Applying..." : "Apply Now"}
            </button>

            <p>{applyMessage}</p>
        </div>
    );
}

export default JobDetails;

