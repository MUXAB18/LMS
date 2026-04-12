import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: 'var(--bg-dark)' }}>
      {/* LEFT SIDE - Vibrant Branding Showcase (Hidden on Mobile) */}
      <div 
        className="col-lg-6 d-none d-lg-flex position-relative align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--accent))',
          overflow: 'hidden'
        }}
      >
        {/* Animated Abstract Orbs */}
        <div className="position-absolute rounded-circle shadow-lg" style={{ width: '500px', height: '500px', background: 'rgba(255,255,255,0.1)', top: '-15%', left: '-15%', filter: 'blur(60px)', animation: 'float 8s infinite' }}></div>
        <div className="position-absolute rounded-circle shadow-lg" style={{ width: '400px', height: '400px', background: 'rgba(255,255,255,0.15)', bottom: '-5%', right: '-10%', filter: 'blur(70px)', animation: 'float 6s infinite reverse' }}></div>
        
        {/* Content Overlay */}
        <div className="position-relative z-1 text-center px-5 d-flex flex-column align-items-center">
          <div className="mb-4" style={{ fontSize: '5rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}>🚀</div>
          <h1 className="fw-bolder display-4 text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
            Welcome Back to <br /> LearnHub.
          </h1>
          <p className="lead text-white opacity-75 mx-auto" style={{ maxWidth: '400px', fontWeight: '400' }}>
            Unlock your full potential. Access hundreds of premium courses and accelerate your career today.
          </p>
          
          <div className="mt-5 d-flex gap-3">
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-4 py-2 backdrop-blur">
              <i className="bi bi-star-fill text-warning"></i>
              <span className="text-white fw-medium">4.9/5 Student Rating</span>
            </div>
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-4 py-2 backdrop-blur">
              <i className="bi bi-people-fill text-info"></i>
              <span className="text-white fw-medium">10k+ Alumni</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Ultra Clean Login Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 position-relative">
        {/* Decorative absolute element */}
        <div className="position-absolute top-0 end-0 p-4">
          <Link to="/" className="btn btn-outline-secondary btn-sm border-0 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bi bi-x-lg"></i>
          </Link>
        </div>

        <div className="w-100" style={{ maxWidth: '420px' }}>
          {/* Header */}
          <div className="text-center mb-5">
            <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4">
              <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10" style={{ width: '48px', height: '48px' }}>
                <span className="fs-3">🎓</span>
              </div>
              <span className="fs-3 fw-bolder text-gradient">LearnHub</span>
            </Link>
            <h2 className="fw-bolder mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Sign In to your account</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Please enter your details.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label className="form-label d-flex justify-content-between">
                <span>Email Address</span>
              </label>
              <div className="input-group-custom">
                <i className="bi bi-envelope input-icon text-muted"></i>
                <input
                  type="email"
                  name="email"
                  className="form-control custom-input fs-6 shadow-none"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label d-flex justify-content-between">
                <span>Password</span>
                <a href="#" className="text-decoration-none fw-semibold" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Forgot password?</a>
              </label>
              <div className="input-group-custom">
                <i className="bi bi-lock input-icon text-muted"></i>
                <input
                  type="password"
                  name="password"
                  className="form-control custom-input fs-6 shadow-none"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-accent w-100 d-flex justify-content-center align-items-center gap-2" 
              style={{ height: '54px', fontSize: '1.05rem', marginTop: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm"></span> Authenticating...</>
              ) : (
                <>Sign In <i className="bi bi-arrow-right"></i></>
              )}
            </button>
          </form>

          {/* Admin Credentials Notice */}
          <div className="mt-4 p-3 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-10">
            <div className="d-flex gap-2 align-items-center mb-2">
              <span className="fs-5">🛡️</span>
              <span className="fw-bold text-primary small">Admin Portal Access</span>
            </div>
            <p className="small text-muted mb-2">
              Admins can manage all users and approve new instructor accounts. Use these credentials to test:
            </p>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between">
                <span className="small fw-medium opacity-75">Email:</span>
                <code className="small text-primary fw-bold">admin@learnhub.com</code>
              </div>
              <div className="d-flex justify-content-between">
                <span className="small fw-medium opacity-75">Password:</span>
                <code className="small text-primary fw-bold">admin123</code>
              </div>
            </div>
          </div>

          {/* Footer Divider */}
          <div className="position-relative text-center my-4">
            <hr className="text-muted opacity-25" />
            <span className="position-absolute top-50 start-50 translate-middle px-3 fw-medium" style={{ background: 'var(--bg-dark)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              OR
            </span>
          </div>

          <p className="text-center fw-medium mt-4" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none fw-bold" style={{ color: 'var(--primary-light)' }}>
              Create an account now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
