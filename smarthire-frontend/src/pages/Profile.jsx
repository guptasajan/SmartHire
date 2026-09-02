import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        skills: []
    });

    const [resume, setResume] = useState(null);
    const [resumeMessage, setResumeMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await api.get("/user/profile");
            setUser(response.data.user);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setFormData({
            name: user.name,
            email: user.email,
            skills: user.skills || []
        });

        setIsEditing(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            const response = await api.put(
                "/user/profile",
                formData
            );

            setUser(response.data.user);
            setIsEditing(false);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const handleResumeUpload = async () => {
        if (!resume) {
            setResumeMessage("Please select a resume");
            return;
        }

        const data = new FormData();
        data.append("resume", resume);

        try {
            setUploading(true);
            setResumeMessage("");

            const response = await api.patch(
                "/user/resume",
                data
            );

            setResumeMessage(response.data.message);

            setResume(null);

            await getProfile();

        } catch (error) {
            setResumeMessage(
                error.response?.data?.message ||
                "Resume upload failed"
            );
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <p className="text-gray-500">
                    Loading profile...
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
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your personal information and resume
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Profile Card */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-7">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-xl font-bold">
                                Personal Information
                            </h2>

                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                                >
                                    Edit Profile
                                </button>
                            )}

                        </div>

                        {!isEditing ? (
                            <div className="space-y-5">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Full Name
                                    </p>

                                    <p className="font-medium mt-1">
                                        {user.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-medium mt-1">
                                        {user.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Account Type
                                    </p>

                                    <span className="inline-block mt-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm capitalize">
                                        {user.role}
                                    </span>
                                </div>

                            </div>
                        ) : (
                            <div className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Skills
                                    </label>

                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills.join(", ")}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                skills: e.target.value
                                                    .split(",")
                                                    .map((skill) =>
                                                        skill.trim()
                                                    )
                                                    .filter(
                                                        (skill) =>
                                                            skill !== ""
                                                    )
                                            })
                                        }
                                        placeholder="C++, React, Node, MongoDB"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        onClick={() =>
                                            setIsEditing(false)
                                        }
                                        className="border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>
                        )}

                        {/* Skills */}
                        {!isEditing && (
                            <div className="mt-8">

                                <h3 className="font-semibold mb-3">
                                    Skills
                                </h3>

                                <div className="flex flex-wrap gap-2">

                                    {user.skills?.length > 0 ? (
                                        user.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            No skills added yet.
                                        </p>
                                    )}

                                </div>

                            </div>
                        )}

                    </div>

                    {/* Resume Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-7 h-fit">

                        <h2 className="text-xl font-bold">
                            Resume
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Upload your latest resume
                        </p>

                        {user.resume ? (
                            <a
                                href={`http://localhost:3000/${user.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block mt-6 text-center border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50"
                            >
                                View Resume
                            </a>
                        ) : (
                            <p className="mt-6 text-gray-500 text-sm text-center">
                                No resume uploaded
                            </p>
                        )}

                        <div className="mt-6">

                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                    setResume(e.target.files[0])
                                }
                                className="w-full text-sm"
                            />

                            <button
                                onClick={handleResumeUpload}
                                disabled={uploading}
                                className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Upload Resume"}
                            </button>

                        </div>

                        {resumeMessage && (
                            <p className="mt-4 text-sm text-center text-gray-600">
                                {resumeMessage}
                            </p>
                        )}

                        <p className="text-xs text-gray-400 mt-4">
                            PDF, DOC or DOCX • Max 5MB
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;


// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Profile() {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);

//     const [isEditing, setIsEditing] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         skills: []
//     });

//     const [resume, setResume] = useState(null);
//     const [resumeMessage, setResumeMessage] = useState("");


//     useEffect(() => {
//         getProfile();
//     }, []);

//     const getProfile = async () => {
//         try {
//             const response = await api.get("/user/profile");
//             setUser(response.data.user);
//         } catch (error) {
//             setError(
//                 error.response?.data?.message || "Something went wrong"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = () => {
//         setFormData({
//             name: user.name,
//             email: user.email,
//             skills: user.skills || []
//         });

//         setIsEditing(true);
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSave = async () => {
//         try {

//             const response = await api.put("/user/profile", formData);

//             setUser(response.data.user);
//             setIsEditing(false);

//         } catch (error) {
//             setError(
//                 error.response?.data?.message || "Something went wrong"
//             )
//         }
//     }

//     const handleResumeUpload = async () => {
//         if (!resume) {
//             setResumeMessage("Please select a resume");
//             return;
//         }

//         const data = new FormData();
//         data.append("resume", resume);

//         try {
//             const response = await api.patch("/user/resume", data);

//             setResumeMessage(response.data.message);
//         } catch (error) {
//             setResumeMessage(
//                 error.response?.data?.message || "Resume upload failed"
//             );
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div>
//             <h1>Profile</h1>

//             {!isEditing ? (
//                 <>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     <p>Role: {user.role}</p>

//                     <h3>Skills</h3>

//                     {user.skills?.map((skill) => (
//                         <p key={skill}>{skill}</p>
//                     ))}

//                     <button onClick={handleEdit}>
//                         Edit Profile
//                     </button>
//                 </>
//             ) : (
//                 <div>
//                     <h2>Edit Profile</h2>

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Name"
//                     />

//                     <br /><br />

//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                     />

//                     <br /><br />

//                     <input
//                         type="text"
//                         name="skills"
//                         value={formData.skills.join(", ")}
//                         onChange={(e) =>
//                             setFormData({
//                                 ...formData,
//                                 skills: e.target.value
//                                     .split(",")
//                                     .map((skill) => skill.trim())
//                                     .filter((skill) => skill !== "")
//                             })
//                         }
//                         placeholder="C++, React, Node, MongoDB"
//                     />

//                     <br /><br />

//                     <h3>Resume</h3>

//                     {user.resume ? (
//                         <a
//                             href={`http://localhost:3000/${user.resume}`}
//                             target="_blank"
//                             rel="noreferrer"
//                         >
//                             View Resume
//                         </a>
//                     ) : (
//                         <p>No resume uploaded</p>
//                     )}

//                     <br />
//                     <br />

//                     <input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         onChange={(e) => setResume(e.target.files[0])}
//                     />

//                     <button onClick={handleResumeUpload}>
//                         Upload Resume
//                     </button>

//                     <p>{resumeMessage}</p>

//                     <button onClick={() => setIsEditing(false)}>
//                         Cancel
//                     </button>

//                     <button onClick={handleSave}>
//                         Save
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Profile;