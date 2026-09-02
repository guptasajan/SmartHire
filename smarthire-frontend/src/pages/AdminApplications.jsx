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

    const updateStatus = async (applicationId, status) => {
        try {
            await api.patch(
                `/applications/${applicationId}/status`,
                { status }
            );

            getApplications();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update status"
            );
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

                        <select
                            value={application.status}
                            onChange={(e) =>
                                updateStatus(
                                    application._id,
                                    e.target.value
                                )
                            }
                        >
                            <option value="Applied">Applied</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>

                ))
            )}
        </div>
    );
}

export default AdminApplications;