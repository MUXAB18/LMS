import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/courses/${id}`);
        setCourse(data);
      } catch {
        toast.error('Course not found');
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    if (user.role !== 'student') return toast.warning('Only students can enroll in courses');
    setEnrolling(true);
    try {
      await API.post('/enroll', { courseId: id });
      toast.success('🎉 Successfully enrolled! Check your dashboard.');
      navigate('/student/my-courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loader text="Loading course details..." />;
  if (!course) return null;

  return (
    <div className="course-detail-page">
      {/* Header Banner */}
      <section className="course-detail-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <span className="hero-badge">{course.category}</span>
              <h1 className="mt-2 mb-3">{course.title}</h1>
              <p className="course-detail-desc">{course.description}</p>
              <div className="d-flex gap-4 mt-3 text-muted">
                <span><i className="bi bi-person me-1"></i>{course.instructor?.name}</span>
                <span><i className="bi bi-people me-1"></i>{course.enrollmentCount} students</span>
                <span><i className="bi bi-collection me-1"></i>{course.lessons?.length || 0} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {/* Lessons */}
          <div className="col-lg-8">
            <div className="detail-card">
              <h4 className="mb-4">📋 Course Curriculum</h4>
              {course.lessons?.length > 0 ? (
                <div className="lessons-list">
                  {course.lessons.map((lesson, i) => (
                    <div key={lesson._id || i} className="lesson-item">
                      <div className="lesson-number">{i + 1}</div>
                      <div className="lesson-info">
                        <p className="lesson-title mb-0">{lesson.title}</p>
                        {lesson.duration > 0 && (
                          <small className="text-muted">{lesson.duration} min</small>
                        )}
                      </div>
                      <i className="bi bi-play-circle text-primary"></i>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Lessons will be available soon.</p>
              )}
            </div>
          </div>

          {/* Enroll Card */}
          <div className="col-lg-4">
            <div className="enroll-card sticky-top">
              <div className="enroll-price">{course.price === 0 ? 'Free' : `$${course.price}`}</div>
              <button
                className="btn btn-primary w-100 btn-lg mb-3"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Enrolling...</>
                ) : (
                  <><i className="bi bi-play-fill me-2"></i>Enroll Now</>
                )}
              </button>
              <ul className="enroll-features list-unstyled">
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Lifetime access</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Learn at your own pace</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>{course.lessons?.length || 0} lessons included</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
