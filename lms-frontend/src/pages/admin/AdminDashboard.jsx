import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import DashboardCharts from '../../components/admin/DashboardCharts';
import AnimatedPage from '../../components/AnimatedPage';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get('/users/analytics');
        setData(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <Loader text="Analyzing platform data..." />;

  const { summary, enrollmentTrends, categoryStats, popularCourses, recentEnrollments } = data || {};

  const stats = [
    { icon: '💰', label: 'Total Revenue', value: `$${summary?.totalRevenue?.toLocaleString() || 0}`, color: '#10B981', desc: 'Total sales from courses' },
    { icon: '👥', label: 'Total Users', value: summary?.totalUsers || 0, color: '#4F46E5', desc: 'Students & Instructors' },
    { icon: '📚', label: 'Total Courses', value: summary?.totalCourses || 0, color: '#F59E0B', desc: 'Published & Drafts' },
    { icon: '📝', label: 'Enrollments', value: summary?.totalEnrollments || 0, color: '#EC4899', desc: 'Active student signups' },
  ];

  return (
    <AnimatedPage>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div className="container">
            <h1 className="dashboard-title">🛡️ Admin Analytics</h1>
            <p className="dashboard-subtitle">Platform performance and business metrics</p>
          </div>
        </div>

        <div className="container py-4">
          {/* Main Stat Cards */}
          <div className="row g-4">
            {stats.map((s, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="analytics-card" style={{ '--accent': s.color }}>
                  <div className="analytics-icon">{s.icon}</div>
                  <div className="analytics-value">{s.value}</div>
                  <div className="analytics-label">{s.label}</div>
                  <div className="stat-card-desc mt-1 opacity-75">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <DashboardCharts 
            trends={enrollmentTrends} 
            categories={categoryStats} 
            popular={popularCourses} 
          />

          <div className="row g-4 mt-2">
            {/* Recent Activity Table */}
            <div className="col-lg-8">
              <div className="table-container">
                <div className="recent-activity-header">
                  <h3 className="recent-activity-title">🕒 Recent Enrollments</h3>
                  <Link to="/admin/manage-courses" className="btn btn-sm btn-outline-primary">View All</Link>
                </div>
                <div className="table-responsive">
                  <table className="table lms-table m-0">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Price</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnrollments?.length > 0 ? (
                        recentEnrollments.map((en) => (
                          <tr key={en._id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div className="user-avatar-sm">
                                  {en.student?.name?.charAt(0) || '?'}
                                </div>
                                <div>
                                  <div className="fw-bold fs-7">{en.student?.name || 'Unknown'}</div>
                                  <div className="text-secondary small">{en.student?.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="fw-medium fs-7">{en.course?.title || 'Course Deleted'}</div>
                            </td>
                            <td>
                              <span className="text-accent fw-bold">${en.course?.price || 0}</span>
                            </td>
                            <td>
                              <div className="text-secondary small">
                                {new Date(en.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-secondary">
                            No recent enrollments found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-lg-4">
              <div className="chart-container">
                <h3 className="chart-title">⚡ Quick Management</h3>
                <div className="d-grid gap-3 mt-3">
                  <Link to="/admin/manage-users" className="dashboard-stat-card text-decoration-none">
                    <div className="stat-card-icon">👥</div>
                    <div className="stat-card-label">Users</div>
                    <div className="stat-card-desc">Review and manage accounts</div>
                    <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
                  </Link>
                  <Link to="/admin/manage-courses" className="dashboard-stat-card text-decoration-none">
                    <div className="stat-card-icon">📚</div>
                    <div className="stat-card-label">Courses</div>
                    <div className="stat-card-desc">Audit platform content</div>
                    <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AdminDashboard;
