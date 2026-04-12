import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedPage from '../components/AnimatedPage';

// Public pages
import Home from '../pages/Home';
import About from '../pages/About';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Student pages
import StudentDashboard from '../pages/student/StudentDashboard';
import MyCourses from '../pages/student/MyCourses';

// Instructor pages
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import CreateCourse from '../pages/instructor/CreateCourse';
import ManageCourses from '../pages/instructor/ManageCourses';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminManageCourses from '../pages/admin/AdminManageCourses';
import EditCourse from '../pages/instructor/EditCourse';

const AppRoutes = () => (
  <AnimatedPage>
    <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:id" element={<CourseDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Student */}
    <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
    <Route path="/student/my-courses" element={<ProtectedRoute role="student"><MyCourses /></ProtectedRoute>} />

    {/* Instructor */}
    <Route path="/instructor/dashboard" element={<ProtectedRoute role={['instructor','admin']}><InstructorDashboard /></ProtectedRoute>} />
    <Route path="/instructor/create-course" element={<ProtectedRoute role={['instructor','admin']}><CreateCourse /></ProtectedRoute>} />
    <Route path="/instructor/manage-courses" element={<ProtectedRoute role={['instructor','admin']}><ManageCourses /></ProtectedRoute>} />
    <Route path="/instructor/edit-course/:id" element={<ProtectedRoute role={['instructor','admin']}><EditCourse /></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/manage-users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
    <Route path="/admin/manage-courses" element={<ProtectedRoute role="admin"><AdminManageCourses /></ProtectedRoute>} />

    {/* 404 */}
    <Route path="*" element={
      <div className="text-center py-5 mt-5">
        <div style={{fontSize:'5rem'}}>🔍</div>
        <h2>404 — Page Not Found</h2>
        <a href="/" className="btn btn-primary mt-3">Go Home</a>
      </div>
    } />
    </Routes>
  </AnimatedPage>
);

export default AppRoutes;
