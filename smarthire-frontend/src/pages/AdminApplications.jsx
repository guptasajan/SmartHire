import { useEffect, useState } from "react";
import api from "../services/api";

function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const jobId = "6a929ac1181cc59abac41666";

    useEffect(() => {
        getApplications();
    }, []);

    const getApplications = async () => {
        try {
            const response = await api.get(`/applications/job/${jobId}`);

            setApplications(response.data.applicants);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch applications"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Job Applications</h1>

            {applications.length === 0 ? (
                <p>No applications found</p>
            ) : (
                applications.map((application) => (
                    <div key={application._id}>
                        <h3>{application.user.name}</h3>

                        <p>Email: {application.user.email}</p>

                        <p>Status: {application.status}</p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminApplications;