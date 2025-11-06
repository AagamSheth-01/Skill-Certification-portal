import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import LiveLectureSection from "./Livelecture";
import FinalTestPage from "./FinalTestPage"; // ✅ Import test page

export default function CourseLearningPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState([]);
  const [currentLesson, setCurrentLesson] = useState({ module: 0, lesson: 0 });
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showTest, setShowTest] = useState(false); // ✅ new state for test visibility
  const [testPassed, setTestPassed] = useState(false); // ✅ track test result
  const videoRef = useRef();

  const host = process.env.REACT_APP_BACK_END_URL;

  // Fetch course + progress
  useEffect(() => {
    fetch(`${host}/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error("Error fetching course:", err));

    fetch(`${host}/api/progress/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setProgress(data.completedLessons || []))
      .catch((err) => console.error("Error fetching progress:", err));
  }, [id, host]);

  const currentModule = course?.curriculum[currentLesson.module];
  const lesson = currentModule?.lessons[currentLesson.lesson];
  const currentVideo = lesson?.videos?.[0] || null;

  // Check if YouTube
  const isYouTube = (url) =>
    url?.includes("youtube.com") || url?.includes("youtu.be");

  // Convert YouTube URL to embeddable
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v="))
      return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  // Autoplay for normal videos
  useEffect(() => {
    if (videoRef.current && currentVideo && !isYouTube(currentVideo.url)) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err.message));
    }
  }, [currentVideo]);

  // Find next lesson with video
  const findNextLessonWithVideo = (moduleIndex, lessonIndex) => {
    for (let m = moduleIndex; m < course.curriculum.length; m++) {
      const lessons = course.curriculum[m].lessons;
      const start = m === moduleIndex ? lessonIndex + 1 : 0;
      for (let l = start; l < lessons.length; l++) {
        if (lessons[l].videos?.length > 0) return { module: m, lesson: l };
      }
    }
    return null;
  };

  // Mark lesson complete
  const markLessonComplete = async (moduleIndex, lessonIndex) => {
    const lessonKey = `${moduleIndex}-${lessonIndex}`;
    if (!progress.includes(lessonKey)) {
      try {
        const res = await fetch(`${host}/api/progress/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ lessonKey }),
        });
        const data = await res.json();
        setProgress(data.completedLessons);

        const nextLesson = findNextLessonWithVideo(moduleIndex, lessonIndex);
        if (nextLesson) setCurrentLesson(nextLesson);
        else {
          // ✅ Course completed -> show test button instead of certificate
          setShowTest(true);
        }
      } catch (err) {
        console.error("Error updating progress:", err);
      }
    }
  };

  const toggleModule = (index) => {
    setCourse((prev) => {
      const expandedModules = { ...(prev?.expandedModules || {}) };
      expandedModules[index] = !expandedModules[index];
      return { ...prev, expandedModules };
    });
  };

  if (!course || !course.curriculum?.length)
    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Loading course...
      </p>
    );

  const allLessons = course.curriculum.flatMap((m) => m.lessons ?? []);
  const totalLessons = allLessons.length;
  const completionPercentage = totalLessons
    ? Math.round((progress.length / totalLessons) * 100)
    : 0;

  // ✅ Handle test pass
  const handleTestPass = () => {
    setTestPassed(true);
    setShowTest(false);
    setCertificateVisible(true);
  };

  // ✅ Handle test fail
  const handleTestFail = () => {
    alert("❌ You need at least 60% to pass the test. Try again!");
  };

  // ✅ If user is giving test, show only test
  if (showTest) {
    return (
      <div className="p-6">
        <FinalTestPage
          courseId={id}
          onPass={handleTestPass}
          onFail={handleTestFail}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 sticky top-6 h-[80vh] overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{course.title}</h2>
        {course.curriculum.map((module, mIndex) => (
          <div key={mIndex} className="mb-4">
            <button
              onClick={() => toggleModule(mIndex)}
              className="w-full text-left font-semibold py-2 px-2 rounded hover:bg-gray-100 flex justify-between items-center"
            >
              {module.moduleTitle}
              <span>{course.expandedModules?.[mIndex] ? "▲" : "▼"}</span>
            </button>
            <AnimatePresence>
              {course.expandedModules?.[mIndex] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pl-4 mt-2"
                >
                  {module.lessons.map((lessonItem, lIndex) => {
                    const lessonKey = `${mIndex}-${lIndex}`;
                    const completed = progress.includes(lessonKey);
                    const isCurrent =
                      currentLesson.module === mIndex &&
                      currentLesson.lesson === lIndex;

                    const prevLessonKey =
                      lIndex > 0
                        ? `${mIndex}-${lIndex - 1}`
                        : mIndex > 0
                        ? `${mIndex - 1}-${
                            course.curriculum[mIndex - 1].lessons.length - 1
                          }`
                        : null;

                    const canAccess =
                      lIndex === 0 ||
                      (prevLessonKey && progress.includes(prevLessonKey)) ||
                      completed;

                    return (
                      <button
                        key={lessonKey}
                        onClick={() =>
                          canAccess &&
                          setCurrentLesson({ module: mIndex, lesson: lIndex })
                        }
                        className={`w-full text-left p-2 mb-1 rounded flex justify-between items-center ${
                          isCurrent
                            ? "bg-blue-100 font-semibold"
                            : "hover:bg-gray-100"
                        } ${!canAccess ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <span>{lessonItem.title}</span>
                        {completed && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Progress Bar */}
        <div className="mt-6">
          <p className="text-gray-600 mb-2">Course Progress</p>
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-600 h-3 rounded transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-right text-gray-600 mt-1">
            {completionPercentage}% completed
          </p>
        </div>

        {/* ✅ Show test button when course completed */}
        {completionPercentage === 100 && !testPassed && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowTest(true)}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              🎯 Take Final Test
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-gray-700 mb-4">{lesson.description}</p>

        {/* Video player */}
        {currentVideo ? (
          <div className="mb-4 rounded shadow overflow-hidden relative">
            {isYouTube(currentVideo.url) ? (
              <iframe
                className="w-full h-96 rounded"
                src={getYouTubeEmbedUrl(currentVideo.url)}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-96"
                controls
                onEnded={() =>
                  markLessonComplete(currentLesson.module, currentLesson.lesson)
                }
              >
                <source src={currentVideo.url} type="video/mp4" />
              </video>
            )}
          </div>
        ) : (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded">
            ⚠️ No video available for this lesson.
          </div>
        )}

        {/* ✅ Manual Complete button for YouTube */}
        {isYouTube(currentVideo?.url) && (
          <button
            onClick={() =>
              markLessonComplete(currentLesson.module, currentLesson.lesson)
            }
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mark Lesson Complete
          </button>
        )}
      </main>

      {/* Certificate Modal */}
      <AnimatePresence>
        {certificateVisible && (
          <>
            <Confetti recycle={false} numberOfPieces={400} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <motion.div className="bg-white p-8 rounded-lg max-w-lg text-center shadow-lg">
                <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
                <p className="mb-4">
                  You passed the final test for {course.title}!
                </p>
                <button
                  onClick={async () => {
                    setGenerating(true);
                    try {
                      const res = await fetch(`${host}/api/certificates/${id}`, {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      });
                      const data = await res.json();

                      if (res.ok && data.certificateUrl) {
                        const fullUrl = `${host}${data.certificateUrl}`;
                        window.open(fullUrl, "_blank");
                        setCertificateVisible(false);
                      } else {
                        console.error("Certificate not generated:", data);
                      }
                    } catch (err) {
                      console.error("Error generating certificate:", err);
                    } finally {
                      setGenerating(false);
                    }
                  }}
                  disabled={generating}
                  className={`bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition ${
                    generating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {generating ? "Generating..." : "Get Certificate"}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
