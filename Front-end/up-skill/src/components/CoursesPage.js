import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const categoryRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);

        // Group by category
        const grouped = data.reduce((acc, course) => {
          const cat = course.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(course);
          return acc;
        }, {});

        setCategories(grouped);

        const firstCat = Object.keys(grouped)[0];
        setActiveCategory(firstCat);

        // Create refs for smooth scroll
        const refs = {};
        Object.keys(grouped).forEach(cat => {
          refs[cat] = React.createRef();
        });
        categoryRefs.current = refs;
      })
      .catch(err => console.error(err));
  }, []);

  const scrollToCategory = (cat) => {
    categoryRefs.current[cat]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCategory(cat);
  };

  // Update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;
      Object.keys(categoryRefs.current).forEach(cat => {
        const ref = categoryRefs.current[cat].current;
        if (ref) {
          const top = ref.getBoundingClientRect().top;
          if (top < offset && top > -ref.offsetHeight + offset) {
            setActiveCategory(cat);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">
      {/* Category Tabs */}
      <div className="tabs-container">
        <div className="tabs-scroll">
          {Object.keys(categories).map(cat => (
            <div
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`tab-item ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
              {activeCategory === cat && <span className="indicator"></span>}
            </div>
          ))}
        </div>
      </div>

      {/* Courses by Category */}
      {Object.keys(categories).map(category => (
        <section
          key={category}
          ref={categoryRefs.current[category]}
          className="courses py-16 bg-gray-100"
        >
          <h3 className="text-3xl font-bold mb-6 text-center">{category}</h3>
          <div className="flex overflow-x-auto gap-6 px-6 scrollbar-hide">
            {categories[category].map(course => (
              <div key={course._id} className="course-card min-w-[18rem] flex-shrink-0">
                <img src={course.image} alt={course.title} className="course-img" />
                <div className="course-content p-4 flex flex-col flex-grow justify-between">
                  <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)} // ✅ use Mongo _id
                    className="btn-primary mt-auto"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}

            {/* “See All Courses” Card */}
            <div className="course-card min-w-[18rem] flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 border-2 border-dashed border-blue-200">
              <h4 className="text-xl font-semibold mb-2">See All {category}</h4>
              <p className="text-gray-600 mb-4">View the full list of courses in this category</p>
              <button className="btn-primary">View All</button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
