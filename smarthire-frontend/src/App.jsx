import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";

import AdminApplications from "./pages/AdminApplications";
import AdminDashboard from "./pages/AdminDashboard";
import CreateJob from "./pages/CreateJob";
import AdminJobs from "./pages/AdminJobs";
import EditJob from "./pages/EditJob";

import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <h1 className="text-4xl font-bold text-blue-600 text-center mt-10">
//       SmartHire
//     </h1>
//   );
// }

// export default App;


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/jobs" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />


        {/* Protected User Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />


        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute adminOnly>
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-job"
          element={
            <ProtectedRoute adminOnly>
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-job/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute adminOnly>
              <AdminApplications />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Jobs from "./pages/Jobs";
// import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
// import JobDetails from "./pages/JobDetails";
// import MyApplications from "./pages/MyApplications";
// import AdminApplications from "./pages/AdminApplications"
// import AdminDashboard from "./pages/AdminDashboard";
// import CreateJob from "./pages/CreateJob";
// import AdminJobs from "./pages/AdminJobs";
// import EditJob from "./pages/EditJob";
// import ProtectedRoute from "./components/ProtectedRoute";



// function App() {
//   return (
//     <BrowserRouter>

//       <Navbar />

//       <Routes>

//         <Route path="/" element={<Navigate to="/jobs" replace />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/jobs/:id" element={<JobDetails />} />

//         <Route path="/profile" element={<Profile />} />
//         <Route path="/my-applications" element={<MyApplications />} />
//         <Route path="/admin/applications" element={<AdminApplications />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route
//           path="/admin/create-job"
//           element={<CreateJob />}
//         />
//         <Route
//           path="/admin/jobs"
//           element={<AdminJobs />}
//         />
//         <Route
//           path="/admin/edit-job/:id"
//           element={<EditJob />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;