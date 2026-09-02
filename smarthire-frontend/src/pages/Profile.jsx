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


    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await api.get("/user/profile");
            setUser(response.data.user);
        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong"
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

            const response = await api.put("/user/profile", formData);

            setUser(response.data.user);
            setIsEditing(false);

        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }

    const handleResumeUpload = async () => {
        if (!resume) {
            setResumeMessage("Please select a resume");
            return;
        }

        const data = new FormData();
        data.append("resume", resume);

        try {
            const response = await api.patch("/user/resume", data);

            setResumeMessage(response.data.message);
        } catch (error) {
            setResumeMessage(
                error.response?.data?.message || "Resume upload failed"
            );
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Profile</h1>

            {!isEditing ? (
                <>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>

                    <h3>Skills</h3>

                    {user.skills?.map((skill) => (
                        <p key={skill}>{skill}</p>
                    ))}

                    <button onClick={handleEdit}>
                        Edit Profile
                    </button>
                </>
            ) : (
                <div>
                    <h2>Edit Profile</h2>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />

                    <br /><br />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <br /><br />

                    <input
                        type="text"
                        name="skills"
                        value={formData.skills.join(", ")}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                skills: e.target.value
                                    .split(",")
                                    .map((skill) => skill.trim())
                                    .filter((skill) => skill !== "")
                            })
                        }
                        placeholder="C++, React, Node, MongoDB"
                    />

                    <br /><br />

                    <h3>Resume</h3>

                    {user.resume ? (
                        <a
                            href={`http://localhost:3000/${user.resume}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Resume
                        </a>
                    ) : (
                        <p>No resume uploaded</p>
                    )}

                    <br />
                    <br />

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResume(e.target.files[0])}
                    />

                    <button onClick={handleResumeUpload}>
                        Upload Resume
                    </button>

                    <p>{resumeMessage}</p>

                    <button onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>

                    <button onClick={handleSave}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;