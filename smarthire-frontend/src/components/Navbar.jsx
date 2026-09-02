import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>SmartHire</h2>

            <div>
                <Link to="/jobs">Jobs</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/my-applications">My Applications</Link>

            </div>
        </nav>
    );
}
export default Navbar;