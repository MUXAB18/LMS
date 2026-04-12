import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const stats = [
    { value: '10,000+', label: 'Students Enrolled', icon: '👨‍🎓' },
    { value: '500+', label: 'Expert Courses', icon: '📚' },
    { value: '200+', label: 'Top Instructors', icon: '👨‍🏫' },
    { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
  ];

  const features = [
    { icon: '🎯', title: 'Learn at Your Pace', desc: 'Access course material anytime, anywhere, on any device.' },
    { icon: '🏆', title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience.' },
    { icon: '🔒', title: 'Lifetime Access', desc: 'Once enrolled, get lifetime access to all course materials.' },
    { icon: '💬', title: 'Community Support', desc: 'Join thousands of learners and collaborate in discussions.' },
    { icon: '📜', title: 'Certificates', desc: 'Earn certificates to showcase your skills to employers.' },
    { icon: '🔄', title: 'Updated Content', desc: 'Courses constantly updated to reflect latest industry trends.' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="container hero-content">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <span className="hero-badge">🚀 #1 Online Learning Platform</span>
              <h1 className="hero-title">
                Learn Without <span className="text-gradient">Limits</span>
              </h1>
              <p className="hero-subtitle">
                Access world-class courses taught by expert instructors. Build real skills,
                earn certificates, and advance your career — all at your own pace.
              </p>
              <div className="hero-actions">
                <Link to="/courses" className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-play-circle me-2"></i>Explore Courses
                </Link>
                {!user && (
                  <Link to="/register" className="btn btn-outline-light btn-lg">
                    Get Started Free
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block text-center">
              <div className="hero-illustration">
                <div className="floating-card card-1">📊 Data Science</div>
                <div className="floating-card card-2">💻 Web Dev</div>
                <div className="floating-card card-3">🎨 UI Design</div>
                <div className="hero-emoji">🎓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Why Choose <span className="text-gradient">LearnHub?</span></h2>
            <p className="section-subtitle">Everything you need to start learning today</p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h5 className="feature-title">{f.title}</h5>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-subtitle">Join 10,000+ students already learning on LearnHub</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg me-3">Start Learning Free</Link>
            <Link to="/courses" className="btn btn-outline-light btn-lg">Browse Courses</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
