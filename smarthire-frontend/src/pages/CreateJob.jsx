import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CreateJob() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        role: "",
        skills: "",
        eligibility: "",
        applyLink: "",
        description: "",
        minSalary: "",
        maxSalary: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const jobData = {
                title: formData.title,
                company: formData.company,
                location: formData.location,
                role: formData.role,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== ""),
                eligibility: formData.eligibility,
                applyLink: formData.applyLink,
                description: formData.description,
                salary: {
                    min: Number(formData.minSalary),
                    max: Number(formData.maxSalary),
                    currency: "INR"
                }
            };

            const response = await api.post("/jobs", jobData);

            setMessage(
                response.data.message ||
                "Job created successfully"
            );

            setFormData({
                title: "",
                company: "",
                location: "",
                role: "",
                skills: "",
                eligibility: "",
                applyLink: "",
                description: "",
                minSalary: "",
                maxSalary: ""
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to create job"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-6">

            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">

                    <Link
                        to="/admin/jobs"
                        className="text-blue-600 hover:underline"
                    >
                        ← Back to Jobs
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mt-5">
                        Create New Job
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Add a new opportunity to SmartHire
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Basic Information */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="label">
                                        Job Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Software Engineer"
                                        required
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Company
                                    </label>

                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Google"
                                        required
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Delhi / Remote"
                                        required
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        placeholder="SDE"
                                        required
                                        className="input"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="label">
                                Skills
                            </label>

                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Node.js, MongoDB"
                                required
                                className="input"
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Separate skills using commas
                            </p>
                        </div>

                        {/* Salary */}
                        <div>

                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Compensation
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="label">
                                        Minimum Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="minSalary"
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        placeholder="500000"
                                        required
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        Maximum Salary
                                    </label>

                                    <input
                                        type="number"
                                        name="maxSalary"
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        placeholder="1000000"
                                        required
                                        className="input"
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Eligibility */}
                        <div>

                            <label className="label">
                                Eligibility
                            </label>

                            <input
                                type="text"
                                name="eligibility"
                                value={formData.eligibility}
                                onChange={handleChange}
                                placeholder="B.Tech, 7+ CGPA"
                                required
                                className="input"
                            />

                        </div>

                        {/* Apply Link */}
                        <div>

                            <label className="label">
                                Application Link
                            </label>

                            <input
                                type="url"
                                name="applyLink"
                                value={formData.applyLink}
                                onChange={handleChange}
                                placeholder="https://company.com/apply"
                                className="input"
                            />

                        </div>

                        {/* Description */}
                        <div>

                            <label className="label">
                                Job Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities and requirements..."
                                rows="6"
                                required
                                className="input resize-none"
                            />

                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t border-gray-200">

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition"
                            >
                                {loading
                                    ? "Creating Job..."
                                    : "Create Job"}
                            </button>

                        </div>

                    </form>

                    {message && (
                        <p className="mt-5 text-center text-sm text-gray-600">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default CreateJob;


// import { useState } from "react";
// import api from "../services/api";

// function CreateJob() {
//     const [formData, setFormData] = useState({
//         title: "",
//         company: "",
//         location: "",
//         role: "",
//         skills: "",
//         eligibility: "",
//         applyLink: "",
//         description: "",
//         minSalary: "",
//         maxSalary: ""
//     });

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const jobData = {
//                 title: formData.title,
//                 company: formData.company,
//                 location: formData.location,
//                 role: formData.role,
//                 skills: formData.skills
//                     .split(",")
//                     .map((skill) => skill.trim()),
//                 eligibility: formData.eligibility,
//                 applyLink: formData.applyLink,
//                 description: formData.description,
//                 salary: {
//                     min: Number(formData.minSalary),
//                     max: Number(formData.maxSalary),
//                     currency: "INR"
//                 }
//             };

//             const response = await api.post("/jobs", jobData);

//             setMessage(response.data.message || "Job created successfully");

//             setFormData({
//                 title: "",
//                 company: "",
//                 location: "",
//                 role: "",
//                 skills: "",
//                 eligibility: "",
//                 applyLink: "",
//                 description: "",
//                 minSalary: "",
//                 maxSalary: ""
//             });
//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message ||
//                 "Failed to create job"
//             );
//         }
//     };

//     return (
//         <div>
//             <h1>Create Job</h1>

//             <form onSubmit={handleSubmit}>
//                 <input
//                     name="title"
//                     placeholder="Job Title"
//                     value={formData.title}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="company"
//                     placeholder="Company"
//                     value={formData.company}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="location"
//                     placeholder="Location"
//                     value={formData.location}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="role"
//                     placeholder="Role"
//                     value={formData.role}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="skills"
//                     placeholder="React, Node, MongoDB"
//                     value={formData.skills}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="eligibility"
//                     placeholder="Eligibility"
//                     value={formData.eligibility}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="applyLink"
//                     placeholder="Apply Link"
//                     value={formData.applyLink}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="minSalary"
//                     type="number"
//                     placeholder="Minimum Salary"
//                     value={formData.minSalary}
//                     onChange={handleChange}
//                 />

//                 <input
//                     name="maxSalary"
//                     type="number"
//                     placeholder="Maximum Salary"
//                     value={formData.maxSalary}
//                     onChange={handleChange}
//                 />

//                 <textarea
//                     name="description"
//                     placeholder="Job Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                 />

//                 <button type="submit">
//                     Create Job
//                 </button>
//             </form>

//             <p>{message}</p>
//         </div>
//     );
// }

// export default CreateJob;