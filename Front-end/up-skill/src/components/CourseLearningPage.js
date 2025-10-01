import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseLearningPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data));

    fetch(`http://localhost:5000/api/courses/${id}/progress`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setProgress(data.completedLessons || []));
  }, [id]);

  const markLessonComplete = async (index) => {
    await fetch(`http://localhost:5000/api/courses/${id}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ lessonIndex: index })
    });
    setProgress([...progress, index]);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div>
        {course.curriculum?.map((lesson, index) => (
          <div key={index} className="p-4 border rounded mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
            {progress.includes(index) ? (
              <span className="text-green-600 font-bold">Completed ✅</span>
            ) : (
              <button
                onClick={() => markLessonComplete(index)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
