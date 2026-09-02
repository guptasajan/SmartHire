import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {
            const response = await api.get("/dashboard");

            setDashboard(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch dashboard"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading dashboard...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h3>Total Jobs</h3>
            <p>{dashboard.totalJobs}</p>

            <h3>Total Applications</h3>
            <p>{dashboard.totalApplications}</p>

            <h3>Shortlisted</h3>
            <p>{dashboard.selectedCandidates}</p>

            <h3>Rejected</h3>
            <p>{dashboard.rejectedCandidates}</p>
        </div>
    );
}

export default AdminDashboard;