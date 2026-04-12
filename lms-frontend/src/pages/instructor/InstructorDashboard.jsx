import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">👨‍🏫 Instructor Dashboard</h1>
          <p className="dashboard-subtitle">Hello, {user?.name} — manage your courses below</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/instructor/create-course" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">➕</div>
              <div className="stat-card-label">Create Course</div>
              <div className="stat-card-desc">Publish a new course</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/instructor/manage-courses" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">📋</div>
              <div className="stat-card-label">Manage Courses</div>
              <div className="stat-card-desc">Edit or delete your courses</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
          <div className="col-md-4">
            <div className="dashboard-stat-card">
              <div className="stat-card-icon">📊</div>
              <div className="stat-card-label">Analytics</div>
              <div className="stat-card-desc">View enrollment stats</div>
              <div className="stat-card-arrow coming-soon-badge">Soon</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card mt-4">
          <h5 className="mb-3">💡 Tips for Great Courses</h5>
          <ul className="tips-list">
            <li>🎥 Keep lessons short and focused (5–10 min each)</li>
            <li>📝 Provide clear learning objectives at the start</li>
            <li>🧪 Include quizzes to reinforce key concepts</li>
            <li>💬 Respond to student questions within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
