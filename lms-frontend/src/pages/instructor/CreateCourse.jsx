import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';

const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Other'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: 'Web Development', price: '', thumbnail: '',
  });
  const [lessons, setLessons] = useState([{ title: '', content: '', duration: '' }]);

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
    setLoading(true);
    try {
      const { data: course } = await API.post('/courses', {
        ...form, price: Number(form.price),
      });
      // Add lessons one by one
      for (const lesson of lessons.filter((l) => l.title.trim())) {
        await API.post(`/courses/${course._id}/lessons`, {
          ...lesson, duration: Number(lesson.duration) || 0,
        });
      }
      toast.success('🎉 Course created successfully!');
      navigate('/instructor/manage-courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">➕ Create New Course</h1>
          <p className="dashboard-subtitle">Fill in the details to publish your course</p>
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
                      {lessons.length > 1 && (
                        <button type="button" className="btn-remove-lesson" onClick={() => removeLesson(i)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                    <div className="row g-2">
                      <div className="col-md-8">
                        <input name="title" className="form-control form-control-sm"
                          placeholder="Lesson title" value={lesson.title} onChange={(e) => handleLessonChange(i, e)} />
                      </div>
                      <div className="col-md-4">
                        <input name="duration" type="number" className="form-control form-control-sm"
                          placeholder="Duration (min)" value={lesson.duration} onChange={(e) => handleLessonChange(i, e)} />
                      </div>
                      <div className="col-12">
                        <textarea name="content" className="form-control form-control-sm" rows="2"
                          placeholder="Lesson content / notes..."
                          value={lesson.content} onChange={(e) => handleLessonChange(i, e)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="dashboard-card sticky-top">
                <h6 className="mb-3">Publish Course</h6>
                <p className="text-muted small">Ready to share your knowledge with the world?</p>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Publishing...</> : '🚀 Publish Course'}
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

export default CreateCourse;
