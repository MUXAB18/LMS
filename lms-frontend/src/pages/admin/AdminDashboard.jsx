import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/users/analytics');
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader text="Loading analytics..." />;

  const stats = [
    { icon: '👥', label: 'Total Users', value: analytics?.totalUsers || 0, color: '#4F46E5' },
    { icon: '👨‍🎓', label: 'Students', value: analytics?.totalStudents || 0, color: '#06B6D4' },
    { icon: '👨‍🏫', label: 'Instructors', value: analytics?.totalInstructors || 0, color: '#10B981' },
    { icon: '📚', label: 'Total Courses', value: analytics?.totalCourses || 0, color: '#F59E0B' },
    { icon: '📝', label: 'Enrollments', value: analytics?.totalEnrollments || 0, color: '#EC4899' },
    { icon: '🆕', label: 'New This Week', value: analytics?.recentUsers || 0, color: '#8B5CF6' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">🛡️ Admin Dashboard</h1>
          <p className="dashboard-subtitle">Platform overview and management</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-4">
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-md-4 col-lg-2">
              <div className="analytics-card" style={{ '--accent': s.color }}>
                <div className="analytics-icon">{s.icon}</div>
                <div className="analytics-value">{s.value}</div>
                <div className="analytics-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <Link to="/admin/manage-users" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">👥</div>
              <div className="stat-card-label">Manage Users</div>
              <div className="stat-card-desc">View and delete user accounts</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/admin/manage-courses" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">📚</div>
              <div className="stat-card-label">Manage Courses</div>
              <div className="stat-card-desc">View and remove all courses</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
