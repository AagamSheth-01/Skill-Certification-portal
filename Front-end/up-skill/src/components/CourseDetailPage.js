import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);

useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };
  fetchCourse();

  // Fetch user progress for this course
  fetch(`http://localhost:5000/api/progress/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then(res => res.json())
    .then(data => setProgress(data.completedLessons || []));
}, [id]);

// Enroll or start course
const handleEnrollOrStart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // If already enrolled, start course
  if (course?.isEnrolled) {
    navigate(`/courses/${id}/learn`);
    return;
  }

  // Otherwise, enroll
  try {
    const res = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setCourse({ ...course, isEnrolled: true });
      navigate(`/course/${id}/learn`);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong while enrolling");
  }
};

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;
let buttonText = "Enroll Now"; // default

if (course?.isEnrolled) {
  buttonText = progress.length > 0 ? "Continue Course" : "Start Course";
}

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full md:w-1/3 rounded-lg shadow"
          />
        )}
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
      <Curriculum curriculum={course.curriculum} />

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

// --- Interactive Curriculum Component ---
function Curriculum({ curriculum }) {
  const [expandedModules, setExpandedModules] = useState({});

  const toggleModule = (index) => {
    setExpandedModules(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Curriculum</h2>

      {curriculum?.length ? (
        <ul className="space-y-3">
          {curriculum.map((module, mIndex) => {
            const isExpanded = expandedModules[mIndex] || false;
            return (
              <li key={mIndex} className="bg-gray-50 rounded-lg shadow-md border border-gray-200">
                <button
                  onClick={() => toggleModule(mIndex)}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-100 rounded-lg font-semibold text-lg"
                >
                  <span>{`Module ${mIndex + 1}: ${module.title} (${module.lessons?.length || 0} Lessons)`}</span>
                  <span className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 pb-3 mt-1 list-disc"
                    >
                      {module.lessons?.length ? (
                        module.lessons.map((lesson, lIndex) => (
                          <li
                            key={lIndex}
                            className="text-gray-700 p-2 rounded hover:bg-blue-50 cursor-pointer transition"
                          >
                            {`Lesson ${lIndex + 1}: ${lesson.title}`}
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No lessons added yet</p>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No curriculum available yet.</p>
      )}
    </section>
  );
}
