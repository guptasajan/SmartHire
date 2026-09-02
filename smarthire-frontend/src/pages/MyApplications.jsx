import { useEffect, useState } from "react";
import api from "../services/api";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getApplications();
    }, []);

    const getApplications = async () => {
        try {
            const response = await api.get("/applications/my");

            setApplications(response.data.applications);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch applications"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading applications...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>My Applications</h1>

            {applications.length === 0 ? (
                <p>You have not applied to any jobs yet.</p>
            ) : (
                applications.map((application) => (
                    <div key={application._id}>
                        <h2>{application.job?.title}</h2>

                        <p>
                            Company: {application.job?.company}
                        </p>

                        <p>
                            Location: {application.job?.location}
                        </p>

                        <p>
                            Status: {application.status}
                        </p>

                        <p>
                            Applied On:{" "}
                            {new Date(
                                application.appliedAt
                            ).toLocaleDateString()}
                        </p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default MyApplications;

