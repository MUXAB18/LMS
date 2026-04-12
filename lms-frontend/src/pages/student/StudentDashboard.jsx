import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">👋 Welcome back, {user?.name}!</h1>
          <p className="dashboard-subtitle">Continue your learning journey</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/student/my-courses" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">📚</div>
              <div className="stat-card-label">My Courses</div>
              <div className="stat-card-desc">Continue where you left off</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/courses" className="dashboard-stat-card text-decoration-none">
              <div className="stat-card-icon">🔍</div>
              <div className="stat-card-label">Browse Courses</div>
              <div className="stat-card-desc">Discover new skills to learn</div>
              <div className="stat-card-arrow"><i className="bi bi-arrow-right"></i></div>
            </Link>
          </div>
          <div className="col-md-4">
            <div className="dashboard-stat-card">
              <div className="stat-card-icon">🏆</div>
              <div className="stat-card-label">Achievements</div>
              <div className="stat-card-desc">Track your progress & badges</div>
              <div className="stat-card-arrow coming-soon-badge">Soon</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card mt-4">
          <h5 className="mb-3">📋 Quick Tips for Students</h5>
          <ul className="tips-list">
            <li>🎯 Set a daily learning goal (e.g., 30 minutes/day)</li>
            <li>📝 Take notes while watching lessons</li>
            <li>🔄 Review previous lessons to reinforce learning</li>
            <li>💬 Engage with course material actively</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
