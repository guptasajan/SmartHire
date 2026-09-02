import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import AdminApplications from "./pages/AdminApplications"
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Navigate to="/jobs" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;