import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [skill, setSkill] = useState("");

    useEffect(() => {
        getJobs({
            search: "",
            location: "",
            role: "",
            skill: ""
        });
    }, []);

    const getJobs = async (filters) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/jobs", {
                params: filters
            });

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

    const handleSearch = () => {
        getJobs({
            search,
            location,
            role,
            skill
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your Next Opportunity
                    </h1>

                    <p className="text-blue-100 text-lg">
                        Discover jobs that match your skills and career goals.
                    </p>

                </div>
            </section>

            {/* Search Section */}
            <div className="max-w-6xl mx-auto px-6 -mt-8">

                <div className="bg-white rounded-xl shadow-lg p-5">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Skill"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        onClick={handleSearch}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Search Jobs
                    </button>

                </div>
            </div>

            {/* Jobs */}
            <main className="max-w-6xl mx-auto px-6 py-12">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Latest Jobs
                    </h2>

                    <span className="text-gray-500">
                        {jobs.length} jobs found
                    </span>
                </div>

                {loading && (
                    <p className="text-center text-gray-500">
                        Loading jobs...
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                        <h3 className="text-xl font-semibold">
                            No jobs found
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Try changing your search filters.
                        </p>
                    </div>
                )}

                {!loading && !error && jobs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
                            >

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {job.title}
                                        </h3>

                                        <p className="text-blue-600 font-medium mt-1">
                                            {job.company}
                                        </p>
                                    </div>

                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                                        {job.role}
                                    </span>

                                </div>

                                <div className="mt-5 space-y-2 text-gray-600">

                                    <p>
                                        📍 {job.location}
                                    </p>

                                    <p>
                                        💰 ₹{job.salary?.min} - ₹
                                        {job.salary?.max}
                                    </p>

                                </div>

                                <div className="flex flex-wrap gap-2 mt-5">

                                    {job.skills?.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}

export default Jobs;
