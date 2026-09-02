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

    // useEffect(() => {
    //     getJobs();
    // }, []);
    useEffect(() => {
        getJobs({
            search: "",
            location: "",
            role: "",
            skill: ""
        });
    }, []);

    const getJobs = async () => {
        try {
            console.log("Filters:", {
                search,
                location,
                role,
                skill
            });
            const response = await api.get("/jobs", {
                params: {
                    search,
                    location,
                    role,
                    skill
                }
            });

            setJobs(response.data.jobs);
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to fetch jobs"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading jobs...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Jobs</h1>

            <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />

            <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
            />

            <button onClick={getJobs}>
                Search
            </button>

            {jobs.length === 0 ? (
                <p>No jobs available</p>
            ) : (
                jobs.map((job) => (
                    <div key={job._id}>
                        <h2>{job.title}</h2>

                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Role: {job.role}</p>

                        <p>
                            Skills: {job.skills?.join(", ")}
                        </p>

                        <p>
                            Salary: ₹{job.salary?.min} - ₹
                            {job.salary?.max}
                        </p>

                        <Link to={`/jobs/${job._id}`}>
                            View Details
                        </Link>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Jobs;