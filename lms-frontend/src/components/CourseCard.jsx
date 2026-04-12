import { Link } from 'react-router-dom';

const CATEGORY_COLORS = {
  'Web Development': '#4F46E5',
  'Data Science': '#06B6D4',
  'Design': '#EC4899',
  'Business': '#F59E0B',
  'Marketing': '#10B981',
  'Other': '#6B7280',
};

const CourseCard = ({ course }) => {
  const { _id, title, description, category, price, instructor, enrollmentCount, thumbnail } = course;
  const color = CATEGORY_COLORS[category] || '#6B7280';

  return (
    <div className="course-card h-100">
      <div className="course-card-thumbnail" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} />
        ) : (
          <div className="course-placeholder-icon" style={{ color }}>
            {category === 'Web Development' ? '💻' :
             category === 'Data Science' ? '📊' :
             category === 'Design' ? '🎨' :
             category === 'Business' ? '💼' :
             category === 'Marketing' ? '📢' : '📚'}
          </div>
        )}
        <span className="course-badge" style={{ background: color }}>{category}</span>
      </div>
      <div className="course-card-body">
        <h6 className="course-title">{title}</h6>
        <p className="course-desc">{description?.substring(0, 90)}...</p>
        <div className="course-meta">
          <span><i className="bi bi-person me-1"></i>{instructor?.name || 'Instructor'}</span>
          <span><i className="bi bi-people me-1"></i>{enrollmentCount || 0} students</span>
        </div>
        <div className="course-footer">
          <span className="course-price">{price === 0 ? 'Free' : `$${price}`}</span>
          <Link to={`/courses/${_id}`} className="btn btn-primary btn-sm">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
