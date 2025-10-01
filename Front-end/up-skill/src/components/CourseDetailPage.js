import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!course) return <p className="text-center mt-10">Loading course...</p>;
  const handleEnrollOrStart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  if (course.isEnrolled) {
    // Navigate to learning page
    navigate(`/course/${id}/learn`);
  } else {
    // Enroll the user
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
      // Optionally mark as enrolled locally
      setCourse({ ...course, isEnrolled: true });
      navigate(`/course/${id}/learn`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }
};

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={course.image}
          alt={course.title}
          className="w-full md:w-1/3 rounded-lg shadow"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="text-gray-500">Category: {course.category || "Other"}</p>
          </div>
         <button
  onClick={handleEnrollOrStart}
  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
>
  {course?.isEnrolled ? "Start Course" : "Enroll Now"}
</button>
        </div>
      </div>

      {/* Curriculum */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
        <ul className="space-y-2">
          {course.curriculum?.length ? (
            course.curriculum.map((item, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded shadow-sm">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))
          ) : (
            <p>No curriculum available yet.</p>
          )}
        </ul>
      </section>

      {/* Instructor */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Instructor</h2>
        <div className="flex items-center gap-4">
          <img
            src={course.instructor?.avatar || "/default-avatar.png"}
            alt={course.instructor?.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{course.instructor?.name}</h3>
            <p className="text-gray-600">{course.instructor?.bio}</p>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section>
        <h2 className="text-2xl font-bold mb-4">About this course</h2>
        <p className="text-gray-700">{course.fullDescription || course.description}</p>
      </section>
    </div>
  );
}
