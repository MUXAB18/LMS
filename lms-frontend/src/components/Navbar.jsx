import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    const paths = {
      admin: '/admin/dashboard',
      instructor: '/instructor/dashboard',
      student: '/student/dashboard',
    };
    return paths[user.role];
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" id="mainNavbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">LearnHub</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Link to={getDashboardLink()} className="btn btn-accent btn-sm me-2">
                  <i className="bi bi-speedometer2 me-1"></i>Dashboard
                </Link>
                <div className="dropdown">
                  <button
                    className="btn btn-primary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>{user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text text-muted small">
                        Role: <strong className="text-capitalize">{user.role}</strong>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-nav btn-sm me-1">Login</Link>
                <Link to="/register" className="btn btn-accent btn-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
