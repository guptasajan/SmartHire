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

    const getStatusStyle = (status) => {
        if (status === "Selected") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Rejected") {
            return "bg-red-100 text-red-700";
        }

        if (status === "Shortlisted") {
            return "bg-yellow-100 text-yellow-700";
        }

        return "bg-blue-100 text-blue-700";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading applications...
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

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Applications
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track the jobs you have applied for
                    </p>

                </div>

                {applications.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">

                        <h2 className="text-xl font-semibold text-gray-900">
                            No applications yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start applying for jobs to track them here.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-5">

                        {applications.map((application) => (

                            <div
                                key={application._id}
                                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            {application.job?.title}
                                        </h2>

                                        <p className="text-blue-600 font-medium mt-1">
                                            {application.job?.company}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusStyle(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-600">

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Location
                                        </p>

                                        <p className="font-medium mt-1">
                                            📍 {application.job?.location}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Applied On
                                        </p>

                                        <p className="font-medium mt-1">
                                            {new Date(
                                                application.appliedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyApplications;

// import { useEffect, useState } from "react";
// import api from "../services/api";

// function MyApplications() {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         getApplications();
//     }, []);

//     const getApplications = async () => {
//         try {
//             const response = await api.get("/applications/my");

//             setApplications(response.data.applications);
//         } catch (error) {
//             setError(
//                 error.response?.data?.message ||
//                 "Failed to fetch applications"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <p>Loading applications...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h1>My Applications</h1>

//             {applications.length === 0 ? (
//                 <p>You have not applied to any jobs yet.</p>
//             ) : (
//                 applications.map((application) => (
//                     <div key={application._id}>
//                         <h2>{application.job?.title}</h2>

//                         <p>
//                             Company: {application.job?.company}
//                         </p>

//                         <p>
//                             Location: {application.job?.location}
//                         </p>

//                         <p>
//                             Status: {application.status}
//                         </p>

//                         <p>
//                             Applied On:{" "}
//                             {new Date(
//                                 application.appliedAt
//                             ).toLocaleDateString()}
//                         </p>

//                         <hr />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default MyApplications;

