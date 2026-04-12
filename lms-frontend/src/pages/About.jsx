const About = () => {
  const team = [
    { name: 'Musab', role: 'CEO & Founder', emoji: '👨‍💼' },
    { name: 'Ali', role: 'Head of Curriculum', emoji: '👨‍🏫' },
    { name: 'Ayra', role: 'Lead Developer', emoji: '👩‍💻' },
    { name: 'Esha', role: 'UX Designer', emoji: '🎨' },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container text-center">
          <h1 className="page-hero-title">About <span className="text-gradient">LearnHub</span></h1>
          <p className="page-hero-subtitle">
            Our mission is to make quality education accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title">Our <span className="text-gradient">Mission</span></h2>
              <p className="text-muted lh-lg">
                LearnHub was founded in 2024 with a simple belief: everyone deserves access to 
                the world's best education. We partner with top educators and institutions to 
                bring you courses that are practical, up-to-date, and taught by real experts.
              </p>
              <p className="text-muted lh-lg">
                Whether you're looking to switch careers, advance in your current role, or 
                simply explore a new passion — we have the perfect course for you.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  { icon: '🌍', title: 'Global Reach', val: '150+ countries' },
                  { icon: '📚', title: 'Total Courses', val: '500+ courses' },
                  { icon: '👨‍🎓', title: 'Learners', val: '10,000+ students' },
                  { icon: '⭐', title: 'Avg Rating', val: '4.8 / 5.0' },
                ].map((item, i) => (
                  <div key={i} className="col-6">
                    <div className="about-stat-card">
                      <div className="fs-2">{item.icon}</div>
                      <div className="fw-bold">{item.val}</div>
                      <div className="text-muted small">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Meet Our <span className="text-gradient">Team</span></h2>
          </div>
          <div className="row g-4 justify-content-center">
            {team.map((member, i) => (
              <div key={i} className="col-md-3 col-6">
                <div className="team-card text-center">
                  <div className="team-avatar">{member.emoji}</div>
                  <h6 className="mt-3 mb-1">{member.name}</h6>
                  <small className="text-muted">{member.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
