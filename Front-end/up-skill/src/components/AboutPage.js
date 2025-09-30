import React from "react";

export default function AboutPage() {
  return (
    <div className="font-sans">
      <section className="about py-16 bg-white text-center px-6">
        <h3 className="text-3xl font-bold mb-8">About UpSkill</h3>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          UpSkill is a platform dedicated to helping learners acquire professional skills and
          globally recognized certifications. Our courses are designed by industry experts
          and aim to empower you in your career growth.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Whether you are a beginner or an experienced professional, UpSkill provides flexible,
          high-quality online courses tailored to your pace. Join thousands of learners worldwide
          and advance your career today!
        </p>
      </section>
    </div>
  );
}
