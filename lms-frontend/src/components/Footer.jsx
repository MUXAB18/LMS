import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer mt-auto">
    <div className="container">
      <div className="row g-4 py-5">
        <div className="col-md-4">
          <h5 className="footer-brand">🎓 LearnHub</h5>
          <p className="text-muted small mt-2">
            Empowering learners worldwide with quality education. Learn at your own pace.
          </p>
        </div>
        <div className="col-md-2">
          <h6 className="footer-heading">Platform</h6>
          <ul className="list-unstyled footer-links">
            <li><Link to="/courses">Browse Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div className="col-md-2">
          <h6 className="footer-heading">Account</h6>
          <ul className="list-unstyled footer-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="footer-heading">Newsletter</h6>
          <div className="input-group mt-2">
            <input type="email" className="form-control form-control-sm" placeholder="Your email" />
            <button className="btn btn-primary btn-sm">Subscribe</button>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="text-center text-muted small py-3 mb-0">
        © 2025 LearnHub. Built with ❤️ By MUSAB IFTIKHAR | [MUSABIFTIKHAR44@GMAIL.COM].
      </p>
    </div>
  </footer>
);

export default Footer;
