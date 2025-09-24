import React, { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="font-sans">
      <section className="courses py-16 bg-gray-100 text-center">
        <h3 className="text-3xl font-bold mb-12">All Courses</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} className="course-img" />
              <div className="course-content">
                <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button className="btn-primary">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
