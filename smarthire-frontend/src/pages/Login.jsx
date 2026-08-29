import { useState } from "react";
import api from "../services/api.js"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);

            setMessage(response.data.message);

            localStorage.setItem("token", response.data.token);
        }
        catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
};

export default Login;