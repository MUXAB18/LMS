const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const coursesToSeed = [
  {
    title: 'Modern Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch using React, Node.js, and MongoDB. Build real-world applications and master modern programming patterns.',
    category: 'Web Development',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'Introduction to HTML & CSS', duration: 15, content: 'Learn the foundational building blocks of the web.' },
      { title: 'JavaScript Fundamentals', duration: 30, content: 'Master variables, loops, arrays, and functions.' }
    ]
  },
  {
    title: 'Python for Data Science',
    description: 'Master data analysis, manipulation, and visualization using Python, Pandas, NumPy, and Matplotlib. Perfect for beginners and aspiring data scientists.',
    category: 'Data Science',
    price: 59.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'Setting up Jupyter', duration: 10, content: 'Install and configure Jupyter notebooks.' },
      { title: 'Pandas Masterclass', duration: 45, content: 'Data manipulation strategies.' }
    ]
  },
  {
    title: 'UI/UX Design Masterclass',
    description: 'Learn to design beautiful, user-friendly interfaces using Figma. Covering design theory, wireframing, prototyping, and modern UI trends.',
    category: 'Design',
    price: 39.99,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'Color Theory', duration: 20, content: 'Understanding color palettes.' },
      { title: 'Figma Basics', duration: 25, content: 'Getting started with Figma tools.' }
    ]
  },
  {
    title: 'Startup Business Mastery',
    description: 'A complete guide to starting your own business. Learn business planning, financial modeling, team building, and effective leadership.',
    category: 'Business',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'Writing a Business Plan', duration: 35, content: 'Core concepts for planning a startup.' }
    ]
  },
  {
    title: 'Digital Marketing Strategies',
    description: 'Boost your sales and visibility with advanced SEO, social media marketing, email campaigns, and Google Ads strategies.',
    category: 'Marketing',
    price: 29.99,
    thumbnail: 'https://images.unsplash.com/photo-1432888117281-ea53414bc8b5?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'SEO Basics', duration: 20, content: 'Optimize your website for search engines.' }
    ]
  },
  {
    title: 'Productivity & Time Management',
    description: 'Take control of your day. Discover actionable techniques to overcome procrastination, manage your tasks, and focus on what matters most.',
    category: 'Other',
    price: 19.99,
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80',
    lessons: [
      { title: 'The Pomodoro Technique', duration: 10, content: 'Learn how to maximize focus.' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Make sure we have an instructor
    let instructor = await User.findOne({ email: 'teacher@learnhub.com' });
    if (!instructor) {
      instructor = new User({ email: 'teacher@learnhub.com' });
      console.log('Creating Instructor: teacher@learnhub.com');
    } else {
      console.log('Updating Instructor: teacher@learnhub.com');
    }
    instructor.name = 'Master Teacher';
    instructor.password = 'password123';
    instructor.role = 'instructor';
    instructor.isApproved = true;
    await instructor.save();
    console.log('Instructor set | pw: password123');

    // Make sure we have an Admin
    let admin = await User.findOne({ email: 'admin@learnhub.com' });
    if (!admin) {
      admin = new User({ email: 'admin@learnhub.com' });
      console.log('Creating Admin: admin@learnhub.com');
    } else {
      console.log('Updating Admin: admin@learnhub.com');
    }
    admin.name = 'System Administrator';
    admin.password = 'admin123';
    admin.role = 'admin';
    admin.isApproved = true;
    await admin.save();
    console.log('Admin set | pw: admin123');

    console.log('Seeding courses...');
    for (const course of coursesToSeed) {
      const exists = await Course.findOne({ title: course.title });
      if (!exists) {
        await Course.create({ ...course, instructor: instructor._id });
        console.log(`+ Added: ${course.title}`);
      } else {
        console.log(`~ Skipped: ${course.title} (Already exists)`);
      }
    }

    console.log('Seeding Complete! 🎉');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
