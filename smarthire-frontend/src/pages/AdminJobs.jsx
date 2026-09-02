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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading jobs...
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

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Manage Jobs
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Create and manage your job postings
                        </p>
                    </div>

                    <Link
                        to="/admin/create-job"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-center"
                    >
                        + Create New Job
                    </Link>

                </div>

                {/* Jobs */}
                {jobs.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

                        <h2 className="text-xl font-semibold">
                            No jobs found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create your first job posting.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-5">

                        {jobs.map((job) => (

                            <div
                                key={job._id}
                                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                    {/* Job Info */}
                                    <div>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            {job.title}
                                        </h2>

                                        <p className="text-blue-600 font-medium mt-1">
                                            {job.company}
                                        </p>

                                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">

                                            <span>
                                                📍 {job.location}
                                            </span>

                                            <span>
                                                💼 {job.role}
                                            </span>

                                            <span>
                                                💰 ₹{job.salary?.min} - ₹
                                                {job.salary?.max}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">

                                        <Link
                                            to={`/admin/edit-job/${job._id}`}
                                            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(job._id)
                                            }
                                            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                                {/* Skills */}
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

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminJobs;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";

// function AdminJobs() {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         getJobs();
//     }, []);

//     const getJobs = async () => {
//         try {
//             const response = await api.get("/jobs");

//             setJobs(response.data.jobs);
//         } catch (error) {
//             setError(
//                 error.response?.data?.message ||
//                 "Failed to fetch jobs"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (jobId) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this job?"
//         );

//         if (!confirmDelete) return;

//         try {
//             await api.delete(`/jobs/${jobId}`);

//             setJobs(
//                 jobs.filter((job) => job._id !== jobId)
//             );
//         } catch (error) {
//             setError(
//                 error.response?.data?.message ||
//                 "Failed to delete job"
//             );
//         }
//     };

//     if (loading) return <p>Loading jobs...</p>;

//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h1>Manage Jobs</h1>

//             <Link to="/admin/create-job">
//                 Create New Job
//             </Link>

//             {jobs.length === 0 ? (
//                 <p>No jobs found</p>
//             ) : (
//                 jobs.map((job) => (
//                     <div key={job._id}>
//                         <h2>{job.title}</h2>

//                         <p>Company: {job.company}</p>

//                         <p>Location: {job.location}</p>

//                         <Link to={`/admin/edit-job/${job._id}`}>
//                             Edit
//                         </Link>

//                         <button
//                             onClick={() =>
//                                 handleDelete(job._id)
//                             }
//                         >
//                             Delete
//                         </button>

//                         <hr />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default AdminJobs;