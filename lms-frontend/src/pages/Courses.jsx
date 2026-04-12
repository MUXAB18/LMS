import { useState, useEffect } from 'react';
import API from '../api/axios';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';

const CATEGORIES = ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Other'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await API.get('/courses');
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="courses-page">
      <section className="page-hero">
        <div className="container text-center">
          <h1 className="page-hero-title">Browse <span className="text-gradient">Courses</span></h1>
          <p className="page-hero-subtitle">Discover your next skill from our curated library</p>
          <div className="search-bar mx-auto mt-4">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container py-5">
        {/* Category Filters */}
        <div className="category-filters mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader text="Loading courses..." />
        ) : filtered.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div className="fs-1">📭</div>
            <h4 className="mt-3">No courses found</h4>
            <p className="text-muted">Try a different search or category</p>
          </div>
        ) : (
          <>
            <p className="text-muted mb-4">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="row g-4">
              {filtered.map((course) => (
                <div key={course._id} className="col-md-6 col-lg-4">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
