
import './comp.css';
import React, { useEffect, useState } from "react";


function HomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="font-sans">
   
      {/* Hero Section */}
      <section className="bg-gray-400 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Upgrade Your Skills, Earn Certifications
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of learners to gain professional skills and globally recognized certifications.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12">Why Choose UpSkill?</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-72 p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Expert Courses</h4>
            <p className="text-gray-600">Learn from industry professionals and certified instructors.</p>
          </div>
          <div className="w-72 p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Global Certifications</h4>
            <p className="text-gray-600">Earn recognized certificates to boost your career opportunities.</p>
          </div>
          <div className="w-72 p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Flexible Learning</h4>
            <p className="text-gray-600">Learn at your own pace with online and self-paced courses.</p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-100 text-center">
  <h3 className="text-3xl font-bold mb-12">Featured Courses</h3>
  <div className="flex flex-wrap justify-center gap-8">
    {courses.map(course => (
      <div
        key={course.id}
        className="w-72 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
      >
        {/* Fixed-size Image */}
        <img
          src={course.image}
          alt={course.title}
          className="h-40 w-full object-cover"
        />

        {/* Content aligned with flex */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
            <p className="text-gray-600 mb-4">{course.description}</p>
          </div>

          {/* Button always aligned at bottom */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-auto">
            Enroll Now
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

 
      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12">What Our Learners Say</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-72 p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-600 mb-4">
              "SkillCert helped me learn new technologies and get certified. Highly recommended!"
            </p>
            <h5 className="font-semibold">- John Doe</h5>
          </div>
          <div className="w-72 p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-600 mb-4">
              "The courses are well-structured and easy to follow. I landed a better job thanks to SkillCert."
            </p>
            <h5 className="font-semibold">- Jane Smith</h5>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 text-center">
        <p>&copy; 2025 UpSkill. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default HomePage;



