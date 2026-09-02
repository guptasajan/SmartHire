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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Profile</h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <h3>Skills</h3>

            {user.skills?.map((skill) => (
                <p key={skill}>{skill}</p>
            ))}
        </div>
    );
}

export default Profile;