import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/jobs");

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to continue to SmartHire
                    </p>

                </div>

                {/* Form Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    {message && (
                        <p className="mt-4 text-center text-red-500 text-sm">
                            {message}
                        </p>
                    )}

                    <div className="border-t border-gray-200 mt-6 pt-6 text-center">

                        <p className="text-gray-500 text-sm">
                            Don't have an account?
                        </p>

                        <Link
                            to="/signup"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Create an account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
