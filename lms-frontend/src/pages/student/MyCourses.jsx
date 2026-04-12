import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/enroll/my-courses');
        setEnrollments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader text="Loading your courses..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">📚 My Enrolled Courses</h1>
          <p className="dashboard-subtitle">{enrollments.length} course{enrollments.length !== 1 ? 's' : ''} enrolled</p>
        </div>
      </div>
      <div className="container py-4">
        {enrollments.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="fs-1">📭</div>
            <h4 className="mt-3">No courses yet</h4>
            <p className="text-muted">Start your journey by enrolling in a course</p>
            <Link to="/courses" className="btn btn-primary mt-2">Browse Courses</Link>
          </div>
        ) : (
          <div className="row g-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment._id} className="col-md-6 col-lg-4">
                <div className="my-course-card">
                  <div className="my-course-header">
                    <span className="course-category-badge">{enrollment.course?.category}</span>
                    <h6 className="my-course-title">{enrollment.course?.title}</h6>
                    <small className="text-muted">
                      <i className="bi bi-person me-1"></i>{enrollment.course?.instructor?.name}
                    </small>
                  </div>
                  <div className="my-course-progress">
                    <div className="d-flex justify-content-between mb-1">
                      <small>Progress</small>
                      <small>{enrollment.progress}%</small>
                    </div>
                    <div className="progress progress-lms">
                      <div
                        className="progress-bar"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    {enrollment.isCompleted && (
                      <span className="badge bg-success mt-2">✅ Completed</span>
                    )}
                  </div>
                  <Link to={`/courses/${enrollment.course?._id}`} className="btn btn-sm btn-outline-primary w-100 mt-3">
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
