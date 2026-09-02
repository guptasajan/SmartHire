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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading dashboard...
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
    const stats = [
        {
            title: "Total Jobs",
            value: dashboard.totalJobs,
            icon: "💼",
            description: "Jobs posted"
        },
        {
            title: "Applications",
            value: dashboard.totalApplications,
            icon: "📄",
            description: "Total applications"
        },
        {
            title: "Shortlisted",
            value: dashboard.shortlistedCandidates,
            icon: "⭐",
            description: "Candidates shortlisted"
        },
        {
            title: "Selected",
            value: dashboard.selectedCandidates,
            icon: "🎯",
            description: "Candidates selected"
        },
        {
            title: "Rejected",
            value: dashboard.rejectedCandidates,
            icon: "❌",
            description: "Applications rejected"
        }
    ];

    // const stats = [
    //     {
    //         title: "Total Jobs",
    //         value: dashboard.totalJobs,
    //         icon: "💼",
    //         description: "Jobs posted"
    //     },
    //     {
    //         title: "Applications",
    //         value: dashboard.totalApplications,
    //         icon: "📄",
    //         description: "Total applications"
    //     },
    //     {
    //         title: "Shortlisted",
    //         value: dashboard.selectedCandidates,
    //         icon: "⭐",
    //         description: "Candidates shortlisted"
    //     },
    //     {
    //         title: "Rejected",
    //         value: dashboard.rejectedCandidates,
    //         icon: "❌",
    //         description: "Applications rejected"
    //     }
    // ];

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Overview of your hiring activity
                    </p>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {stats.map((stat) => (

                        <div
                            key={stat.title}
                            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
                        >

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        {stat.title}
                                    </p>

                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {stat.value}
                                    </p>
                                </div>

                                <div className="text-3xl">
                                    {stat.icon}
                                </div>

                            </div>

                            <p className="text-sm text-gray-400 mt-4">
                                {stat.description}
                            </p>

                        </div>

                    ))}

                </div>

                {/* Quick Actions */}
                <div className="mt-10">

                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        <a
                            href="/admin/create-job"
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                        >
                            <p className="font-semibold text-gray-900">
                                Create Job
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Post a new job opening
                            </p>
                        </a>

                        <a
                            href="/admin/jobs"
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                        >
                            <p className="font-semibold text-gray-900">
                                Manage Jobs
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Edit or delete existing jobs
                            </p>
                        </a>

                        <a
                            href="/admin/applications"
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                        >
                            <p className="font-semibold text-gray-900">
                                View Applications
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Review candidate applications
                            </p>
                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
