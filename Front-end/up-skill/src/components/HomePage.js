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
      <section className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 py-32 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">
            Upgrade Your Skills, Earn Certifications
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of learners to gain professional skills and globally recognized certifications.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl text-lg font-semibold">
            Login
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/hero-bg.png')] bg-cover bg-center"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-4xl md:text-5xl font-bold mb-14">Why Choose UpSkill?</h3>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="w-80 p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
            <h4 className="text-2xl font-semibold mb-3">Expert Courses</h4>
            <p className="text-gray-600 text-lg">Learn from industry professionals and certified instructors.</p>
          </div>
          <div className="w-80 p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
            <h4 className="text-2xl font-semibold mb-3">Global Certifications</h4>
            <p className="text-gray-600 text-lg">Earn recognized certificates to boost your career opportunities.</p>
          </div>
          <div className="w-80 p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
            <h4 className="text-2xl font-semibold mb-3">Flexible Learning</h4>
            <p className="text-gray-600 text-lg">Learn at your own pace with online and self-paced courses.</p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h3 className="text-4xl md:text-5xl font-bold mb-16">Featured Courses</h3>
        <div className="flex flex-wrap justify-center gap-10">
          {courses.map(course => (
            <div
              key={course.id}
              className="w-80 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-2xl font-semibold mb-3">{course.title}</h4>
                  <p className="text-gray-600 mb-5 text-lg">{course.description}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition mt-auto font-semibold shadow-md hover:shadow-lg">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white text-center relative">
        <h3 className="text-4xl md:text-5xl font-bold mb-16">What Our Learners Say</h3>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="w-80 p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
            <p className="text-gray-600 mb-5 text-lg">
              "SkillCert helped me learn new technologies and get certified. Highly recommended!"
            </p>
            <h5 className="font-bold text-gray-800">- John Doe</h5>
          </div>
          <div className="w-80 p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300">
            <p className="text-gray-600 mb-5 text-lg">
              "The courses are well-structured and easy to follow. I landed a better job thanks to SkillCert."
            </p>
            <h5 className="font-bold text-gray-800">- Jane Smith</h5>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-10 text-center">
        <p className="text-lg">&copy; 2025 UpSkill. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
