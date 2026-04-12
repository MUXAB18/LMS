import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    const result = await register(form.name, form.email, form.password, form.role);
    if (result.success) {
      toast.success('Account created! Welcome to LearnHub 🎉');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: 'var(--bg-dark)' }}>
      
      {/* LEFT SIDE - Ultra Clean Register Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 position-relative">
        <div className="position-absolute top-0 start-0 p-4">
          <Link to="/" className="btn btn-outline-secondary btn-sm border-0 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>

        <div className="w-100 mt-4" style={{ maxWidth: '440px' }}>
          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bolder mb-2" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', fontSize: '2.5rem' }}>Join LearnHub</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Create your account and jumpstart your career.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <div className="input-group-custom">
                <i className="bi bi-person input-icon text-muted"></i>
                <input
                  type="text"
                  name="name"
                  className="form-control custom-input fs-6 shadow-none"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
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

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group-custom">
                <i className="bi bi-lock input-icon text-muted"></i>
                <input
                  type="password"
                  name="password"
                  className="form-control custom-input fs-6 shadow-none"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label mb-3">I want to join as a:</label>
              <div className="d-flex gap-3">
                {[
                  { val: 'student', label: 'Student', icon: '👨‍🎓' },
                  { val: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
                ].map((r) => (
                  <div
                    key={r.val}
                    className={`role-option w-100 ${form.role === r.val ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, role: r.val })}
                  >
                    <span className="role-icon mb-0 me-1" style={{ fontSize: '1.25rem' }}>{r.icon}</span>
                    <div className="role-label m-0 p-0 text-center flex-grow-1">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-accent w-100 d-flex justify-content-center align-items-center gap-2" 
              style={{ height: '54px', fontSize: '1.05rem', marginTop: '1.5rem' }}
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm"></span> Creating account...</>
              ) : (
                <>Sign Up Now <i className="bi bi-arrow-right"></i></>
              )}
            </button>
          </form>

          <p className="text-center fw-medium mt-4" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none fw-bold" style={{ color: 'var(--primary-light)' }}>
              Sign in instead
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Deep Royal Purple/Indigo Branding */}
      <div 
        className="col-lg-6 d-none d-lg-flex position-relative align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, var(--primary-dark), #9333ea)',
          overflow: 'hidden'
        }}
      >
        {/* Animated Abstract Orbs */}
        <div className="position-absolute rounded-circle shadow-lg" style={{ width: '600px', height: '600px', background: 'rgba(255,255,255,0.05)', top: '10%', right: '-15%', filter: 'blur(80px)', animation: 'float 10s infinite' }}></div>
        <div className="position-absolute rounded-circle shadow-lg" style={{ width: '400px', height: '400px', background: 'rgba(255,255,255,0.1)', bottom: '15%', left: '-10%', filter: 'blur(60px)', animation: 'float 7s infinite reverse' }}></div>
        
        {/* Content Overlay */}
        <div className="position-relative z-1 text-center px-5 d-flex flex-column align-items-center">
          <div className="mb-4" style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>🌍</div>
          <h1 className="fw-bolder display-4 text-white mb-3" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            The Future of <br /> Learning is Here.
          </h1>
          <p className="lead text-white opacity-75 mx-auto" style={{ maxWidth: '420px', fontWeight: '400' }}>
            Join a global network of ambitious individuals. Whether you want to master a new skill or empower others, your journey starts today.
          </p>
          
          <div className="mt-5 d-flex gap-3 flex-wrap justify-content-center">
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-4 py-2 backdrop-blur border border-white border-opacity-10">
              <span className="text-white fw-medium">🚀 50k+ Video Lessons</span>
            </div>
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-4 py-2 backdrop-blur border border-white border-opacity-10">
              <span className="text-white fw-medium">🎖️ Industry Certifications</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
