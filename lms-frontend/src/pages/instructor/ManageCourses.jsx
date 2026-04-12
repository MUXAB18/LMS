import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await API.get('/courses/instructor/my-courses');
      setCourses(data);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await API.delete(`/courses/${id}`);
      toast.success('Course deleted');
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loader text="Loading your courses..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1 className="dashboard-title">📋 My Courses</h1>
            <p className="dashboard-subtitle">{courses.length} course{courses.length !== 1 ? 's' : ''} created</p>
          </div>
          <Link to="/instructor/create-course" className="btn btn-primary">
            <i className="bi bi-plus me-1"></i>New Course
          </Link>
        </div>
      </div>
      <div className="container py-4">
        {courses.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="fs-1">📭</div>
            <h4 className="mt-3">No courses yet</h4>
            <Link to="/instructor/create-course" className="btn btn-primary mt-2">Create Your First Course</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table lms-table">
              <thead>
                <tr>
                  <th>Course</th><th>Category</th><th>Price</th><th>Students</th><th>Actions</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <div className="d-flex align-items-center gap-3 py-2">
                        <div className="user-avatar-sm flex-shrink-0" style={{width:'40px', height:'40px'}}>
                          <i className="bi bi-book"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-primary mb-1">{c.title}</div>
                          <small className="text-muted d-flex align-items-center">
                            <i className="bi bi-journal-text me-1"></i>
                            {c.lessons?.length || 0} lessons
                          </small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-category px-3 py-2">{c.category}</span></td>
                    <td className="fw-semibold">{c.price === 0 ? <span className="text-success">Free</span> : `$${c.price}`}</td>
                    <td><span className="badge bg-secondary rounded-pill px-3">{c.enrollmentCount || 0}</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/courses/${c._id}`} className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link to={`/instructor/edit-course/${c._id}`} className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c._id, c.title)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
