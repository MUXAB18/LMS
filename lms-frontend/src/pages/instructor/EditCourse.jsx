import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';
import Loader from '../../components/Loader';

const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Other'];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    title: '', description: '', category: 'Web Development', price: '', thumbnail: '',
  });
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setForm({
          title: data.title || '',
          description: data.description || '',
          category: data.category || 'Web Development',
          price: data.price || 0,
          thumbnail: data.thumbnail || '',
        });
        setLessons(data.lessons || []);
      } catch (err) {
        toast.error('Failed to load course details');
        navigate('/instructor/manage-courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLessonChange = (i, e) => {
    const updated = [...lessons];
    updated[i][e.target.name] = e.target.value;
    setLessons(updated);
  };

  const addLesson = () => setLessons([...lessons, { title: '', content: '', duration: '' }]);
  const removeLesson = (i) => setLessons(lessons.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Because we removed ownership constraints on the backend, ANY instructor can update ANY course.
      await API.put(`/courses/${id}`, {
        ...form, price: Number(form.price),
        lessons: lessons // Update entire lessons array at once in PUT since Mongo supports subdoc array replacement
      });
      toast.success('Course updated successfully!');
      navigate('/instructor/manage-courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading course info..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">✏️ Edit Course</h1>
          <p className="dashboard-subtitle">Update course details and curriculum</p>
        </div>
      </div>
      <div className="container py-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="dashboard-card">
                <h5 className="mb-4">Course Information</h5>
                <div className="mb-3">
                  <label className="form-label">Course Title *</label>
                  <input name="title" className="form-control" placeholder="e.g. Complete React.js Bootcamp"
                    value={form.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea name="description" className="form-control" rows="4"
                    placeholder="Describe what students will learn..."
                    value={form.description} onChange={handleChange} required />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Category *</label>
                    <select name="category" className="form-select" value={form.category} onChange={handleChange}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price (USD) *</label>
                    <input name="price" type="number" min="0" className="form-control"
                      placeholder="0 for free" value={form.price} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label">Thumbnail URL (optional)</label>
                  <input name="thumbnail" className="form-control" placeholder="https://..."
                    value={form.thumbnail} onChange={handleChange} />
                </div>
              </div>

              {/* Lessons */}
              <div className="dashboard-card mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">📋 Lessons</h5>
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={addLesson}>
                    <i className="bi bi-plus me-1"></i>Add Lesson
                  </button>
                </div>
                {lessons.map((lesson, i) => (
                  <div key={i} className="lesson-editor mb-3">
                    <div className="lesson-editor-header">
                      <span>Lesson {i + 1}</span>
                      <button type="button" className="btn-remove-lesson" onClick={() => removeLesson(i)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-8">
                        <input name="title" className="form-control form-control-sm"
                          placeholder="Lesson title" value={lesson.title || ''} onChange={(e) => handleLessonChange(i, e)} required />
                      </div>
                      <div className="col-md-4">
                        <input name="duration" type="number" className="form-control form-control-sm"
                          placeholder="Duration (min)" value={lesson.duration || ''} onChange={(e) => handleLessonChange(i, e)} />
                      </div>
                      <div className="col-12">
                        <textarea name="content" className="form-control form-control-sm" rows="2"
                          placeholder="Lesson content / notes..."
                          value={lesson.content || ''} onChange={(e) => handleLessonChange(i, e)} />
                      </div>
                    </div>
                  </div>
                ))}
                {lessons.length === 0 && <p className="text-muted small">No lessons yet. Add some to build the curriculum.</p>}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="dashboard-card sticky-top">
                <h6 className="mb-3">Save Changes</h6>
                <p className="text-muted small">Update it across all enrolled students.</p>
                <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : '💾 Save Course'}
                </button>
                <button type="button" className="btn btn-outline-secondary w-100 mt-2"
                  onClick={() => navigate('/instructor/manage-courses')}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
