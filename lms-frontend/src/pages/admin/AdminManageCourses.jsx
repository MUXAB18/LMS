import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await API.get('/courses');
      setCourses(data);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete course "${title}"?`)) return;
    try {
      await API.delete(`/courses/${id}`);
      toast.success('Course deleted');
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loader text="Loading all courses..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">📚 Manage All Courses</h1>
          <p className="dashboard-subtitle">{courses.length} total courses on platform</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="table-responsive">
          <table className="table lms-table">
            <thead>
              <tr><th>Title</th><th>Instructor</th><th>Category</th><th>Price</th><th>Students</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div className="fw-semibold">{c.title}</div>
                    <small className="text-muted">{c.lessons?.length || 0} lessons</small>
                  </td>
                  <td className="text-muted">{c.instructor?.name || '—'}</td>
                  <td><span className="badge-category">{c.category}</span></td>
                  <td>{c.price === 0 ? <span className="text-success">Free</span> : `$${c.price}`}</td>
                  <td>{c.enrollmentCount || 0}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/courses/${c._id}`} className="btn btn-sm btn-outline-primary">View</Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c._id, c.title)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted py-4">No courses yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManageCourses;
