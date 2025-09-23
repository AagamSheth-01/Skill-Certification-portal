import React from "react";
import './comp.css';

function HomePage(){
    return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">UpSkill</h1>
        <ul className="flex gap-6">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">Courses</li>
          <li className="hover:text-gray-200 cursor-pointer">Certifications</li>
          <li className="hover:text-gray-200 cursor-pointer">About</li>
          <li className="hover:text-gray-200 cursor-pointer">Contact</li>
        </ul>
      </nav>

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
          <div className="w-72 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src="https://picsum.photos/300/150?random=4" alt="Course 1" />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">React for Beginners</h4>
              <p className="text-gray-600 mb-4">Build modern web apps with React and Tailwind CSS.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
          <div className="w-72 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src="https://picsum.photos/300/150?course=2" alt="Course 2" />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">Python for Data Science</h4>
              <p className="text-gray-600 mb-4">Analyze data and gain insights using Python and libraries.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
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



