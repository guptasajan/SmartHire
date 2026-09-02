import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/jobs"
                    className="text-2xl font-bold text-blue-600"
                >
                    SmartHire
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/jobs"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        Jobs
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/my-applications"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                My Applications
                            </Link>

                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Profile
                            </Link>

                            {/* Admin Links */}
                            {user?.role === "admin" && (
                                <>
                                    <Link
                                        to="/admin/dashboard"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/admin/jobs"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Manage Jobs
                                    </Link>

                                    <Link
                                        to="/admin/applications"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Applications
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Signup
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;

